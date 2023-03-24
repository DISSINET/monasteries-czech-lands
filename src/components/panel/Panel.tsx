import { useEffect, useState } from "react";
import Hero from "./Hero";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import {
  Container,
  Modal,
  Button,
  CloseButton,
  InputGroup,
  Offcanvas,
  ListGroup,
  Row,
  Card,
} from "react-bootstrap";
import { DictOrders } from "../../shared/dictionaries/orders";
import { DictStatuses } from "../../shared/dictionaries/statuses";
import { BsCheckLg, BsListUl } from "react-icons/bs";
import { selectOrders, selectStatuses } from "./../MainSlice";
import FilterView from "./FilterView";
import TimeFilter from "./TimeSlider";

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

  const dispatch = useAppDispatch();

  const [infoModal, toggleInfoModal] = useState(false);
  const handleInfoModalClose = () => toggleInfoModal(false);
  const handleInfoModalShow = () => toggleInfoModal(true);
  const [showOrders, setShowOrders] = useState(false);
  const handleShowOrders = () => setShowOrders(true);
  const [showStatuses, setShowStatuses] = useState(false);
  const handleShowStatuses = () => setShowStatuses(true);

  const selectedOrderIDs = useAppSelector(
    (state) => state.main.selectedOrderIDs
  );

  const selectedStatusIDs = useAppSelector(
    (state) => state.main.selectedStatusIDs
  );

  const selectedMonastery = useAppSelector(
    (state) => state.main.selectedMonastery
  );

  function selectOrder(selectedOrder: string) {
    let selectedOrders = new Set(selectedOrderIDs);
    if (selectedOrders.has(selectedOrder)) {
      selectedOrders.delete(selectedOrder);
    } else {
      selectedOrders.add(selectedOrder);
    }
    dispatch(selectOrders(Array.from(selectedOrders)));
  }

  function selectStatus(selectedStatus: string) {
    let selectedStatuses = new Set(selectedStatusIDs);
    if (selectedStatuses.has(selectedStatus)) {
      selectedStatuses.delete(selectedStatus);
    } else {
      selectedStatuses.add(selectedStatus);
    }
    dispatch(selectStatuses(Array.from(selectedStatuses)));
  }

  function clearOrders() {
    dispatch(selectOrders([]));
  }

  function clearStatuses() {
    dispatch(selectStatuses([]));
  }

  function filterControl(
    label: string,
    action: any = null,
    stateArray: any = null,
    clearAction: any = null
  ) {
    return (
      <>
        <InputGroup.Text
          onClick={action}
          style={{ cursor: "pointer", flexGrow: 1 }}
        >
          <BsListUl style={{ marginRight: "6px" }} />
          {label}
        </InputGroup.Text>
        {stateArray.length > 0 ? (
          <Button variant="outline-secondary" size="sm" onClick={clearAction}>
            clear
          </Button>
        ) : (
          ""
        )}
      </>
    );
  }

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
          <InputGroup size="sm" style={{ marginBottom: "6px" }}>
            {filterControl(
              "Order",
              handleShowOrders,
              selectedOrderIDs,
              clearOrders
            )}
          </InputGroup>
          <FilterView type={1} />
          <Offcanvas
            show={showOrders}
            onHide={() => setShowOrders(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Container>
                <Row>
                  <InputGroup size="sm" style={{ marginBottom: "6px" }}>
                    {filterControl(
                      "Filter by order",
                      null,
                      selectedOrderIDs,
                      clearOrders
                    )}
                  </InputGroup>
                </Row>
                <Row>
                  <FilterView type={1} />
                </Row>
              </Container>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup>
                {DictOrders.map((e) => {
                  return (
                    <ListGroup.Item
                      id={e.id}
                      action
                      onClick={() => selectOrder(e.id)}
                    >
                      <>
                        <BsCheckLg
                          style={{
                            color: "#2680c2",
                            opacity: selectedOrderIDs.includes(e.id) ? 1 : 0,
                          }}
                        />{" "}
                        {e.value}
                      </>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        <div id="section2">
          <InputGroup size="sm" style={{ marginBottom: "6px" }}>
            {filterControl(
              "Status",
              handleShowStatuses,
              selectedStatusIDs,
              clearStatuses
            )}
          </InputGroup>
          <FilterView type={2} />
          <Offcanvas
            show={showStatuses}
            onHide={() => setShowStatuses(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Container>
                <Row>
                  <InputGroup size="sm" style={{ marginBottom: "6px" }}>
                    {filterControl(
                      "Filter by status",
                      handleShowStatuses,
                      selectedStatusIDs,
                      clearStatuses
                    )}
                  </InputGroup>
                </Row>
                <Row>
                  <FilterView type={2} />
                </Row>
              </Container>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup>
                {DictStatuses.map((e) => {
                  return (
                    <ListGroup.Item
                      id={e.id}
                      action
                      onClick={() => selectStatus(e.id)}
                    >
                      <>
                        <BsCheckLg
                          style={{
                            color: "#2680c2",
                            opacity: selectedStatusIDs.includes(e.id) ? 1 : 0,
                          }}
                        />{" "}
                        {e.value}
                      </>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        <div id="section3">
          <TimeFilter />
        </div>
        <div id="section3">
          {Object.keys(selectedMonastery).length !== 0 && (
            <Card>
              <Card.Header>
                <small className="text-muted">
                  Selected location{"  "}
                  <small>
                    {selectedMonastery["geo"][0]} {selectedMonastery["geo"][1]}
                  </small>
                </small>
              </Card.Header>
              <Card.Body>
                <Card.Title>{selectedMonastery["name"]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>Communities:</Card.Text>
                <Card.Text>Statuses:</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <small>Sources:</small>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          )}
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
