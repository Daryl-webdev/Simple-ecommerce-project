import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container className="text-center">
      <h3>
        404: Page Not Found <Link to="/">Back to Homepage</Link>
      </h3>
    </Container>
  );
}
