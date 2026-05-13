import React from "react";

import { workoutUtils } from "../utils/workoutUtils";

const ProgramView = ({ programData }) => {
  const activeProgramData = programData || workoutUtils.loadProgramData();
  // Generate program data for all weeks
  const generateProgramForWeek = (week) => {
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

    const weekData = {};
    activeProgramData
      .filter((ex) => ex.w === 1)
      .forEach((ex) => {
        const day = ex.d;
        if (!weekData[day]) weekData[day] = [];
        weekData[day].push({
          ...ex,
          w: week,
          r: getWeekRIR(ex.r, week),
          suggestedWt: workoutUtils.getSuggestedWeight(ex, 158, week), // Using default BW of 158
        });
      });
    return weekData;
  };

  const getWeekRIR = (week) => {
    const rirMap = {
      1: "3 RIR",
      2: "2 RIR",
      3: "1-2 RIR",
      4: "1 RIR",
      5: "0-1 RIR",
      6: "4+ RIR (Deload)",
    };
    return rirMap[week] || "";
  };

  return (
    <div id="program" className="tab-content active">
      <div className="program-view">
        <h2>📊 Full Program Overview</h2>
        <p>
          Complete 6-week progressive hypertrophy training program with aerial
          focus
        </p>

        {[1, 2, 3, 4, 5, 6].map((week) => {
          const weekData = generateProgramForWeek(week);
          return (
            <div key={week} className="program-week">
              <h2>
                Week {week} - {getWeekRIR(week)}
              </h2>
              <div className="week-days">
                {Object.entries(weekData).map(([day, exercises]) => (
                  <div key={day} className="day-block">
                    <h3>{day}</h3>
                    <div className="session-type">{exercises[0]?.s}</div>

                    {exercises.map((exercise, idx) => (
                      <div key={idx} className="exercise-item">
                        <div className="exercise-header">
                          <strong>{exercise.e}</strong>
                          <span className="set-info">Set {exercise.set}</span>
                        </div>
                        <div className="exercise-details">
                          <div className="detail">
                            <span className="detail-label">Equipment:</span>
                            <span className="detail-value">{exercise.g}</span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">Reps:</span>
                            <span className="detail-value">
                              {exercise.rL}-{exercise.rH}
                            </span>
                          </div>
                          <div className="detail">
                            <span className="detail-label">RIR:</span>
                            <span className="detail-value">{exercise.r}</span>
                          </div>
                          {!exercise.isBW && (
                            <div className="detail">
                              <span className="detail-label">Suggested:</span>
                              <span className="detail-value">
                                {exercise.suggestedWt} lb
                              </span>
                            </div>
                          )}
                        </div>
                        {exercise.n && (
                          <div className="exercise-notes">📝 {exercise.n}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramView;
