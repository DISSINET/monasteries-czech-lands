import React from "react";
import { Badge } from "react-bootstrap";
import { selectOrders, selectStatuses } from "./../MainSlice";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { BsXLg } from "react-icons/bs";

type FilterViewProps = {
  type: number;
};

const FilterView = ({ type }: FilterViewProps): JSX.Element => {
  const selectedOrderLabels = useAppSelector(
    (state) => state.main.selectedOrderLabels
  );
  const selectedStatusLabels = useAppSelector(
    (state) => state.main.selectedStatusLabels
  );
  const dispatch = useAppDispatch();

  function removeOrder(event: any) {
    let selectedOrders = new Set(selectedOrderLabels);
    selectedOrders.delete(event.target.id);
    dispatch(selectOrders(Array.from(selectedOrders)));
  }

  function removeStatus(event: any) {
    let selectedStatuses = new Set(selectedStatusLabels);
    selectedStatuses.delete(event.target.id);
    dispatch(selectStatuses(Array.from(selectedStatuses)));
  }

  function buildOrderFilterView() {
    const filterV =
      selectedOrderLabels.map((e: string, i) => {
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
              {e}
              <small>
                {" "}
                <BsXLg
                  id={e}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => removeOrder(event)}
                />
              </small>
            </Badge>
            {i != selectedOrderLabels.length - 1 ? (
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
      selectedStatusLabels.map((e: string, i) => {
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
              {e}
              <small>
                {" "}
                <BsXLg
                  id={e}
                  style={{ cursor: "pointer" }}
                  onClick={(event) => removeStatus(event)}
                />
              </small>
            </Badge>
            {i != selectedStatusLabels.length - 1 ? (
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
  }
  return output as JSX.Element;
};

export default FilterView;
