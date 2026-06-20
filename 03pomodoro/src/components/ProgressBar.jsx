function ProgressBar({ progress, currentSession, totalSessions }) {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <div>
          <p className="label">Progress</p>
          <strong>{progress}%</strong>
        </div>
        <small>Session {currentSession} / {totalSessions}</small>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
