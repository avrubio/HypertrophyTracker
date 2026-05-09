import { useState } from 'react';

import BodyMeasurements from './components/BodyMeasurements';
import DailyWorkout from './components/DailyWorkout';
import InfoTerms from './components/InfoTerms';
import ProgramView from './components/ProgramView';
import ProgressGraphs from './components/ProgressGraphs';
import WorkoutControls from './components/WorkoutControls';
import { useWorkoutData } from './hooks/useWorkoutData';

function App() {
  const [activeTab, setActiveTab] = useState("daily");

  const workoutData = useWorkoutData();

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "daily":
        return (
          <DailyWorkout
            workoutData={workoutData.workoutData}
            stats={workoutData.stats}
            handleInputChange={workoutData.handleInputChange}
          />
        );
      case "program":
        return <ProgramView />;
      case "graphs":
        return <ProgressGraphs />;
      case "measurements":
        return <BodyMeasurements />;
      case "info":
        return <InfoTerms />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>💪 HYPERTROPHY + AERIAL TRACKER</h1>
        <p>6-Week Progressive Training Program</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "daily" ? "active" : ""}`}
          onClick={() => switchTab("daily")}
        >
          📋 Daily Workout
        </button>
        <button
          className={`tab-button ${activeTab === "program" ? "active" : ""}`}
          onClick={() => switchTab("program")}
        >
          📊 Full Program
        </button>
        <button
          className={`tab-button ${activeTab === "graphs" ? "active" : ""}`}
          onClick={() => switchTab("graphs")}
        >
          📈 Progress Graphs
        </button>
        <button
          className={`tab-button ${activeTab === "measurements" ? "active" : ""}`}
          onClick={() => switchTab("measurements")}
        >
          📏 Body Measurements
        </button>
        <button
          className={`tab-button ${activeTab === "info" ? "active" : ""}`}
          onClick={() => switchTab("info")}
        >
          ℹ️ Info & Terms
        </button>
      </div>

      {activeTab === "daily" && (
        <WorkoutControls
          week={workoutData.week}
          setWeek={workoutData.setWeek}
          day={workoutData.day}
          setDay={workoutData.setDay}
          bw={workoutData.bw}
          setBw={workoutData.setBw}
          startDate={workoutData.startDate}
          setStartDate={workoutData.setStartDate}
          inc={workoutData.inc}
          setInc={workoutData.setInc}
          gsUrl={workoutData.gsUrl}
          setGsUrl={workoutData.setGsUrl}
          saveBW={workoutData.saveBW}
          saveStartDate={workoutData.saveStartDate}
          saveGSUrl={workoutData.saveGSUrl}
        />
      )}

      {renderTabContent()}
    </div>
  );
}

export default App;
    <div className="container">
      <div className="header">
        <h1>💪 HYPERTROPHY + AERIAL TRACKER</h1>
        <p>6-Week Progressive Training Program</p>
      </div>

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "daily" ? "active" : ""}`}
          onClick={() => switchTab("daily")}
        >
          📋 Daily Workout
        </button>
        <button
          className={`tab-button ${activeTab === "program" ? "active" : ""}`}
          onClick={() => switchTab("program")}
        >
          📊 Full Program
        </button>
        <button
          className={`tab-button ${activeTab === "graphs" ? "active" : ""}`}
          onClick={() => switchTab("graphs")}
        >
          📈 Progress Graphs
        </button>
        <button
          className={`tab-button ${activeTab === "measurements" ? "active" : ""}`}
          onClick={() => switchTab("measurements")}
        >
          📏 Body Measurements
        </button>
        <button
          className={`tab-button ${activeTab === "info" ? "active" : ""}`}
          onClick={() => switchTab("info")}
        >
          ℹ️ Info & Terms
        </button>
      </div>

      {/* Daily Workout Tab */}
      {activeTab === "daily" && (
        <div id="daily" className="tab-content active">
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
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
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

          <div className="info-banner">
            💡 <strong>BW exercises scale</strong> with your bodyweight |{" "}
            <strong>Blue</strong> = Suggested weight | <strong>Orange</strong> =
            Your performance | <strong>Green</strong> = Next weight | ☁️{" "}
            <strong>Add Google Sheets URL</strong> to auto-save progress!
          </div>

          <div className="stats">
            <div className="stat-card">
              <div className="label">Exercises</div>
              <div className="value">{stats.exercises}</div>
            </div>
            <div className="stat-card">
              <div className="label">Total Sets</div>
              <div className="value">{stats.sets}</div>
            </div>
            <div className="stat-card">
              <div className="label">Session</div>
              <div className="value">{stats.session}</div>
            </div>
          </div>

          <div className="table-wrapper">
            <table id="workoutTable">
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
              <tbody id="tableBody">
                {workoutData.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="empty-message">
                      No exercises for this day
                    </td>
                  </tr>
                ) : (
                  workoutData.map((ex, idx) => (
                    <tr key={ex.key}>
                      <td className="exercise-name">{ex.e}</td>
                      <td>{ex.g}</td>
                      <td>{ex.h}</td>
                      <td className="set-num">{ex.set}</td>
                      <td className="reps">
                        {ex.rL}-{ex.rH}
                      </td>
                      <td className="rir">{ex.r}</td>
                      <td className="suggested-wt">{ex.suggestedWt}</td>
                      <td className="input-cell">
                        <input
                          type="number"
                          className="actual-wt"
                          value={ex.actualWt}
                          onChange={(e) =>
                            handleInputChange(idx, "actualWt", e.target.value)
                          }
                        />
                      </td>
                      <td className="input-cell">
                        <input
                          type="number"
                          className="actual-reps"
                          value={ex.actualReps}
                          onChange={(e) =>
                            handleInputChange(idx, "actualReps", e.target.value)
                          }
                        />
                      </td>
                      <td className="input-cell">
                        <input
                          type="number"
                          className="actual-rir"
                          value={ex.actualRir}
                          onChange={(e) =>
                            handleInputChange(idx, "actualRir", e.target.value)
                          }
                        />
                      </td>
                      <td className="next-wt">{ex.nextWt}</td>
                      <td className="done">
                        <span className="done-check">
                          {ex.actualWt && ex.actualReps ? "✓" : ""}
                        </span>
                      </td>
                      <td className="notes">{ex.n}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* INFO TAB */}
      {activeTab === "info" && (
        <div id="info" className="tab-content active">
          <div className="info-container">
            <div className="info-section">
              <h3>📚 Training Terms & Concepts</h3>

              <div className="term">
                <div className="term-title">RIR (Reps In Reserve)</div>
                <div className="term-definition">
                  The number of repetitions you could have completed beyond the
                  ones you actually performed. For example, if you complete 10
                  reps with 3 RIR, you could have done 13 total reps before
                  failing. This is a key metric for managing training intensity
                  and fatigue.
                </div>
              </div>

              <div className="term">
                <div className="term-title">Progressive Overload</div>
                <div className="term-definition">
                  Gradually increasing the demands on your muscles over time.
                  This can be done by increasing weight, reps, sets, or
                  decreasing rest periods. Progressive overload is essential for
                  continued muscle growth and strength gains.
                </div>
              </div>

              <div className="term">
                <div className="term-title">Hypertrophy</div>
                <div className="term-definition">
                  The increase in muscle size. This program focuses on
                  hypertrophy through moderate to high reps (6-20 range),
                  controlled tempos, and progressive increases in volume and
                  intensity.
                </div>
              </div>

              <div className="term">
                <div className="term-title">Volume (Training Volume)</div>
                <div className="term-definition">
                  Total amount of work performed, calculated as sets × reps ×
                  weight. Higher volume generally drives more muscle growth when
                  managed properly. This program progressively increases volume
                  from W1-W5, then deloads in W6.
                </div>
              </div>

              <div className="term">
                <div className="term-title">Time Under Tension (TUT)</div>
                <div className="term-definition">
                  The total duration your muscles spend working during a set.
                  Longer TUT (30-60+ seconds) is optimal for hypertrophy. This
                  can be achieved through slower tempos or higher reps.
                </div>
              </div>

              <div className="term">
                <div className="term-title">Deload Week</div>
                <div className="term-definition">
                  A planned recovery week (Week 6 in this program) where volume
                  and intensity are reduced significantly (4+ RIR). This allows
                  your body to recover, prevent injury, and prepare for the next
                  training block.
                </div>
              </div>

              <div className="term">
                <div className="term-title">Compound Exercises</div>
                <div className="term-definition">
                  Multi-joint movements that work multiple muscle groups (Hip
                  Thrust, Squat, Row). These are efficient for building strength
                  and muscle across large muscle groups.
                </div>
              </div>

              <div className="term">
                <div className="term-title">Isolation Exercises</div>
                <div className="term-definition">
                  Single-joint movements that target one specific muscle (Cable
                  Kickback, Lat Pulldown). These are excellent for targeting
                  specific muscles and finishing off a workout.
                </div>
              </div>
            </div>

            <div className="info-section">
              <h3>🍑 Bret Contreras - Glute Lab Principles</h3>

              <div className="principle">
                <h4>1. The Glutes Are the Largest and Strongest Muscles</h4>
                <p>
                  The gluteus maximus is capable of producing enormous amounts
                  of force and has tremendous growth potential. The glutes
                  should be prioritized in any lower body program.
                </p>
              </div>

              <div className="principle">
                <h4>2. Horizontal Abduction & Extension Are Key</h4>
                <p>
                  The glutes are best activated through hip extension (Hip
                  Thrusts, RDLs) and horizontal abduction (Cable Kickbacks).
                  These movements maximize glute recruitment.
                </p>
              </div>

              <div className="principle">
                <h4>3. Range of Motion Matters</h4>
                <p>
                  Full range of motion is critical for glute development. Deep
                  squats, full hip extension, and controlled eccentric movements
                  all contribute to maximum glute growth.
                </p>
              </div>

              <div className="principle">
                <h4>4. Strength & Hypertrophy Go Hand-in-Hand</h4>
                <p>
                  Getting stronger in compound movements drives muscle growth.
                  This program combines heavy strength work with higher-rep
                  isolation for optimal hypertrophy.
                </p>
              </div>

              <div className="principle">
                <h4>5. Volume & Frequency Are Critical</h4>
                <p>
                  Glutes respond extremely well to high volume and high
                  frequency (3-4x per week). This program hits glutes 4-5 days
                  per week through different movement patterns.
                </p>
              </div>

              <div className="principle">
                <h4>6. Mind-Muscle Connection is Real</h4>
                <p>
                  Actively squeezing and "feeling" the glutes work increases
                  activation. Slower tempos and pauses enhance mind-muscle
                  connection, especially on isolation exercises.
                </p>
              </div>

              <div className="principle">
                <h4>7. Recovery & Deloads Are Essential</h4>
                <p>
                  Muscles grow during rest. Week 6's deload reduces accumulated
                  fatigue and prevents overuse injuries while preparing you for
                  the next training block.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
