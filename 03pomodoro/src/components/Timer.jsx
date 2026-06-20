import { formatTime } from '../utils/time.js';

function Timer({ secondsLeft, progress, currentSession, totalSessions, quote }) {
  const circularRadius = 110;
  const circumference = 2 * Math.PI * circularRadius;
  const dash = ((100 - progress) / 100) * circumference;

  return (
    <div className="timer-card">
      <div className="progress-ring clean-ring">
        <div className="timer-display">
          <div className="timer-center-time">{formatTime(secondsLeft)}</div>
        </div>
      </div>

      <div className="quote-box">
        <p>“{quote}”</p>
      </div>
    </div>
  );
}

export default Timer;
