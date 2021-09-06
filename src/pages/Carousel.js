import { Fragment } from "react";
import "../styling/Home.css";

export default function Carousel({ user }) {
  return (
    <Fragment>
      <div className="landing">
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div class="carousel-inner" data-interval="1000">
            <div class="carousel-item active">
              <img
                src="https://media.istockphoto.com/photos/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-picture-id1249219777?b=1&k=20&m=1249219777&s=170667a&w=0&h=0dXNU-fjD9aOMmrvlppQhJ9gOqnW9dslKFdYLQN9rnk="
                class="d-block w-100 carousel-img"
                alt="..."
              />
            </div>
            <div class="carousel-item" data-interval="3000">
              <img
                src="https://image.shutterstock.com/image-photo/woman-holding-shopping-bag-mall-260nw-626081396.jpg"
                class="d-block w-100 carousel-img"
                alt="..."
              />
            </div>
            <div class="carousel-item" data-interval="3000">
              <img
                src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                class="d-block w-100 carousel-img"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
