import React from "react";

const DailyWorkout = ({ workoutData, stats, handleInputChange }) => {
  if (workoutData.length === 0) {
    return (
      <div className="tab-content active">
        <div className="empty-message">
          <h3>No workout scheduled for this day</h3>
          <p>Select a different day or week to view exercises.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content active">
      <div className="info-banner">
        💡 <strong>BW exercises scale</strong> with your bodyweight |{" "}
        <strong>Blue</strong> = Suggested weight | <strong>Orange</strong> =
        Your performance | <strong>Green</strong> = Next weight | ☁️{" "}
        <strong>Add Google Sheets URL</strong> to auto-save progress!
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="label">Session</div>
          <div className="value">{stats.session}</div>
        </div>
        <div className="stat-card">
          <div className="label">Exercises</div>
          <div className="value">{stats.exercises}</div>
        </div>
        <div className="stat-card">
          <div className="label">Sets</div>
          <div className="value">{stats.sets}</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Gym</th>
            <th>Home</th>
            <th>Set#</th>
            <th>Reps</th>
            <th>RIR</th>
            <th>Suggested</th>
            <th>✏️ Actual Wt</th>
            <th>✏️ Reps</th>
            <th>✏️ RIR</th>
            <th>Next Wt</th>
            <th>Done</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {workoutData.map((exercise, idx) => (
            <tr key={exercise.key}>
              <td className="exercise-name">
                <div className="exercise-primary">{exercise.e}</div>
              </td>
              <td className="equipment-gym">{exercise.g}</td>
              <td className="equipment-home">{exercise.h}</td>
              <td className="set-number">{exercise.set}</td>
              <td className="reps-range">
                {exercise.rL}-{exercise.rH}
              </td>
              <td className="rir-target">{exercise.r}</td>
              <td className="suggested-wt">{exercise.suggestedWt} lb</td>
              <td className="input-cell">
                <input
                  type="number"
                  value={exercise.actualWt}
                  onChange={(e) =>
                    handleInputChange(idx, "actualWt", e.target.value)
                  }
                  placeholder="—"
                />
              </td>
              <td className="input-cell">
                <input
                  type="number"
                  value={exercise.actualReps}
                  onChange={(e) =>
                    handleInputChange(idx, "actualReps", e.target.value)
                  }
                  placeholder="—"
                />
              </td>
              <td className="input-cell">
                <input
                  type="number"
                  value={exercise.actualRir}
                  onChange={(e) =>
                    handleInputChange(idx, "actualRir", e.target.value)
                  }
                  placeholder="—"
                />
              </td>
              <td className="next-wt">{exercise.nextWt}</td>
              <td className="done">
                {exercise.done && <span className="done-check">✓</span>}
              </td>
              <td className="notes">{exercise.n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DailyWorkout;
