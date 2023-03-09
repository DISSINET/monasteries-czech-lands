import { useEffect, useState } from "react";
import Hero from "./Hero";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import {
  Modal,
  Accordion,
  Button,
  CloseButton,
  Image,
  InputGroup,
  Dropdown,
  Offcanvas,
  Form,
} from "react-bootstrap";
import { DictOrders } from "../../shared/dictionaries/orders";
import { DictStatuses } from "../../shared/dictionaries/statuses";
import { BsCheckLg, BsListUl } from "react-icons/bs";

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
  const [showOrders, setShowOrders] = useState(false);
  const [showStatuses, setShowStatuses] = useState(false);

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
          <InputGroup size="sm">
            <InputGroup.Text
              style={{ cursor: "pointer", flexGrow: 1 }}
              onClick={() => setShowOrders(true)}
            >
              <BsListUl style={{ marginRight: "6px" }} />
              Order
            </InputGroup.Text>
          </InputGroup>
          <Offcanvas
            show={showOrders}
            onHide={() => setShowOrders(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <b>Filter by Order</b>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {DictOrders.map((e) => {
                return (
                  <Dropdown.Item id={e.id} className="ps-4">
                    <>
                      <BsCheckLg
                        style={{
                          color: "blue",
                        }}
                      />{" "}
                      {e.value}
                    </>
                  </Dropdown.Item>
                );
              })}
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        <div id="section2">
          <InputGroup size="sm">
            <InputGroup.Text
              style={{ cursor: "pointer", flexGrow: 1 }}
              onClick={() => setShowStatuses(true)}
            >
              <BsListUl style={{ marginRight: "6px" }} />
              Status
            </InputGroup.Text>
            <Offcanvas
              show={showStatuses}
              onHide={() => setShowStatuses(false)}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <b>Filter by Status</b>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {DictStatuses.map((e) => {
                  return (
                    <Dropdown.Item id={e.id} className="ps-4">
                      <>
                        <BsCheckLg
                          style={{
                            color: "blue",
                          }}
                        />{" "}
                        {e.value}
                      </>
                    </Dropdown.Item>
                  );
                })}
              </Offcanvas.Body>
            </Offcanvas>
          </InputGroup>
        </div>

        <div id="section3">
          <b>Time</b>
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
