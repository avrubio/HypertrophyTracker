import { useState } from "react";

import AdminPanel from "./components/AdminPanel";
import BodyMeasurements from "./components/BodyMeasurements";
import DailyWorkout from "./components/DailyWorkout";
import InfoTerms from "./components/InfoTerms";
import ProgramView from "./components/ProgramView";
import ProgressGraphs from "./components/ProgressGraphs";
import WorkoutControls from "./components/WorkoutControls";
import { useWorkoutData } from "./hooks/useWorkoutData";

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
        return <ProgramView programData={workoutData.programData} />;
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
          className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
          onClick={() => switchTab("admin")}
        >
          🛠️ Admin
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

      {activeTab === "admin" ? (
        <AdminPanel
          programData={workoutData.programData}
          setProgramData={workoutData.setProgramData}
        />
      ) : (
        renderTabContent()
      )}
    </div>
  );
}

export default App;
