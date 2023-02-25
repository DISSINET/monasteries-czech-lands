import * as React from "react";
import MapComponent from "./../map/Map";
import PanelComponent from "./../panel/Panel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Layout = ({}): JSX.Element => {
  return (
    <Container fluid style={{ padding: 0 }}>
      <Row>
        <Col
          sm="12"
          md="9"
          style={{
            padding: 0,
            height: "100%",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <MapComponent />
        </Col>
        <Col
          md="3"
          sm="12"
          style={{
            background: "#fff",
            padding: 0,
            height: "100%",
            position: "absolute",
            right: 0,
          }}
        >
          <PanelComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
