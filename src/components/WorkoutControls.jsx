import React from "react";

const WorkoutControls = ({
  week,
  setWeek,
  day,
  setDay,
  bw,
  setBw,
  startDate,
  setStartDate,
  inc,
  setInc,
  gsUrl,
  setGsUrl,
  saveBW,
  saveStartDate,
  saveGSUrl,
}) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="weekSelect">📅 Week</label>
        <select
          id="weekSelect"
          value={week}
          onChange={(e) => setWeek(parseInt(e.target.value))}
        >
          <option value="1">Week 1 (3 RIR)</option>
          <option value="2">Week 2 (2 RIR)</option>
          <option value="3">Week 3 (1-2 RIR)</option>
          <option value="4">Week 4 (1 RIR)</option>
          <option value="5">Week 5 (0-1 RIR)</option>
          <option value="6">Week 6 (4+ RIR - Deload)</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="daySelect">📆 Day</label>
        <select
          id="daySelect"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          {days.map((dayOption) => (
            <option key={dayOption} value={dayOption}>
              {dayOption}
            </option>
          ))}
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="bwInput">⚖️ Bodyweight (lb)</label>
        <input
          type="number"
          id="bwInput"
          value={bw}
          onChange={(e) => {
            setBw(parseInt(e.target.value));
            saveBW();
          }}
        />
      </div>

      <div className="control-group">
        <label htmlFor="startDate">📅 Program Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            saveStartDate();
          }}
        />
      </div>

      <div className="control-group">
        <label htmlFor="incInput">📈 Weight Inc (lb)</label>
        <input
          type="number"
          id="incInput"
          value={inc}
          onChange={(e) => setInc(parseInt(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label htmlFor="gsInput">☁️ Google Sheets URL (Optional)</label>
        <input
          type="text"
          id="gsInput"
          value={gsUrl}
          onChange={(e) => setGsUrl(e.target.value)}
        />
        <button onClick={saveGSUrl}>Save URL</button>
      </div>
    </div>
  );
};

export default WorkoutControls;
