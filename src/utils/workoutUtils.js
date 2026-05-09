// Local storage utilities
export const storage = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  remove: (key) => localStorage.removeItem(key),
};

// Workout data utilities
export const workoutUtils = {
  getSuggestedWeight: (exercise, bodyweight, week) => {
    if (exercise.isBW) return bodyweight;

    // For Week 6 (deload), reduce weight by 50%
    if (week === 6) {
      return Math.round(exercise.b * 0.5);
    }

    return exercise.b;
  },

  calculateNextWeight: (actualWt, actualReps, increment) => {
    if (!actualWt || !actualReps) return "—";
    const reps = parseInt(actualReps);
    return reps >= 10 ? parseInt(actualWt) + increment : actualWt;
  },

  createWorkoutKey: (week, day, index) => `${week}-${day}-${index}`,

  loadSavedData: () => {
    const saved = storage.get("workoutData");
    return saved ? JSON.parse(saved) : {};
  },

  saveData: (workoutData) => {
    const dataToSave = {};
    workoutData.forEach((ex) => {
      if (ex.actualWt) dataToSave[`${ex.key}-wt`] = ex.actualWt;
      if (ex.actualReps) dataToSave[`${ex.key}-reps`] = ex.actualReps;
      if (ex.actualRir) dataToSave[`${ex.key}-rir`] = ex.actualRir;
    });
    storage.set("workoutData", JSON.stringify(dataToSave));
  },

  loadBW: () => {
    const saved = storage.get("userBW");
    return saved ? parseInt(saved) : 158;
  },

  saveBW: (bw) => {
    storage.set("userBW", bw.toString());
  },

  loadStartDate: () => {
    return storage.get("programStartDate") || "";
  },

  saveStartDate: (date) => {
    storage.set("programStartDate", date);
  },

  loadGSUrl: () => {
    return (
      storage.get("gsUrl") ||
      "https://script.google.com/macros/s/AKfycbzVnrQW6IAmtH-wxU3DA5F1M5_FacEuvzU685Id2Qo8JENCwotK5Rbb7EOvdutbiNRXBw/exec"
    );
  },

  saveGSUrl: (url) => {
    storage.set("gsUrl", url);
  },
};

// Workout processing utilities
export const processWorkoutData = (
  programData,
  week,
  day,
  bodyweight,
  increment,
) => {
  // Filter exercises by day (Week 1 data contains all exercises)
  const exercises = programData.filter((e) => e.w === 1 && e.d === day);

  // Adjust RIR based on week
  const getWeekRIR = (baseRIR, week) => {
    const rirMap = {
      1: baseRIR, // Week 1 keeps original RIR
      2: baseRIR.replace("3 RIR", "2 RIR"), // Week 2: 2 RIR
      3: baseRIR.replace("3 RIR", "1-2 RIR"), // Week 3: 1-2 RIR
      4: baseRIR.replace("3 RIR", "1 RIR"), // Week 4: 1 RIR
      5: baseRIR.replace("3 RIR", "0-1 RIR"), // Week 5: 0-1 RIR
      6: baseRIR.replace("3 RIR", "4+ RIR"), // Week 6: 4+ RIR (Deload)
    };
    return rirMap[week] || baseRIR;
  };

  const savedData = workoutUtils.loadSavedData();

  if (exercises.length === 0) {
    return { data: [], stats: { exercises: 0, sets: 0, session: "" } };
  }

  const data = exercises.map((ex, idx) => {
    const key = workoutUtils.createWorkoutKey(week, day, idx);
    const actualWt = savedData[`${key}-wt`] || "";
    const actualReps = savedData[`${key}-reps`] || "";
    const actualRir = savedData[`${key}-rir`] || "";
    const nextWt = workoutUtils.calculateNextWeight(
      actualWt,
      actualReps,
      increment,
    );

    return {
      ...ex,
      w: week, // Update the week number for this instance
      r: getWeekRIR(ex.r, week), // Adjust RIR based on week
      key,
      suggestedWt: workoutUtils.getSuggestedWeight(ex, bodyweight, week),
      actualWt,
      actualReps,
      actualRir,
      nextWt,
      done: !!(actualWt && actualReps),
    };
  });

  const totalSets = exercises.length;
  const totalExercises = new Set(exercises.map((e) => e.e)).size;
  const session = exercises[0].s;

  return {
    data,
    stats: { exercises: totalExercises, sets: totalSets, session },
  };
};
