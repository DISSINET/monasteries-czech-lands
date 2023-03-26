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
import { GoLocation } from "react-icons/go";
import { BsCheckLg, BsListUl } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import { selectOrders, selectStatuses, selectMonastery } from "./../MainSlice";
import FilterView from "./FilterView";
import TimeFilter from "./TimeSlider";
import calculateDatation from "./../../utils/calculateDatation";
import { Monastery } from "./../../types";

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

  function deselectMonastery() {
    dispatch(selectMonastery({} as Monastery));
  }

  function getCommunityName(id: string) {
    let comName = DictOrders.map((e) => {
      return e.id === id ? e.value : "";
    });
    return comName;
  }

  function getStatusName(id: string) {
    let stName = DictStatuses.map((e) => {
      return e.id === id ? e.value : "";
    });
    return stName;
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
        <div
          id="section4"
          style={{
            marginBottom: "60px",
          }}
        >
          {Object.keys(selectedMonastery).length !== 0 && (
            <Card>
              <Card.Header className="text-muted">
                <span
                  style={{ cursor: "pointer" }}
                  title="Copy coordinates"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${selectedMonastery["geo"][1]}, ${selectedMonastery["geo"][0]}`
                    );
                  }}
                >
                  <GoLocation />{" "}
                  <small>
                    <small>
                      <>
                        {selectedMonastery["geo"][1]},
                        {selectedMonastery["geo"][0]}
                      </>
                    </small>
                    <CloseButton
                      aria-label="Hide"
                      onClick={deselectMonastery}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "10px",
                      }}
                    />{" "}
                  </small>
                </span>
              </Card.Header>
              <Card.Body>
                <Card.Title>{selectedMonastery["name"]}</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  <small>{selectedMonastery["other_names"].join("; ")}</small>
                </Card.Subtitle>
                <small>Communities:</small>
                <ul>
                  {selectedMonastery["communities"].map((com: any) => {
                    return (
                      <li>
                        {getCommunityName(com["order"])}{" "}
                        <small>
                          <i>({calculateDatation.apply(null, com["time"])}) </i>
                        </small>
                      </li>
                    );
                  })}
                </ul>
                <small>Statuses:</small>
                <ul>
                  {selectedMonastery["statuses"].map((st: any) => {
                    return (
                      <li>
                        {getStatusName(st["status"])}{" "}
                        <small>
                          <i>({calculateDatation.apply(null, st["time"])}) </i>
                        </small>
                      </li>
                    );
                  })}
                </ul>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <>
                    <small>
                      Sources:
                      <small>
                        <ul>
                          {selectedMonastery["sources"].map((src: any) => {
                            return (
                              <li>
                                {src["title"]}{" "}
                                {src["url"] ? (
                                  <a
                                    href={src["url"]}
                                    title={src["url"]}
                                    target="_blank"
                                  >
                                    {" "}
                                    <BiLinkExternal />{" "}
                                  </a>
                                ) : (
                                  ""
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </small>
                    </small>
                  </>
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
