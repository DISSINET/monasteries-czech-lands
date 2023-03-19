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
import { selectOrders, selectStatuses } from "./../MainSlice";

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

  const selectedOrderLabels = useAppSelector(
    (state) => state.main.selectedOrderLabels
  );

  const selectedStatusLabels = useAppSelector(
    (state) => state.main.selectedStatusLabels
  );

  function selectOrder(selectedOrder: string) {
    let selectedOrders = new Set(selectedOrderLabels);
    if (selectedOrders.has(selectedOrder)) {
      selectedOrders.delete(selectedOrder);
    } else {
      selectedOrders.add(selectedOrder);
    }
    dispatch(selectOrders(Array.from(selectedOrders)));
  }

  function selectStatus(selectedStatus: string) {
    let selectedStatuses = new Set(selectedStatusLabels);
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
      <InputGroup size="sm">
        <InputGroup.Text
          onClick={action}
          style={{ cursor: "pointer", flexGrow: 1 }}
        >
          <BsListUl style={{ marginRight: "6px" }} />
          {label}
        </InputGroup.Text>
        {stateArray.length > 0 ? (
          <Button variant="outline-primary" size="sm" onClick={clearAction}>
            clear
          </Button>
        ) : (
          ""
        )}
      </InputGroup>
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
          {filterControl(
            "Order",
            handleShowOrders,
            selectedOrderLabels,
            clearOrders
          )}
          <Offcanvas
            show={showOrders}
            onHide={() => setShowOrders(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              {filterControl(
                "Filter by order",
                null,
                selectedOrderLabels,
                clearOrders
              )}
            </Offcanvas.Header>
            <Offcanvas.Body>
              {DictOrders.map((e) => {
                return (
                  <Dropdown.Item
                    id={e.id}
                    className="ps-4 mt-2"
                    onClick={() => selectOrder(e.value)}
                  >
                    <>
                      <BsCheckLg
                        style={{
                          color: "blue",
                          opacity: selectedOrderLabels.includes(e.value)
                            ? 1
                            : 0,
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
          {filterControl(
            "Status",
            handleShowStatuses,
            selectedStatusLabels,
            clearStatuses
          )}
          <Offcanvas
            show={showStatuses}
            onHide={() => setShowStatuses(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              {filterControl(
                "Filter by status",
                handleShowStatuses,
                selectedStatusLabels,
                clearStatuses
              )}
            </Offcanvas.Header>
            <Offcanvas.Body>
              {DictStatuses.map((e) => {
                return (
                  <Dropdown.Item
                    id={e.id}
                    className="ps-4 m-2"
                    onClick={() => selectStatus(e.value)}
                  >
                    <>
                      <BsCheckLg
                        style={{
                          color: "blue",
                          opacity: selectedStatusLabels.includes(e.value)
                            ? 1
                            : 0,
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
