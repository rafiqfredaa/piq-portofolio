function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="btn outline theme-toggle" onClick={onToggle}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
