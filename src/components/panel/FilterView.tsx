import React from "react";
import { Badge } from "react-bootstrap";
import {
  selectOrders,
  selectStatuses,
  selectDedications,
} from "./../MainSlice";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { BsXLg } from "react-icons/bs";
import { DictOrders } from "../../shared/dictionaries/orders";
import { DictStatuses } from "../../shared/dictionaries/statuses";
import translateDedication from "./../../utils/translateDedication";

type FilterViewProps = {
  type: number;
};

const FilterView = ({ type }: FilterViewProps): JSX.Element => {
  const selectedOrderIDs = useAppSelector(
    (state) => state.main.selectedOrderIDs
  );
  const selectedStatusIDs = useAppSelector(
    (state) => state.main.selectedStatusIDs
  );
  const selectedDedications = useAppSelector(
    (state) => state.main.selectedDedications
  );
  const dispatch = useAppDispatch();

  function removeOrder(event: any) {
    let selectedOrders = new Set(selectedOrderIDs);
    selectedOrders.delete(event.target.id);
    dispatch(selectOrders(Array.from(selectedOrders)));
  }

  function removeStatus(event: any) {
    let selectedStatuses = new Set(selectedStatusIDs);
    selectedStatuses.delete(event.target.id);
    dispatch(selectStatuses(Array.from(selectedStatuses)));
  }

  function removeDed(event: any) {
    let selectedDeds = new Set(selectedDedications);
    selectedDeds.delete(event.target.id);
    dispatch(selectDedications(Array.from(selectedDeds)));
  }

  function buildOrderFilterView() {
    const filterV =
      selectedOrderIDs.map((e: string, i) => {
        return (
          <>
            <Badge
              id={e}
              bg="filter"
              pill
              style={{
                cursor: "default",
                maxWidth: "300px",
                whiteSpace: "initial",
                textAlign: "left",
              }}
            >
              {DictOrders.map((order) => {
                if (order.id === e) {
                  return order.value;
                }
              })}
              <small>
                {" "}
                <BsXLg
                  id={e}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => removeOrder(event)}
                />
              </small>
            </Badge>
            {i != selectedOrderIDs.length - 1 ? (
              <i style={{ color: "#2680c2" }}>
                <small> or </small>
              </i>
            ) : (
              ""
            )}
          </>
        );
      }) || "";
    return filterV;
  }

  function buildStatusFIlterView() {
    const filterV =
      selectedStatusIDs.map((e: string, i) => {
        return (
          <>
            <Badge
              id={e}
              bg="filter"
              pill
              style={{
                cursor: "default",
                maxWidth: "300px",
                whiteSpace: "initial",
                textAlign: "left",
              }}
            >
              {DictStatuses.map((status) => {
                if (status.id === e) {
                  return status.value;
                }
              })}
              <small>
                {" "}
                <BsXLg
                  id={e}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => removeStatus(event)}
                />
              </small>
            </Badge>
            {i != selectedStatusIDs.length - 1 ? (
              <i style={{ color: "#2680c2" }}>
                <small> or </small>
              </i>
            ) : (
              ""
            )}
          </>
        );
      }) || "";
    return filterV;
  }

  function buildDedicationFIlterView() {
    const filterV =
      selectedDedications.map((e: string, i) => {
        return (
          <>
            <Badge
              id={e}
              bg="filter"
              pill
              style={{
                cursor: "default",
                maxWidth: "300px",
                whiteSpace: "initial",
                textAlign: "left",
              }}
            >
              {translateDedication(e)}
              <small>
                {" "}
                <BsXLg
                  id={e}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => removeDed(event)}
                />
              </small>
            </Badge>
            {i != selectedDedications.length - 1 ? (
              <i style={{ color: "#2680c2" }}>
                <small> or </small>
              </i>
            ) : (
              ""
            )}
          </>
        );
      }) || "";
    return filterV;
  }

  let output;
  switch (type) {
    case 1:
      output = (
        <div style={{ maxHeight: "9em", overflowY: "scroll" }}>
          {buildOrderFilterView()}
        </div>
      );
      break;
    case 2:
      output = (
        <div style={{ maxHeight: "9em", overflowY: "scroll" }}>
          {buildStatusFIlterView()}
        </div>
      );
      break;
    case 3:
      output = (
        <div style={{ maxHeight: "9em", overflowY: "scroll" }}>
          {buildDedicationFIlterView()}
        </div>
      );
      break;
  }
  return output as JSX.Element;
};

export default FilterView;
