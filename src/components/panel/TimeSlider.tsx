import React from "react";
import ReactSlider from "react-slider";
import { useAppSelector, useAppDispatch } from "./../../app/hooks";
import { setTimeFilter, setUndated } from "./../MainSlice";
import Form from "react-bootstrap/Form";

type TimeSliderProps = {};

const TimeSlider = ({}: TimeSliderProps): JSX.Element => {
  const timeFilter = useAppSelector((state) => state.main.timeFilter);
  const dispatch = useAppDispatch();
  const showUndated = useAppSelector((state) => state.main.undated);

  function selectTimeFilter(value: Array<number>) {
    dispatch(setTimeFilter(value));
  }

  function switchUndated() {
    dispatch(setUndated(!showUndated));
  }

  return (
    <>
      <div style={{ marginBottom: "12px", marginTop: "8px" }}>
        <small>
          from <span className="year">{timeFilter[0]}</span> to{" "}
          <span className="year">{timeFilter[1]}</span>
        </small>
        {timeFilter.includes(1000) && timeFilter.includes(1155) ? "" : ""}
      </div>
      <ReactSlider
        className="customSlider"
        thumbClassName="customSlider-thumb"
        trackClassName="customSlider-track"
        markClassName="customSlider-mark"
        min={1000}
        max={2023}
        defaultValue={[1000, 2023]}
        value={timeFilter}
        onChange={(value: any) => selectTimeFilter(value)}
        pearling
      />
      <br />
      <span>
        <small>
          <Form.Switch
            label="locations without datation"
            checked={showUndated}
            onChange={() => switchUndated()}
          />
        </small>
      </span>
    </>
  );
};

export default TimeSlider;
