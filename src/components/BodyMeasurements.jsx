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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const BodyMeasurements = () => {
  const [measurements, setMeasurements] = useState({
    date: new Date().toISOString().split("T")[0],
    bodyweight: "",
    waist: "",
    stomach: "",
    hips: "",
    glutes: "",
    thighs: "",
    arm: "",
  });

  const [measurementHistory, setMeasurementHistory] = useState([]);

  useEffect(() => {
    // Load saved measurements from localStorage
    const saved = localStorage.getItem("bodyMeasurements");
    if (saved) {
      setMeasurementHistory(JSON.parse(saved));
    }
  }, []);

  const handleInputChange = (field, value) => {
    setMeasurements((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveMeasurements = () => {
    const newMeasurement = {
      ...measurements,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...measurementHistory, newMeasurement];
    setMeasurementHistory(updatedHistory);
    localStorage.setItem("bodyMeasurements", JSON.stringify(updatedHistory));

    // Clear form
    setMeasurements({
      date: new Date().toISOString().split("T")[0],
      bodyweight: "",
      waist: "",
      stomach: "",
      hips: "",
      glutes: "",
      thighs: "",
      arm: "",
    });

    alert("Measurements saved successfully!");
  };

  const clearMeasurementInputs = () => {
    setMeasurements({
      date: new Date().toISOString().split("T")[0],
      bodyweight: "",
      waist: "",
      stomach: "",
      hips: "",
      glutes: "",
      thighs: "",
      arm: "",
    });
  };

  const createMeasurementChart = (measurementType, label, unit) => {
    // Sort measurements by date
    const sortedMeasurements = [...measurementHistory].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    const data = sortedMeasurements
      .filter((m) => m[measurementType] && m[measurementType] !== "")
      .map((m) => ({
        date: new Date(m.date).toLocaleDateString(),
        value: parseFloat(m[measurementType]),
      }));

    if (data.length === 0) {
      return null;
    }

    const chartData = {
      labels: data.map((d) => d.date),
      datasets: [
        {
          label: `${label} (${unit})`,
          data: data.map((d) => d.value),
          borderColor: "#ffd700",
          backgroundColor: "rgba(255, 215, 0, 0.1)",
          tension: 0.4,
          pointBackgroundColor: "#ffd700",
          pointBorderColor: "#1a1a2e",
          pointBorderWidth: 2,
          pointRadius: 5,
        },
      ],
    };

    const options = {
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
          text: `${label} Progress`,
          color: "#1a1a2e",
          font: {
            size: 14,
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
              return value + ` ${unit}`;
            },
          },
        },
        x: {
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            color: "#1a1a2e",
            maxTicksLimit: 7, // Limit number of date labels
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    };

    return { data: chartData, options };
  };

  return (
    <div id="measurements" className="tab-content active">
      <div className="measurements-container">
        <div className="measurements-input-section">
          <h3>📏 Log Body Measurements</h3>

          <div className="measurements-grid">
            <div className="measurement-input-group">
              <label htmlFor="measDate">📅 Date</label>
              <input
                type="date"
                id="measDate"
                value={measurements.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
            <div className="measurement-input-group">
              <label htmlFor="measBW">⚖️ Bodyweight (lb)</label>
              <input
                type="number"
                id="measBW"
                placeholder="e.g. 140"
                step="0.1"
                value={measurements.bodyweight}
                onChange={(e) =>
                  handleInputChange("bodyweight", e.target.value)
                }
              />
            </div>
            <div className="measurement-input-group">
              <label htmlFor="measWaist">Waist (in)</label>
              <input
                type="number"
                id="measWaist"
                placeholder="e.g. 32"
                step="0.1"
                value={measurements.waist}
                onChange={(e) => handleInputChange("waist", e.target.value)}
              />
            </div>
            <div className="measurement-input-group">
              <label htmlFor="measStomach">Stomach (in)</label>
              <input
                type="number"
                id="measStomach"
                placeholder="e.g. 34"
                step="0.1"
                value={measurements.stomach}
                onChange={(e) => handleInputChange("stomach", e.target.value)}
              />
            </div>
            <div className="measurement-input-group">
              <label htmlFor="measHips">Hips (in)</label>
              <input
                type="number"
                id="measHips"
                placeholder="e.g. 38"
                step="0.1"
                value={measurements.hips}
                onChange={(e) => handleInputChange("hips", e.target.value)}
              />
            </div>
            <div className="measurement-input-group">
              <label htmlFor="measGlutes">Glutes (in)</label>
              <input
                type="number"
                id="measGlutes"
                placeholder="e.g. 42"
                step="0.1"
                value={measurements.glutes}
                onChange={(e) => handleInputChange("glutes", e.target.value)}
              />
            </div>
            <div className="measurement-input-group">
              <label htmlFor="measThighs">Thighs (in)</label>
              <input
                type="number"
                id="measThighs"
                placeholder="e.g. 24"
                step="0.1"
                value={measurements.thighs}
                onChange={(e) => handleInputChange("thighs", e.target.value)}
              />
            </div>
            <div className="measurement-input-group">
              <label htmlFor="measArm">Left Arm Bicep (in)</label>
              <input
                type="number"
                id="measArm"
                placeholder="e.g. 14"
                step="0.1"
                value={measurements.arm}
                onChange={(e) => handleInputChange("arm", e.target.value)}
              />
            </div>
          </div>

          <div className="measurements-button-group">
            <button className="save-btn" onClick={saveMeasurements}>
              💾 Save Measurements
            </button>
            <button className="clear-btn" onClick={clearMeasurementInputs}>
              🗑️ Clear
            </button>
          </div>
        </div>

        <div>
          <h3
            style={{
              padding: "0 20px",
              color: "#1a1a2e",
              marginBottom: "20px",
            }}
          >
            📊 Measurement Trends
          </h3>
          <div className="measurements-charts-section">
            <div className="measurement-chart-wrapper">
              <h4>Bodyweight (lb)</h4>
              <div className="measurement-chart">
                {(() => {
                  const chart = createMeasurementChart(
                    "bodyweight",
                    "Bodyweight",
                    "lb",
                  );
                  return chart ? (
                    <Line data={chart.data} options={chart.options} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "50px 0",
                      }}
                    >
                      Log measurements to see progress charts
                    </p>
                  );
                })()}
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Waist (in)</h4>
              <div className="measurement-chart">
                {(() => {
                  const chart = createMeasurementChart("waist", "Waist", "in");
                  return chart ? (
                    <Line data={chart.data} options={chart.options} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "50px 0",
                      }}
                    >
                      Log measurements to see progress charts
                    </p>
                  );
                })()}
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Stomach (in)</h4>
              <div className="measurement-chart">
                {(() => {
                  const chart = createMeasurementChart(
                    "stomach",
                    "Stomach",
                    "in",
                  );
                  return chart ? (
                    <Line data={chart.data} options={chart.options} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "50px 0",
                      }}
                    >
                      Log measurements to see progress charts
                    </p>
                  );
                })()}
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Hips (in)</h4>
              <div className="measurement-chart">
                {(() => {
                  const chart = createMeasurementChart("hips", "Hips", "in");
                  return chart ? (
                    <Line data={chart.data} options={chart.options} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "50px 0",
                      }}
                    >
                      Log measurements to see progress charts
                    </p>
                  );
                })()}
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Glutes (in)</h4>
              <div className="measurement-chart">
                {(() => {
                  const chart = createMeasurementChart(
                    "glutes",
                    "Glutes",
                    "in",
                  );
                  return chart ? (
                    <Line data={chart.data} options={chart.options} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "50px 0",
                      }}
                    >
                      Log measurements to see progress charts
                    </p>
                  );
                })()}
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Thighs (in)</h4>
              <div className="measurement-chart">
                {(() => {
                  const chart = createMeasurementChart(
                    "thighs",
                    "Thighs",
                    "in",
                  );
                  return chart ? (
                    <Line data={chart.data} options={chart.options} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "50px 0",
                      }}
                    >
                      Log measurements to see progress charts
                    </p>
                  );
                })()}
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Left Arm Bicep (in)</h4>
              <div className="measurement-chart">
                {(() => {
                  const chart = createMeasurementChart(
                    "arm",
                    "Left Arm Bicep",
                    "in",
                  );
                  return chart ? (
                    <Line data={chart.data} options={chart.options} />
                  ) : (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#999",
                        padding: "50px 0",
                      }}
                    >
                      Log measurements to see progress charts
                    </p>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurements;
