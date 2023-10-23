import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import locations from "../../data/monasteries.json";
import { selectMonastery, setLocationCount } from "./../MainSlice";
import { Monastery } from "./../../types";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";

const MapSearch = ({}): JSX.Element => {
  const mapState = useAppSelector((state) => state.map);
  const dispatch = useAppDispatch();
  const selectedMonastery = useAppSelector(
    (state) => state.main.selectedMonastery
  );

  function dispatchSelectedMonastery(mon: any) {
    if (mon.length > 0) {
      dispatch(selectMonastery(mon[0]));
    } else {
      dispatch(selectMonastery({} as Monastery));
    }
  }

  return (
    <div
      className="mt-2"
      style={{
        position: "absolute",
        left: "50px",
        width: "30%",
        zIndex: 1000,
      }}
    >
      <Typeahead
        clearButton
        id="basic-typeahead-single"
        labelKey="name"
        onChange={(e) => dispatchSelectedMonastery(e)}
        options={locations}
        placeholder="Search location..."
      />
    </div>
  );
};

export default React.memo(MapSearch);
