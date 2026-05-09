import React from "react";

const InfoTerms = () => {
  return (
    <div id="info" className="tab-content active">
      <div className="info-container">
        <div className="info-section">
          <h3>📚 Training Terms & Concepts</h3>

          <div className="term">
            <div className="term-title">RIR (Reps In Reserve)</div>
            <div className="term-definition">
              The number of repetitions you could have completed beyond the ones
              you actually performed. For example, if you complete 10 reps with
              3 RIR, you could have done 13 total reps before failing. This is a
              key metric for managing training intensity and fatigue.
            </div>
          </div>

          <div className="term">
            <div className="term-title">Progressive Overload</div>
            <div className="term-definition">
              Gradually increasing the demands on your muscles over time. This
              can be done by increasing weight, reps, sets, or decreasing rest
              periods. Progressive overload is essential for continued muscle
              growth and strength gains.
            </div>
          </div>

          <div className="term">
            <div className="term-title">Hypertrophy</div>
            <div className="term-definition">
              The increase in muscle size. This program focuses on hypertrophy
              through moderate to high reps (6-20 range), controlled tempos, and
              progressive increases in volume and intensity.
            </div>
          </div>

          <div className="term">
            <div className="term-title">Volume (Training Volume)</div>
            <div className="term-definition">
              Total amount of work performed, calculated as sets × reps ×
              weight. Higher volume generally drives more muscle growth when
              managed properly. This program progressively increases volume from
              W1-W5, then deloads in W6.
            </div>
          </div>

          <div className="term">
            <div className="term-title">Time Under Tension (TUT)</div>
            <div className="term-definition">
              The total duration your muscles spend working during a set. Longer
              TUT (30-60+ seconds) is optimal for hypertrophy. This can be
              achieved through slower tempos or higher reps.
            </div>
          </div>

          <div className="term">
            <div className="term-title">Deload Week</div>
            <div className="term-definition">
              A planned recovery week (Week 6 in this program) where volume and
              intensity are reduced significantly (4+ RIR). This allows your
              body to recover, prevent injury, and prepare for the next training
              block.
            </div>
          </div>

          <div className="term">
            <div className="term-title">Compound Exercises</div>
            <div className="term-definition">
              Multi-joint movements that work multiple muscle groups (Hip
              Thrust, Squat, Row). These are efficient for building strength and
              muscle across large muscle groups.
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
              The gluteus maximus is capable of producing enormous amounts of
              force and has tremendous growth potential. The glutes should be
              prioritized in any lower body program.
            </p>
          </div>

          <div className="principle">
            <h4>2. Horizontal Abduction & Extension Are Key</h4>
            <p>
              The glutes are best activated through hip extension (Hip Thrusts,
              RDLs) and horizontal abduction (Cable Kickbacks). These movements
              maximize glute recruitment.
            </p>
          </div>

          <div className="principle">
            <h4>3. Range of Motion Matters</h4>
            <p>
              Full range of motion is critical for glute development. Deep
              squats, full hip extension, and controlled eccentric movements all
              contribute to maximum glute growth.
            </p>
          </div>

          <div className="principle">
            <h4>4. Strength & Hypertrophy Go Hand-in-Hand</h4>
            <p>
              Getting stronger in compound movements drives muscle growth. This
              program combines heavy strength work with higher-rep isolation for
              optimal hypertrophy.
            </p>
          </div>

          <div className="principle">
            <h4>5. Volume & Frequency Are Critical</h4>
            <p>
              Glutes respond extremely well to high volume and high frequency
              (3-4x per week). This program hits glutes 4-5 days per week
              through different movement patterns.
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
              fatigue and prevents overuse injuries while preparing you for the
              next training block.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoTerms;
