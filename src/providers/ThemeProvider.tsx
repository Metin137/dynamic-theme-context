import React, {useEffect, useState, useMemo, ReactNode} from 'react';
import {
  ContextType,
  DefaultThemeKeys,
  ThemeColorsType,
  ThemeProviderType,
} from '../types';
import storageApi from '../utils/storageApi';
/* import {useColorScheme} from 'react-native'; */

export const ThemeContext = React.createContext<ContextType | undefined>(
  undefined,
);

export const themeStorageKey = '@theme';

interface ThemeProviderProps {
  children: ReactNode;
  themes: ThemeProviderType[];
  defaultTheme?: string;
}

const storageThemeActions = {
  get: async (): Promise<string | null> =>
    (await storageApi.get(themeStorageKey)) as string | null,
  set: async (value: string) => await storageApi.set(themeStorageKey, value),
  remove: async () => await storageApi.remove(themeStorageKey),
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themes,
  defaultTheme,
}) => {
  /*  const systemColorScheme = useColorScheme(); */

  const defaultThemeKey =
    defaultTheme ??
    /* (systemColorScheme as string) ?? */ DefaultThemeKeys.Light;

  const [theme, setTheme] = useState<string>(defaultThemeKey);
  const [loading, setLoading] = useState<boolean>(true);

  const themeObject = useMemo(
    () =>
      themes.reduce((acc, themeK) => {
        acc[themeK.name] = themeK.themes;
        return acc;
      }, {} as Record<string, ThemeColorsType>),
    [themes],
  );

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    themeOnChange();
  }, [theme]);

  const loadTheme = async () => {
    try {
      const storedTheme = await storageThemeActions.get();

      setTheme(storedTheme ?? defaultThemeKey);
    } catch (error) {
      console.error('Error loading theme:', error);
      setTheme(defaultThemeKey);
    } finally {
      setLoading(false);
    }
  };

  const themeOnChange = async () => {
    try {
      if (theme) {
        await storageThemeActions.set(theme);
      } else {
        await storageThemeActions.remove();
      }
    } catch (error) {
      console.error('Error updating theme storage:', error);
    }
  };

  const contextState = useMemo(
    () => ({loading, setTheme, theme, themes: themeObject}),
    [theme, loading, themes],
  );

  if (loading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextState}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
