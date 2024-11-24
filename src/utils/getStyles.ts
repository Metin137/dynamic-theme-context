import React, { useMemo } from "react";
import useTheme from "../hooks/useTheme";
import { ThemeColorsType } from "../types";

const getStyles = <Styles>(
  createStyles: (
    theme: ThemeColorsType,
    activeTheme: string,
    isDark: boolean
  ) => Styles,
  deps: React.DependencyList = []
): Styles => {
  const { theme, activeTheme, isDark } = useTheme();

  return useMemo(() => {
    return createStyles(theme, activeTheme, isDark);
  }, [activeTheme, ...deps]);
};

export default getStyles;
