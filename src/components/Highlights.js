import { Card, Row, Col } from "react-bootstrap";

export default function Highlights() {
  return (
    <Row>
      <Col xs={12} md={4}>
        <Card className="cardHighlight">
          <Card.Body>
            <Card.Title>Learn From Home</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, a perspiciatis voluptatum ducimus eveniet volu
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight">
          <Card.Body>
            <Card.Title>Learn From Home</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, a perspiciatis voluptatum ducimus eveniet voluptates
              corrupti tempore fuga beatae nemo saepe doloremque vitae
              molestiae. Impedit voluptatibus quasi cum vero asperiores!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight">
          <Card.Body>
            <Card.Title>Learn From Home</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, a perspiciatis voluptatum ducimus eveniet voluptates
              corrupti tempore fuga beatae nemo saepe doloremque vitae
              molestiae. Impedit voluptatibus quasi cum vero asperiores!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
