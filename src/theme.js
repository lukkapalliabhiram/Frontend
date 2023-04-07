export function setLightTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light'); // save user preference to local storage
  }
  
  export function setDarkTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark'); // save user preference to local storage
  }
  
  export function toggleTheme() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  }
  