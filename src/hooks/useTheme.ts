import React, {useCallback, useContext} from 'react';
import {ThemeContext} from '../providers/ThemeProvider';
import {DefaultThemeKeys, UseThemeReturnType} from '../types';

export default function useTheme(): UseThemeReturnType {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  const {theme, loading, setTheme, themes} = context;

  if (loading) {
    throw new Error('Tried to use ThemeContext before it was initialized');
  }

  const themeColors = themes[theme];
  const isDark = theme === DefaultThemeKeys.Dark;

  return {
    theme: themeColors,
    activeTheme: theme,
    isDark,
    setActiveTheme: useCallback(
      (themeName: string) => setTheme(themeName),
      [setTheme],
    ),
    toggleTheme: useCallback(
      () =>
        setTheme(
          theme === DefaultThemeKeys.Dark
            ? DefaultThemeKeys.Light
            : DefaultThemeKeys.Dark,
        ),
      [setTheme, theme],
    ),
  };
}
