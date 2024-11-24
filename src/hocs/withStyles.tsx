import React, { ComponentType } from "react";
import getStyles from "../utils/getStyles";
import { ThemeColorsType, WithDynamicStylesProps } from "../types";

const withStyles = <T, Styles>(
  WrappedComponent: ComponentType<T & WithDynamicStylesProps<Styles>>,
  createStyles: (
    theme: ThemeColorsType,
    activeTheme: string,
    isDark: boolean
  ) => Styles
): React.FC<T> => {
  const WithStyles: React.FC<T> = (props) => {
    const styles = getStyles(createStyles);

    return <WrappedComponent {...props} styles={styles} />;
  };

  return WithStyles;
};

export default withStyles;
