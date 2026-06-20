import { useEffect, useMemo, useState } from 'react';
import { loadJson, loadValue, saveJson, saveValue } from '../utils/storage.js';
import { formatTime, getInitialStats, getTodayKey } from '../utils/time.js';
import { playAlarm, sendNotification } from '../utils/notifications.js';

const QUOTES = [
  'Stay focused and never give up.',
  'Every minute of focus moves you closer to your goal.',
  'Small progress is still progress.',
  'Work hard, then take a meaningful break.',
  'Consistency beats intensity every time.',
];

const STORAGE_KEYS = {
  settings: 'pomodoro-settings',
  theme: 'pomodoro-theme',
  stats: 'pomodoro-stats',
};

const DEFAULTS = {
  focusDuration: 25,
  breakDuration: 5,
  sessions: 4,
  theme: 'light',
};

const getRandomQuote = () => QUOTES[Math.floor(Math.random() * QUOTES.length)];

const loadStats = () => {
  const saved = loadJson(STORAGE_KEYS.stats, null);
  const todayKey = getTodayKey();
  if (!saved || saved.date !== todayKey) {
    return getInitialStats();
  }
  return saved;
};

const loadSettings = () => {
  const saved = loadJson(STORAGE_KEYS.settings, null);
  if (!saved) return DEFAULTS;
  return {
    focusDuration: saved.focusDuration || DEFAULTS.focusDuration,
    breakDuration: saved.breakDuration || DEFAULTS.breakDuration,
    sessions: saved.sessions || DEFAULTS.sessions,
  };
};

const getProgressPercentage = ({ status, secondsLeft, focusDuration, breakDuration, currentSession, sessions }) => {
  const totalSessionSeconds = status === 'Break Time' ? breakDuration * 60 : focusDuration * 60;
  const elapsed = totalSessionSeconds - secondsLeft;
  return totalSessionSeconds > 0 ? Math.round((elapsed / totalSessionSeconds) * 100) : 0;
};

function usePomodoro() {
  const savedSettings = loadSettings();
  const savedTheme = loadValue(STORAGE_KEYS.theme, DEFAULTS.theme);
  const savedStats = loadStats();

  const [focusDuration, setFocusDuration] = useState(savedSettings.focusDuration);
  const [breakDuration, setBreakDuration] = useState(savedSettings.breakDuration);
  const [sessions, setSessions] = useState(savedSettings.sessions);
  const [currentSession, setCurrentSession] = useState(1);
  const [status, setStatus] = useState('Focus Time');
  const [secondsLeft, setSecondsLeft] = useState(savedSettings.focusDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [theme, setTheme] = useState(savedTheme);
  const [quote, setQuote] = useState(getRandomQuote());
  const [stats, setStats] = useState(savedStats);

  useEffect(() => {
    saveJson(STORAGE_KEYS.settings, { focusDuration, breakDuration, sessions });
  }, [focusDuration, breakDuration, sessions]);

  useEffect(() => {
    saveValue(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    saveJson(STORAGE_KEYS.stats, stats);
  }, [stats]);

  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused) {
      interval = window.setInterval(() => {
        setSecondsLeft((current) => current - 1);
      }, 1000);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isRunning, isPaused]);

  useEffect(() => {
    if (!isRunning) return;
    if (secondsLeft > 0) return;

    const finishCurrent = async () => {
      if (status === 'Focus Time') {
        const nextStats = {
          ...stats,
          focusToday: stats.focusToday + focusDuration,
          completedToday: stats.completedToday + 1,
        };
        setStats(nextStats);
        playAlarm();
        await sendNotification('Focus session completed.', 'Time for a break.');

        if (currentSession < sessions) {
          setStatus('Break Time');
          setSecondsLeft(breakDuration * 60);
        } else {
          setIsRunning(false);
          setIsPaused(false);
          setStatus('Completed');
          setSecondsLeft(0);
        }
      } else if (status === 'Break Time') {
        const nextStats = {
          ...stats,
          breakToday: stats.breakToday + breakDuration,
        };
        setStats(nextStats);
        playAlarm();
        await sendNotification('Break completed.', 'Back to focus.');

        setCurrentSession((current) => current + 1);
        setStatus('Focus Time');
        setSecondsLeft(focusDuration * 60);
      }
    };

    finishCurrent();
  }, [secondsLeft, isRunning, status, currentSession, sessions, focusDuration, breakDuration, stats]);

  useEffect(() => {
    const handleKey = (event) => {
      const key = event.key.toLowerCase();
      if (key === ' ') {
        event.preventDefault();
        if (isRunning && !isPaused) pauseTimer();
        else if (isRunning && isPaused) resumeTimer();
        else startTimer();
      }
      if (key === 'r') resetTimer();
      if (key === 's') startTimer();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  const totalFocusMinutes = useMemo(() => focusDuration * sessions, [focusDuration, sessions]);
  const totalBreakMinutes = useMemo(() => Math.max(sessions - 1, 0) * breakDuration, [breakDuration, sessions]);
  const progress = useMemo(
    () => getProgressPercentage({ status, secondsLeft, focusDuration, breakDuration, currentSession, sessions }),
    [status, secondsLeft, focusDuration, breakDuration, currentSession, sessions]
  );

  const startTimer = () => {
    if (status === 'Completed') {
      setStatus('Focus Time');
      setCurrentSession(1);
      setSecondsLeft(focusDuration * 60);
    }
    setIsRunning(true);
    setIsPaused(false);
    if (!quote) setQuote(getRandomQuote());
  };

  const pauseTimer = () => {
    if (!isRunning) return;
    setIsPaused(true);
  };

  const resumeTimer = () => {
    if (!isRunning) return;
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setStatus('Focus Time');
    setCurrentSession(1);
    setSecondsLeft(focusDuration * 60);
    setQuote(getRandomQuote());
  };

  const skipSession = () => {
    if (!isRunning) return;
    setSecondsLeft(0);
  };

  const updateSettings = ({ focusDuration: newFocus, breakDuration: newBreak, sessions: newSessions }) => {
    setFocusDuration(newFocus);
    setBreakDuration(newBreak);
    setSessions(newSessions);
    setQuote(getRandomQuote());
    if (!isRunning) {
      setSecondsLeft(status === 'Break Time' ? newBreak * 60 : newFocus * 60);
    }
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return {
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
    focusToday: stats.focusToday,
    breakToday: stats.breakToday,
    completedToday: stats.completedToday,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipSession,
    updateSettings,
    toggleTheme,
    formatTime,
  };
}

export default usePomodoro;
