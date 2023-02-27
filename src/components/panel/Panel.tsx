import { useEffect, useState } from "react";
import Hero from "./Hero";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { Modal, Accordion, Button, CloseButton, Image } from "react-bootstrap";
//import legend from "./../../assets/legend.png";

type PanelComponentProps = {};

const PanelComponent = ({}: PanelComponentProps): JSX.Element => {
  useEffect(
    () => {
      //update function
    },
    [
      // registered constants
    ]
  );

  const [infoModal, toggleInfoModal] = useState(false);
  const handleInfoModalClose = () => toggleInfoModal(false);
  const handleInfoModalShow = () => toggleInfoModal(true);

  return (
    <div
      className="panel"
      data-testid="panel-wrapper"
      style={{
        maxHeight: "100%",
        display: "flex",
        flexFlow: "column nowrap",
      }}
    >
      <Hero />
      <div
        style={{
          padding: "1em",
          overflow: "scroll",
          display: "flex",
          flexFlow: "column nowrap",
          gap: "20px",
        }}
      >
        <div id="section1">
          <Accordion flush defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <b>Section1</b>
              </Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div id="legend">
          <Accordion flush defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <b>Legend</b>
              </Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div
          className="pt-12"
          style={{
            position: "absolute",
            background: "#b8c2cc",
            bottom: "0",
            right: "0",
            left: "0",
            height: "60px",
          }}
        >
          <Button
            size="sm"
            variant="outline-dark"
            style={{ position: "absolute", right: "1rem", bottom: "1rem" }}
            onClick={handleInfoModalShow}
          >
            info
          </Button>
          <Modal
            show={infoModal}
            onHide={handleInfoModalClose}
            size="lg"
            centered
          >
            <Hero />
            <CloseButton
              aria-label="Hide"
              onClick={handleInfoModalClose}
              style={{ position: "absolute", right: "1rem", top: "1rem" }}
            />{" "}
            <Modal.Body>Project annotation TBA</Modal.Body>
            <Modal.Footer style={{ background: "#b8c2cc" }}></Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PanelComponent;
