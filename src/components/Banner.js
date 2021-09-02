import { Row, Col, Button } from "react-bootstrap";
import Welcome from "./Welcome";

export default function Banner() {
  let userName = localStorage.getItem("userName");
  return (
    <Row>
      <Col>
        <Welcome name={userName} />
        <h1>Zuitt Coding bootcamp</h1>
        <p>Opportunities for everyone, everywhere</p>
        <Button>Enroll Now</Button>
      </Col>
    </Row>
  );
}
