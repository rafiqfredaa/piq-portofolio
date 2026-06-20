function Settings({ focusDuration, breakDuration, sessions, onChange }) {
  const update = (key, value) => {
    onChange({ focusDuration, breakDuration, sessions, [key]: value });
  };

  return (
    <div className="settings-card">
      <h3>Settings</h3>
      <div className="field-group">
        <label>Focus Duration</label>
        <div className="button-group">
          {[25, 30, 45, 60].map((value) => (
            <button
              key={value}
              className={value === focusDuration ? 'choice active' : 'choice'}
              onClick={() => update('focusDuration', value)}
            >
              {value}m
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          value={focusDuration}
          onChange={(event) => update('focusDuration', Number(event.target.value))}
        />
      </div>

      <div className="field-group">
        <label>Break Duration</label>
        <div className="button-group">
          {[5, 10, 15].map((value) => (
            <button
              key={value}
              className={value === breakDuration ? 'choice active' : 'choice'}
              onClick={() => update('breakDuration', value)}
            >
              {value}m
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          value={breakDuration}
          onChange={(event) => update('breakDuration', Number(event.target.value))}
        />
      </div>

      <div className="field-group">
        <label>Sessions</label>
        <div className="button-group">
          {[1, 2, 4, 8].map((value) => (
            <button
              key={value}
              className={value === sessions ? 'choice active' : 'choice'}
              onClick={() => update('sessions', value)}
            >
              {value}
            </button>
          ))}
        </div>
        <input
          type="number"
          min="1"
          value={sessions}
          onChange={(event) => update('sessions', Number(event.target.value))}
        />
      </div>
    </div>
  );
}

export default Settings;
