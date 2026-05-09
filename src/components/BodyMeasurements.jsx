import React, { useEffect, useState } from "react";

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
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "50px 0",
                  }}
                >
                  Charts will be implemented with Chart.js
                </p>
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Waist (in)</h4>
              <div className="measurement-chart">
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "50px 0",
                  }}
                >
                  Charts will be implemented with Chart.js
                </p>
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Stomach (in)</h4>
              <div className="measurement-chart">
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "50px 0",
                  }}
                >
                  Charts will be implemented with Chart.js
                </p>
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Hips (in)</h4>
              <div className="measurement-chart">
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "50px 0",
                  }}
                >
                  Charts will be implemented with Chart.js
                </p>
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Glutes (in)</h4>
              <div className="measurement-chart">
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "50px 0",
                  }}
                >
                  Charts will be implemented with Chart.js
                </p>
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Thighs (in)</h4>
              <div className="measurement-chart">
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "50px 0",
                  }}
                >
                  Charts will be implemented with Chart.js
                </p>
              </div>
            </div>
            <div className="measurement-chart-wrapper">
              <h4>Left Arm Bicep (in)</h4>
              <div className="measurement-chart">
                <p
                  style={{
                    textAlign: "center",
                    color: "#999",
                    padding: "50px 0",
                  }}
                >
                  Charts will be implemented with Chart.js
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyMeasurements;
