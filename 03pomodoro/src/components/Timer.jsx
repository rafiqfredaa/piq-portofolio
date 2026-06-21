import { formatTime } from '../utils/time.js';

function Timer({ secondsLeft, status, progress, currentSession, totalSessions, quote }) {
  const circularRadius = 110;
  const circumference = 2 * Math.PI * circularRadius;
  const dash = ((100 - progress) / 100) * circumference;

  return (
    <div className="timer-card">
      <div className="timer-display">
        <div className="timer-center-time">{formatTime(secondsLeft)}</div>
        <div className="timer-status-label">{status === 'Break Time' ? 'Break' : status === 'Focus Time' ? 'Focus' : 'Completed'}</div>
      </div>

      <div className="quote-box">
        <p>“{quote}”</p>
      </div>
    </div>
  );
}

export default Timer;
