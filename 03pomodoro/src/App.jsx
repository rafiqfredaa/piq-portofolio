import { useEffect, useState } from 'react';
import Timer from './components/Timer.jsx';
import Controls from './components/Controls.jsx';
import Settings from './components/Settings.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Statistics from './components/Statistics.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import usePomodoro from './hooks/usePomodoro.js';

function App() {
  const [showSettings, setShowSettings] = useState(true);
  const [showStatistics, setShowStatistics] = useState(true);
  const {
    status,
    focusDuration,
    breakDuration,
    sessions,
    currentSession,
    secondsLeft,
    isRunning,
    isPaused,
    theme,
    quote,
    progress,
    totalFocusMinutes,
    totalBreakMinutes,
    focusToday,
    breakToday,
    completedToday,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipSession,
    updateSettings,
    toggleTheme,
  } = usePomodoro();

  useEffect(() => {
    document.title = `${status} • ${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')} - Pomodoro Focus`;
  }, [secondsLeft, status]);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Fokus Fokus Fokus</h1>
        </div>
        <div className="header-actions">
          <button
            className={`btn outline settings-toggle ${showSettings ? 'active-toggle' : 'inactive-toggle'}`}
            onClick={() => setShowSettings((value) => !value)}
          >
            Settings
          </button>
          <button
            className={`btn outline stats-toggle ${showStatistics ? 'active-toggle' : 'inactive-toggle'}`}
            onClick={() => setShowStatistics((value) => !value)}
          >
            Statistics
          </button>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="content-grid">
        <section className="main-card">
          <Timer
            secondsLeft={secondsLeft}
            progress={progress}
            currentSession={currentSession}
            totalSessions={sessions}
            quote={quote}
          />

          <Controls
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={startTimer}
            onPause={pauseTimer}
            onResume={resumeTimer}
            onReset={resetTimer}
            onSkip={skipSession}
          />

          <ProgressBar progress={progress} currentSession={currentSession} totalSessions={sessions} />
        </section>
      </main>

      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-box" onClick={(event) => event.stopPropagation()}>
            <Settings
              focusDuration={focusDuration}
              breakDuration={breakDuration}
              sessions={sessions}
              onChange={updateSettings}
            />
            <button className="btn ghost modal-close" onClick={() => setShowSettings(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {showStatistics && (
        <div className="modal-overlay" onClick={() => setShowStatistics(false)}>
          <div className="modal-box" onClick={(event) => event.stopPropagation()}>
            <Statistics
              completedToday={completedToday}
              focusToday={focusToday}
              breakToday={breakToday}
              totalFocusHours={Math.floor(totalFocusMinutes / 60)}
              totalFocusMinutes={totalFocusMinutes % 60}
              totalBreakHours={Math.floor(totalBreakMinutes / 60)}
              totalBreakMinutes={totalBreakMinutes % 60}
            />
            <button className="btn ghost modal-close" onClick={() => setShowStatistics(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
