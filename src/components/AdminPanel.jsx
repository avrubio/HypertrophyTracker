import React, { useEffect, useState } from "react";

import { workoutUtils } from "../utils/workoutUtils";

const defaultRow = {
  w: 1,
  d: "Wednesday",
  s: "Accessory",
  e: "New Exercise",
  g: "Gym Variation",
  h: "Home Variation",
  set: 1,
  rL: 8,
  rH: 12,
  r: "3 RIR",
  b: 45,
  isBW: false,
  n: "",
};

const AdminPanel = ({ programData, setProgramData }) => {
  const [localProgram, setLocalProgram] = useState(programData);

  useEffect(() => {
    setLocalProgram(programData);
  }, [programData]);

  const updateRow = (index, field, value) => {
    const updated = [...localProgram];
    if (["w", "set", "rL", "rH", "b"].includes(field)) {
      updated[index][field] = Number(value);
    } else if (field === "isBW") {
      updated[index][field] = value === "true";
    } else {
      updated[index][field] = value;
    }
    setLocalProgram(updated);
  };

  const addRow = () => {
    setLocalProgram([...localProgram, { ...defaultRow }]);
  };

  const deleteRow = (index) => {
    setLocalProgram(localProgram.filter((_, idx) => idx !== index));
  };

  const saveProgram = () => {
    workoutUtils.saveProgramData(localProgram);
    setProgramData(localProgram);
  };

  const resetProgram = () => {
    workoutUtils.resetProgramData();
    const defaultProgram = workoutUtils.loadProgramData();
    setLocalProgram(defaultProgram);
    setProgramData(defaultProgram);
  };

  const getWeekRIR = (baseRIR, weekNum) => {
    const rirMap = {
      1: baseRIR,
      2: baseRIR.replace("3 RIR", "2 RIR"),
      3: baseRIR.replace("3 RIR", "1-2 RIR"),
      4: baseRIR.replace("3 RIR", "1 RIR"),
      5: baseRIR.replace("3 RIR", "0-1 RIR"),
      6: baseRIR.replace("3 RIR", "4+ RIR"),
    };
    return rirMap[weekNum] || baseRIR;
  };

  const generatePreviewForWeek = (week) => {
    const baseWeekData = localProgram.filter((row) => row.w === 1);
    const weekData = {};

    baseWeekData.forEach((row) => {
      const day = row.d;
      if (!weekData[day]) weekData[day] = [];
      weekData[day].push({
        ...row,
        w: week,
        r: getWeekRIR(row.r, week),
      });
    });

    return weekData;
  };

  return (
    <div className="tab-content active admin-panel">
      <h2>🛠️ Admin Program Editor</h2>
      <p>
        Edit your full workout program here. This editor manages the Week 1
        template, and the preview below shows how it expands into the full
        6-week progression.
      </p>

      <div className="admin-actions">
        <button className="save-button" onClick={saveProgram}>
          Save Program
        </button>
        <button className="reset-button" onClick={resetProgram}>
          Reset to Default
        </button>
        <button className="add-button" onClick={addRow}>
          + Add Exercise Row
        </button>
      </div>

      <div className="admin-note">
        <strong>Tip:</strong> Add your shoulder rehab and hip flexor exercises
        to the program below, then save.
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Day</th>
              <th>Session</th>
              <th>Exercise</th>
              <th>Gym</th>
              <th>Home</th>
              <th>Set</th>
              <th>Reps</th>
              <th>RIR</th>
              <th>Base Wt</th>
              <th>BW</th>
              <th>Notes</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {localProgram.map((row, index) => (
              <tr key={`${row.e}-${index}`}>
                <td>
                  <input
                    type="number"
                    value={row.w}
                    onChange={(e) => updateRow(index, "w", e.target.value)}
                    min="1"
                    max="6"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.d}
                    onChange={(e) => updateRow(index, "d", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.s}
                    onChange={(e) => updateRow(index, "s", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.e}
                    onChange={(e) => updateRow(index, "e", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.g}
                    onChange={(e) => updateRow(index, "g", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.h}
                    onChange={(e) => updateRow(index, "h", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.set}
                    onChange={(e) => updateRow(index, "set", e.target.value)}
                    min="1"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={`${row.rL}-${row.rH}`}
                    onChange={(e) => {
                      const [rL, rH] = e.target.value
                        .split("-")
                        .map((v) => Number(v.trim()) || 0);
                      updateRow(index, "rL", rL);
                      updateRow(index, "rH", rH);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.r}
                    onChange={(e) => updateRow(index, "r", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.b}
                    onChange={(e) => updateRow(index, "b", e.target.value)}
                    min="0"
                  />
                </td>
                <td>
                  <select
                    value={row.isBW ? "true" : "false"}
                    onChange={(e) => updateRow(index, "isBW", e.target.value)}
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    value={row.n || ""}
                    onChange={(e) => updateRow(index, "n", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="delete-row"
                    onClick={() => deleteRow(index)}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-preview">
        <h3>📅 Full 6-Week Plan Preview</h3>
        <p className="preview-note">
          The chart below shows the full 6-week progression generated from your
          Week 1 template. Add shoulder rehab, hip flexor, or other accessory
          work to Week 1 and your full program will update automatically.
        </p>

        {[1, 2, 3, 4, 5, 6].map((week) => {
          const weekData = generatePreviewForWeek(week);
          return (
            <div key={week} className="preview-week">
              <h4>Week {week}</h4>
              {Object.entries(weekData).length === 0 ? (
                <p>No exercises defined for Week 1 yet.</p>
              ) : (
                Object.entries(weekData).map(([day, exercises]) => (
                  <div key={day} className="preview-day">
                    <h5>{day}</h5>
                    <div className="preview-exercises">
                      {exercises.map((exercise, idx) => (
                        <div
                          key={`${exercise.e}-${idx}`}
                          className="preview-exercise-item"
                        >
                          <strong>{exercise.e}</strong> • {exercise.s}
                          <div className="preview-row">
                            <span>{exercise.g}</span>
                            <span>{exercise.h}</span>
                            <span>
                              {exercise.rL}-{exercise.rH}
                            </span>
                            <span>{exercise.r}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPanel;
