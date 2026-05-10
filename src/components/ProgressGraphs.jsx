import React, { useEffect, useState } from "react";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { programData } from "../data/programData";
import { workoutUtils } from "../utils/workoutUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const ProgressGraphs = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const loadProgressData = () => {
      const savedData = workoutUtils.loadSavedData();
      const exercises = [
        "Hip Thrust",
        "Smith Squat",
        "Kas Glute Bridge",
        "Single-Arm Row",
        "Pull-Up (BW)",
        "Push-Up (BW)",
      ];

      const data = {};

      exercises.forEach((exerciseName) => {
        const exerciseData = [];

        // Get data for each week
        for (let week = 1; week <= 6; week++) {
          // Find the exercise in program data
          const exercise = programData.find(
            (ex) => ex.e === exerciseName && ex.w === 1,
          );

          if (exercise) {
            // Check if there's saved data for this exercise in this week
            const key = workoutUtils.createWorkoutKey(week, "Monday", 0); // Using Monday as reference
            const savedWeight = savedData[`${key}-wt`];

            if (savedWeight) {
              exerciseData.push({
                week: `Week ${week}`,
                weight: parseInt(savedWeight),
              });
            } else {
              // Use suggested weight if no actual data
              const suggestedWeight = workoutUtils.getSuggestedWeight(
                exercise,
                158,
                week,
              );
              exerciseData.push({
                week: `Week ${week}`,
                weight: suggestedWeight,
              });
            }
          }
        }

        data[exerciseName] = exerciseData;
      });

      setChartData(data);
    };

    loadProgressData();
  }, []);

  const createChartData = (exerciseName) => {
    const exerciseData = chartData[exerciseName] || [];

    return {
      labels: exerciseData.map((d) => d.week),
      datasets: [
        {
          label: `${exerciseName} Weight (lbs)`,
          data: exerciseData.map((d) => d.weight),
          borderColor: "#ffd700",
          backgroundColor: "rgba(255, 215, 0, 0.1)",
          tension: 0.4,
          pointBackgroundColor: "#ffd700",
          pointBorderColor: "#1a1a2e",
          pointBorderWidth: 2,
          pointRadius: 6,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1a1a2e",
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Progressive Overload Tracking",
        color: "#1a1a2e",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#1a1a2e",
          callback: function (value) {
            return value + " lbs";
          },
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#1a1a2e",
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return (
    <div id="graphs" className="tab-content active">
      <div className="graphs-container">
        <div className="graph-section">
          <h3>📈 Progressive Overload: Hip Thrust</h3>
          <div className="chart-wrapper">
            {chartData["Hip Thrust"] ? (
              <Line
                data={createChartData("Hip Thrust")}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Hip Thrust Progressive Overload",
                    },
                  },
                }}
              />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "50px 0",
                }}
              >
                Complete workouts to see progress charts
              </p>
            )}
          </div>
        </div>

        <div className="graph-section">
          <h3>📈 Progressive Overload: Smith Squat</h3>
          <div className="chart-wrapper">
            {chartData["Smith Squat"] ? (
              <Line
                data={createChartData("Smith Squat")}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Smith Squat Progressive Overload",
                    },
                  },
                }}
              />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "50px 0",
                }}
              >
                Complete workouts to see progress charts
              </p>
            )}
          </div>
        </div>

        <div className="graph-section">
          <h3>📈 Progressive Overload: Kas Glute Bridge</h3>
          <div className="chart-wrapper">
            {chartData["Kas Glute Bridge"] ? (
              <Line
                data={createChartData("Kas Glute Bridge")}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Kas Glute Bridge Progressive Overload",
                    },
                  },
                }}
              />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "50px 0",
                }}
              >
                Complete workouts to see progress charts
              </p>
            )}
          </div>
        </div>

        <div className="graph-section">
          <h3>📈 Progressive Overload: Single-Arm Row</h3>
          <div className="chart-wrapper">
            {chartData["Single-Arm Row"] ? (
              <Line
                data={createChartData("Single-Arm Row")}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Single-Arm Row Progressive Overload",
                    },
                  },
                }}
              />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "50px 0",
                }}
              >
                Complete workouts to see progress charts
              </p>
            )}
          </div>
        </div>

        <div className="graph-section">
          <h3>📈 Progressive Overload: Pull-Up (BW)</h3>
          <div className="chart-wrapper">
            {chartData["Pull-Up (BW)"] ? (
              <Line
                data={createChartData("Pull-Up (BW)")}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Pull-Up Progressive Overload",
                    },
                  },
                }}
              />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "50px 0",
                }}
              >
                Complete workouts to see progress charts
              </p>
            )}
          </div>
        </div>

        <div className="graph-section">
          <h3>📈 Progressive Overload: Push-Up (BW)</h3>
          <div className="chart-wrapper">
            {chartData["Push-Up (BW)"] ? (
              <Line
                data={createChartData("Push-Up (BW)")}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: {
                      ...chartOptions.plugins.title,
                      text: "Push-Up Progressive Overload",
                    },
                  },
                }}
              />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#999",
                  padding: "50px 0",
                }}
              >
                Complete workouts to see progress charts
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressGraphs;
