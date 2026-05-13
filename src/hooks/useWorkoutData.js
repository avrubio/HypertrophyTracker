import { useEffect, useState } from "react";

import { programData } from "../data/programData.js";
import { processWorkoutData, workoutUtils } from "../utils/workoutUtils.js";

export const useWorkoutData = () => {
  const [week, setWeek] = useState(1);
  const [day, setDay] = useState("Monday");
  const [bw, setBw] = useState(workoutUtils.loadBW());
  const [startDate, setStartDate] = useState(workoutUtils.loadStartDate());
  const [inc, setInc] = useState(5);
  const [gsUrl, setGsUrl] = useState(workoutUtils.loadGSUrl());
  const [programDataState, setProgramDataState] = useState(
    workoutUtils.loadProgramData(),
  );
  const [workoutData, setWorkoutData] = useState([]);
  const [stats, setStats] = useState({ exercises: 0, sets: 0, session: "" });

  const updateWorkout = () => {
    const result = processWorkoutData(programDataState, week, day, bw, inc);
    setWorkoutData(result.data);
    setStats(result.stats);
  };

  const handleInputChange = (idx, field, value) => {
    const newData = [...workoutData];
    newData[idx][field] = value;

    if (field === "actualWt" || field === "actualReps") {
      newData[idx].nextWt = workoutUtils.calculateNextWeight(
        newData[idx].actualWt,
        newData[idx].actualReps,
        inc,
      );
    }

    setWorkoutData(newData);
    workoutUtils.saveData(newData);
  };

  const saveBW = () => {
    workoutUtils.saveBW(bw);
  };

  const saveStartDate = () => {
    workoutUtils.saveStartDate(startDate);
  };

  const saveGSUrl = () => {
    workoutUtils.saveGSUrl(gsUrl);
  };

  useEffect(() => {
    updateWorkout();
  }, [week, day, bw, inc, programDataState]);

  return {
    // State
    week,
    day,
    bw,
    startDate,
    inc,
    gsUrl,
    workoutData,
    stats,
    programData: programDataState,

    // Setters
    setWeek,
    setDay,
    setBw,
    setStartDate,
    setInc,
    setGsUrl,
    setProgramData: setProgramDataState,

    // Actions
    handleInputChange,
    saveBW,
    saveStartDate,
    saveGSUrl,
    updateWorkout,
  };
};
