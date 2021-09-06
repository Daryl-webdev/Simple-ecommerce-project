import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Table, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import "../styling/AdminDashboard.css";

export default function AdminView(props) {
  const { productData, fetchData } = props;
  //For modals
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);

  //For form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [category, setCategory] = useState("");
  //Modals viewing
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  //For add product modal
  const openAdd = () => setShowAdd(true);
  const closeAdd = () => setShowAdd(false);

  //Function for Edit modal===populate the value first in the form before editing
  const openEdit = (product) => {
    setProductId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    // setProductImage(product.productImage);
    setCategory(product.category);

    setShowEdit(true);
  };

  //For edit product modal
  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
  };

  const onChangeFile = (e) => {
    setProductImage(e.target.files[0]);
  };

  useEffect(() => {
    const productArr = productData.map((product) => {
      return (
        <tr>
          <td key={product._id}>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td>{product.category}</td>
          <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Availble" : "Unavailable"}
          </td>
          <td>
            <Button
              className="update mr-1"
              size="sm"
              onClick={() => openEdit(product)}
            >
              update
            </Button>

            {product.isActive ? (
              <label
                onClick={() => archiveToggler(product._id, product.isActive)}
                className="switch mx-auto d-block mt-2"
              >
                <input type="checkbox" />
                <span className="slider-right"></span>
              </label>
            ) : (
              <label
                onClick={() => archiveToggler(product._id, product.isActive)}
                className="switch mx-auto d-block mt-2"
              >
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            )}
          </td>
        </tr>
      );
    });
    setProducts(productArr);
  }, [productData]);

  const addProduct = (e) => {
    e.preventDefault();
    if (category !== "") {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("productImage", productImage);
      fd.append("description", description);
      fd.append("price", price);
      fd.append("category", category);
      const url = "http://localhost:4000/products/add";
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      axios
        .post(url, fd, config)
        .then((data) => {
          if (data) {
            fetchData();
            Swal.fire({
              title: "Yeeeyyy!!!",
              icon: "success",
              text: "Upload Succesfull",
            });
            setName("");
            setDescription("");
            setPrice("");
            setProductImage("");
            setCategory("");
            closeAdd();
          } else {
            fetchData();
            Swal.fire({
              title: "Opps!!!",
              icon: "error",
              text: data.error,
            });
          }
        })

        .catch((err) => console.log(`error fetching data ${err.message}`));
    } else {
      Swal.fire({
        title: "Opps!!!",
        icon: "error",
        text: "Input category",
      });
    }
  };

  const editProduct = (e, productId) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/products/update/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          fetchData();
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: "Edit successful",
          });
          closeEdit();
        } else {
          fetchData();
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "error",
            text: "Something Went Wrong",
          });
        }
      })
      .catch((err) => console.log(`error fetching: ${err}`));
  };

  const archiveToggler = (productId, isActive) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/archive/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        isActive: isActive,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          fetchData();
        } else if (!data) {
          fetchData();
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: "Product successfuly unachived",
          });
        } else {
          fetchData();
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "error",
            text: "Something Went Wrong",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const categories = ["Beauty", "Health", "Learnings", "Electronics"];
  return (
    <>
      <div className="admin-title-container">
        <h2 className="text-center">Admin Dashboard</h2>
        <div className="d-flex justify-content-center">
          <Button onClick={openAdd}>Add New Product</Button>
        </div>
      </div>
      <div className="admin-container">
        <Table striped hover responsive bordered>
          <thead className="bg-table text-light bg-dark">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{products}</tbody>
        </Table>
      </div>
      {/*add modal */}
      <Modal show={showAdd} onHide={closeAdd}>
        <Form onSubmit={(e) => addProduct(e)} encType="multipart/form-data">
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title of A Product"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category:</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">--</option>
                {categories.map((categ) => {
                  return <option value={categ}>{categ}</option>;
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="file"
                required
                filename="productImage"
                onChange={onChangeFile}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAdd}>
              close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/*Edit modal */}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title of A Product"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Form.Group>
                <Form.Label>Category:</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((categ) => {
                    return <option value={categ}>{categ}</option>;
                  })}
                </Form.Control>
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="file"
                required
                filename="productImage"
                value={productImage}
                onChange={onChangeFile}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
