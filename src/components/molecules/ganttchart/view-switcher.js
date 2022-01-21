import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
export const ViewSwitcher = ({
  onViewModeChange,
  onViewListChange,
  isChecked
}) => {
  return (
    <div className="flex justify-start mb-2">
      <button className="btn" onClick={() => onViewModeChange(ViewMode.Day)}>
        Day
      </button>
      <button
        className="btn"
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </button>
      <button
        className="btn"
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </button>
    </div>
  )

  {/* <div className="Switch">
        <label className="Switch_Toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="Slider" />
        </label>
        Show Task List
      </div> */}

};
