function Statistics({ completedToday, focusToday, breakToday, totalFocusHours, totalFocusMinutes, totalBreakHours, totalBreakMinutes }) {
  return (
    <div className="stats-card">
      <h3>Statistics</h3>
      <div className="stat-item">
        <p>Completed Sessions</p>
        <strong>{completedToday}</strong>
      </div>
      <div className="stat-item">
        <p>Focus Time Today</p>
        <strong>{totalFocusHours}h {totalFocusMinutes}m</strong>
      </div>
      <div className="stat-item">
        <p>Break Time Today</p>
        <strong>{totalBreakHours}h {totalBreakMinutes}m</strong>
      </div>
    </div>
  );
}

export default Statistics;
