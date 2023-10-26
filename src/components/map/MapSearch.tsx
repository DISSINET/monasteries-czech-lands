import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import locations from "../../data/monasteries.json";
import { selectMonastery, setLocationCount } from "./../MainSlice";
import { Monastery } from "./../../types";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
import treatMonasteryName from "./../../utils/treatMonasteryName";

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

  // filter by english name or other names
  const filterQuery = (object: any, props: any) =>
    treatMonasteryName(object.name, object.communities)
      .toLowerCase()
      .indexOf(props.text.toLowerCase()) !== -1 ||
    object.other_names
      .toString()
      .toLowerCase()
      .indexOf(props.text.toLowerCase()) !== -1;

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
        filterBy={filterQuery}
        onChange={(e) => dispatchSelectedMonastery(e)}
        labelKey={(object: any) =>
          treatMonasteryName(object.name, object.communities)
        }
        options={locations}
        placeholder="Search location..."
      />
    </div>
  );
};

export default React.memo(MapSearch);
