import { useState } from "react";
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
  Col,
  Card,
} from "react-bootstrap";
import { DictOrdersExtended } from "../../shared/dictionaries/orders_extended";
import { DictStatuses } from "../../shared/dictionaries/statuses";
import { Dedications } from "../../shared/dictionaries/dedications";
import { GoLocation } from "react-icons/go";
import { BsCheckLg, BsListUl } from "react-icons/bs";
import { BiLinkExternal } from "react-icons/bi";
import {
  selectOrders,
  selectStatuses,
  selectMonastery,
  selectDedications,
} from "./../MainSlice";
import FilterView from "./FilterView";
import TimeFilter from "./TimeSlider";
import PhotoCarousel from "./PhotoCarousel";
import calculateDatation from "./../../utils/calculateDatation";
import treatMonasteryName from "./../../utils/treatMonasteryName";
import translateDedication from "./../../utils/translateDedication";
import { Monastery } from "./../../types";

type PanelComponentProps = {};

const PanelComponent = ({}: PanelComponentProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [infoModal, toggleInfoModal] = useState(true);
  const handleInfoModalClose = () => toggleInfoModal(false);
  const handleInfoModalShow = () => toggleInfoModal(true);
  const [showOrders, setShowOrders] = useState(false);
  const handleShowOrders = () => setShowOrders(true);
  const [showStatuses, setShowStatuses] = useState(false);
  const handleShowStatuses = () => setShowStatuses(true);
  const [showDedications, setShowDedications] = useState(false);
  const handleShowDedications = () => setShowDedications(true);

  const selectedOrderIDs = useAppSelector(
    (state) => state.main.selectedOrderIDs
  );
  const selectedStatusIDs = useAppSelector(
    (state) => state.main.selectedStatusIDs
  );
  const selectedDedications = useAppSelector(
    (state) => state.main.selectedDedications
  );
  const selectedMonastery = useAppSelector(
    (state) => state.main.selectedMonastery
  );
  const currentLocationCount = useAppSelector(
    (state) => state.main.locationCount
  );

  const now = new Date();
  let dedAggr = ""; //used to build dedication tree

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

  function selectDed(selectedDedOb: Object) {
    let selectedDeds = new Set(selectedDedications);
    if (selectedDeds.has(selectedDedOb)) {
      selectedDeds.delete(selectedDedOb);
    } else {
      selectedDeds.add(selectedDedOb);
    }
    dispatch(selectDedications(Array.from(selectedDeds)));
  }

  function selectDedAgg(agg: String) {
    let selectedDeds = new Set(selectedDedications);
    let deds = Dedications.filter((e) => e.aggregation_level1 == agg);
    deds.forEach((ded) => {
      if (selectedDeds.has(ded)) {
        selectedDeds.delete(ded);
      } else {
        selectedDeds.add(ded);
      }
    });
    dispatch(selectDedications(Array.from(selectedDeds)));
  }

  function clearOrders() {
    dispatch(selectOrders([]));
  }

  function clearDedications() {
    dispatch(selectDedications([]));
  }

  function clearStatuses() {
    dispatch(selectStatuses([]));
  }

  function deselectMonastery() {
    dispatch(selectMonastery({} as Monastery));
  }

  function getCommunityName(id: string) {
    let comName = DictOrdersExtended.map((e) => {
      return e.ID.toString() === id ? e.label : "";
    });
    return comName;
  }

  function getStatusName(id: string) {
    let stName = DictStatuses.map((e) => {
      return e.id === id ? e.value : "";
    });
    return stName;
  }

  function listCommunities(com: any): any {
    let sortedCom = [...com].sort((a: any, b: any) => a.time[0] - b.time[0]);
    let comList = sortedCom.map((com: any) => {
      return (
        <li>
          {getCommunityName(com["order"])}{" "}
          <small>
            <i>({calculateDatation.apply(null, com["time"])}) </i>
          </small>
        </li>
      );
    });
    return comList;
  }

  function listStatuses(status: any): any {
    let sortedStatus = [...status].sort(
      (a: any, b: any) => a.time[0] - b.time[0]
    );
    let statusList = sortedStatus.map((st: any) => {
      let datation = calculateDatation.apply(null, st["time"]);
      return (
        <li>
          {getStatusName(st["status"])}{" "}
          <small>
            <i>({datation === "false" ? "no datation" : datation}) </i>
          </small>
        </li>
      );
    });
    return statusList;
  }

  function listDedications(mon: any): any {
    let dedication = mon["dedications"];
    if (mon["dedications"].length > 0) {
      let sortedDed = [...dedication].sort(
        (a: any, b: any) => a.time[0] - b.time[0]
      );
      let dedList = sortedDed.map((ded: any) => {
        let datation = calculateDatation.apply(null, ded["time"]);
        return (
          <li>
            {translateDedication(ded["dedication"])}{" "}
            <small>
              <i>({datation === "false" ? "no datation" : datation}) </i>
            </small>
          </li>
        );
      });
      return (
        <>
          <small>Dedications:</small>
          <ul>{dedList}</ul>
        </>
      );
    } else {
      return "";
    }
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
          <span>
            <b>Filter locations</b>{" "}
            <small>
              <small>– {currentLocationCount} displayed</small>
            </small>
          </span>
          <br />
          <InputGroup
            size="sm"
            style={{ marginBottom: "6px", marginTop: "8px" }}
          >
            {filterControl(
              "by Order",
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
                {DictOrdersExtended.map((e) => {
                  // only CZ orders
                  if (
                    [
                      "0",
                      "3",
                      "10",
                      "12",
                      "15",
                      "17",
                      "18",
                      "19",
                      "20",
                      "22",
                      "23",
                      "26",
                      "27",
                      "28",
                      "29",
                      "31",
                      "33",
                      "34",
                      "36",
                      "38",
                      "41",
                      "47",
                      "49",
                      "50",
                      "51",
                      "52",
                      "53",
                      "54",
                      "55",
                      "56",
                      "57",
                      "58",
                      "59",
                      "60",
                      "61",
                      "62",
                      "63",
                      "64",
                      "65",
                      "66",
                      "67",
                      "68",
                      "69",
                      "70",
                      "71",
                      "72",
                      "73",
                      "74",
                      "75",
                      "76",
                      "78",
                      "79",
                      "80",
                      "81",
                      "82",
                      "83",
                      "84",
                      "85",
                      "86",
                      "88",
                      "100",
                    ].includes(e.ID.toString())
                  ) {
                    return (
                      <ListGroup.Item
                        id={e.ID.toString()}
                        action
                        onClick={() => selectOrder(e.ID.toString())}
                      >
                        <Row>
                          <Col xs="1">
                            <BsCheckLg
                              style={{
                                color: "#2680c2",
                                opacity: selectedOrderIDs.includes(
                                  e.ID.toString()
                                )
                                  ? 1
                                  : 0,
                              }}
                            />{" "}
                          </Col>
                          <Col>{e.label}</Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  }
                })}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        <div id="section2">
          <InputGroup
            size="sm"
            style={{ marginTop: "-8px", marginBottom: "6px" }}
          >
            {filterControl(
              "by Status",
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
          <InputGroup
            size="sm"
            style={{ marginTop: "-8px", marginBottom: "6px" }}
          >
            {filterControl(
              "by Dedication",
              handleShowDedications,
              selectedDedications,
              clearDedications
            )}
          </InputGroup>
          <FilterView type={3} />
          <Offcanvas
            show={showDedications}
            onHide={() => setShowDedications(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Container>
                <Row>
                  <InputGroup size="sm" style={{ marginBottom: "6px" }}>
                    {filterControl(
                      "Filter by Dedication",
                      handleShowDedications,
                      selectedDedications,
                      clearDedications
                    )}
                  </InputGroup>
                </Row>
                <Row>
                  <FilterView type={3} />
                </Row>
              </Container>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ListGroup>
                {Dedications.map((e) => {
                  if (e.aggregation_level1 == dedAggr) {
                    return (
                      <ListGroup.Item
                        id={String(e.id)}
                        action
                        onClick={() => selectDed(e)}
                      >
                        <Row>
                          <Col xs="1">
                            <BsCheckLg
                              style={{
                                color: "#2680c2",
                                opacity: selectedDedications.includes(e)
                                  ? 1
                                  : 0,
                              }}
                            />{" "}
                          </Col>
                          <Col>{e.label_english}</Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  } else {
                    dedAggr = e.aggregation_level1;
                    return (
                      <>
                        <ListGroup.Item
                          onClick={() => selectDedAgg(e.aggregation_level1)}
                          style={{ cursor: "pointer" }}
                        >
                          <b>{e.aggregation_level1}</b>
                        </ListGroup.Item>
                        <ListGroup.Item
                          id={String(e.id)}
                          action
                          onClick={() => selectDed(e)}
                        >
                          <Row>
                            <Col xs="1">
                              <BsCheckLg
                                style={{
                                  color: "#2680c2",
                                  opacity: selectedDedications.includes(e)
                                    ? 1
                                    : 0,
                                }}
                              />{" "}
                            </Col>
                            <Col>{e.label_english}</Col>
                          </Row>
                        </ListGroup.Item>
                      </>
                    );
                  }
                })}
              </ListGroup>
            </Offcanvas.Body>
          </Offcanvas>
        </div>

        <div id="section4" style={{ marginTop: "-12px" }}>
          <TimeFilter />
        </div>
        <div id="section5">
          <span>
            <b>Location details</b>
          </span>
          {Object.keys(selectedMonastery).length !== 0 ? (
            <Card style={{ marginTop: "8px" }}>
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
                <Card.Title>
                  {treatMonasteryName(
                    selectedMonastery["name"],
                    selectedMonastery["communities"]
                  )}
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted">
                  <small>{selectedMonastery["other_names"].join("; ")}</small>
                </Card.Subtitle>
                <small>Communities:</small>
                <ul>{listCommunities(selectedMonastery["communities"])}</ul>
                <small>Statuses:</small>
                <ul>{listStatuses(selectedMonastery["statuses"])}</ul>
                {listDedications(selectedMonastery)}
                <PhotoCarousel mon={selectedMonastery} type={1} />
                <PhotoCarousel mon={selectedMonastery} type={2} />
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <>
                    <small>
                      Sources:
                      <small>
                        <ul>
                          {selectedMonastery["sources"].map((src: any) => {
                            if (
                              src["title"].includes("Encyklopedie") ||
                              src["title"].includes("Buben")
                            ) {
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
                            }
                          })}
                        </ul>
                      </small>
                    </small>
                  </>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          ) : (
            <>
              <br />
              <span style={{ marginTop: "8px" }} className="text-muted">
                <small>
                  <i>Select location from the map</i>
                </small>
              </span>
            </>
          )}
        </div>
        <div
          id="section6"
          style={{
            marginBottom: "60px",
          }}
        >
          <span>
            <b>Legend</b>
            <br />
            <small>Monasteries by the century of establishment:</small>
            <br />
            <small>
              {" "}
              <small style={{ float: "left" }}>oldest</small>{" "}
              <div className="legendItem"></div>
              <div
                className="legendItem"
                style={{ background: "rgb(0,0,0)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(0, 0, 10)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(2, 56, 88)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(4, 90, 141)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(5, 112, 176)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(54, 114, 176)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(116, 169, 207)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(166, 189, 219)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(208, 209, 230)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(236, 231, 242)" }}
              ></div>
              <div
                className="legendItem"
                style={{ background: "rgb(236, 231, 242)" }}
              ></div>
              <div className="legendItem"></div>
              <small style={{ float: "left" }}> newest</small> <br />
              <div
                className="legendItem"
                style={{ background: "rgb(152, 152, 152)" }}
              ></div>
              <div className="legendItem"></div>
              <small style={{ float: "left" }}> no datation</small>{" "}
            </small>
            <br />
            <small>Localization certainty:</small>
            <br />
            <small>
              {" "}
              <div
                className="legendCircle"
                style={{ border: "solid 1px rgb(51, 51, 255)" }}
              ></div>
              <div className="legendItem"></div>
              <small style={{ float: "left" }}>precise</small>{" "}
              <div className="legendItem"></div>
              <div
                className="legendCircle"
                style={{ border: "solid 1px rgb(255, 215, 0)" }}
              ></div>
              <div className="legendItem"></div>
              <small style={{ float: "left" }}>approximate</small>{" "}
              <div className="legendItem"></div>
              <div
                className="legendCircle"
                style={{ border: "solid 1px rgb(255, 99, 71)" }}
              ></div>
              <div className="legendItem"></div>
              <small style={{ float: "left" }}>ambiguous</small>{" "}
            </small>
          </span>
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
            size="xl"
            centered
          >
            <Hero />
            <CloseButton
              aria-label="Hide"
              onClick={handleInfoModalClose}
              style={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
                backgroundColor: "white",
              }}
            />{" "}
            <Modal.Body>
              <p>
                This interactive map application presents{" "}
                <b>
                  the most complete available digital data set of Christian
                  religious houses in the Czech lands
                </b>{" "}
                from the beginnings up to the present day. The data were
                manually compiled on the basis of the extensive, so far
                nine-volume <b>encyclopedia by Milan Buben</b>,{" "}
                <i>
                  Encyklopedie řádů, kongregací a řeholních společností
                  katolické církve v českých zemích
                </i>
                .
              </p>
              <p>
                The map covers <b>782 records</b> and thus represents a very
                comprehensive resource on the development of Christian monastic
                life in the Czech lands. However, a crucial gap is the{" "}
                <b>absence of female religious houses</b>, because the volume on
                those has not yet been published. Female houses are thus covered
                only insofar as they were described as part of a record in the
                hitherto published volumes.
              </p>
              <p>
                The map allows users to explore{" "}
                <b>monasteries and other religious houses</b> throughout history
                and relate the data points to other relevant spatial and
                historical datasets. The records can be
                <b>filtered</b> by <b>religious order</b> (Benedictines,
                Jesuites, etc.),
                <b>status</b> (abbey, priory, etc.) and <b>time</b> (for
                instance, only showing monasteries which were in place in the
                medieval period).
              </p>
              <p>
                Each <b>record</b> is accompanied by an <b>info box</b>, which
                lists the <b>names</b>
                under which the religious house is known, the <b>
                  communities
                </b>{" "}
                which lived in that religious house (order and time interval),
                and the changing <b>status</b> of the religious house. The info
                box also allows the copying of <b>geographic coordinates</b>.
                Finally, a vast proportion of the records are complemented with{" "}
                <b>original photographic documentation</b> of the present state
                of the building (or, in the case of unpreserved buildings, the
                location).
              </p>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <span>
                    <i className="mx-2 icon icon-book" />
                  </span>
                  <span>
                    Data source: Milan Buben, Encyklopedie řádů, kongregací a
                    řeholních společností katolické církve v českých zemích I-IV
                    (full citation below).
                  </span>
                </li>
                <li>
                  <span>
                    <i className="mx-2 icon icon-layer-group" />
                  </span>
                  <span>Data: Hana Hořínková</span>
                </li>
                <li>
                  <span>
                    <i className="mx-2 icon icon-drafting-compass" />
                  </span>
                  <span>
                    Map:{" "}
                    <a
                      href="https://pondrejk.eu/"
                      title="personal portfolio page"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Peter Ondrejka
                    </a>
                  </span>
                </li>
                <li>
                  <span>
                    <i className="mx-2 icon icon-binoculars" />
                  </span>
                  <span>Dataset design and supervision: David Zbíral</span>
                </li>
              </ul>
              <p>
                Acknowledgements
                <br /> We are immensely grateful to Milan Buben for his kind
                permission to use his encyclopedia for compiling the dataset
                presented in this interactive map application. Any errors made
                in the process of compiling and structuring the data into a
                digital dataset, as well as any errors in the coordinates,
                remain solely our responsibility.
              </p>
              <p>
                Recommended citation: Hořínková, Hana; Ondrejka, Peter; Zbíral,
                David (2023). Religious houses in the Czech Lands (v. 0.2.0).{" "}
                <i>Dissident Networks Project (DISSINET)</i>. Retrieved{" "}
                {now.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                from{" "}
                <a href="https://dissinet.cz/maps/monasteries-czech-lands/">
                  https://dissinet.cz/maps/monasteries-czech-lands/
                </a>
                . <br />
                Whenever citing this map and dataset, also cite the original
                data source:
                <br /> Buben, Milan (2002–2018).{" "}
                <i>
                  Encyklopedie řádů, kongregací a řeholních společností
                  katolické církve v českých zemích I, II/1-2, III/1-4, IV/1-2
                </i>
                . Praha: Libri.
              </p>
            </Modal.Body>
            <Modal.Footer style={{ background: "#b8c2cc" }}></Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default PanelComponent;
