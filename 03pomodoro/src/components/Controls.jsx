function Controls({ isRunning, isPaused, onStart, onPause, onResume, onReset, onSkip }) {
  return (
    <div className="controls-card">
      <div className="control-row">
        {!isRunning && (
          <button className="btn primary" onClick={onStart}>Start</button>
        )}
        {isRunning && !isPaused && (
          <button className="btn secondary" onClick={onPause}>Pause</button>
        )}
        {isRunning && isPaused && (
          <button className="btn primary" onClick={onResume}>Resume</button>
        )}
        <button className="btn ghost" onClick={onReset}>Reset</button>
      </div>
      <button className="btn outline" onClick={onSkip}>Skip Session</button>
    </div>
  );
}

export default Controls;
