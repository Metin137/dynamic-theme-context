interface ThemeColorsType {
  general: {
    primary: string; // Primary color for main actions or emphasis
    secondary: string; // Secondary color for accents
    background: string; // Main background color
    text: string; // Main text color
    border?: string; // Default border color (optional)
    shadow?: string; // Shadow color for UI elements (optional)
  };
  status: {
    success: string; // Success color for notifications or indicators
    error: string; // Error color for alerts or warnings
    warning: string; // Warning color
    info: string; // Info color for informational messages
  };
  components: {
    button: {
      default: string; // Button default background color
      hover: string; // Button hover color
      disabled: string; // Button disabled state color
    };
    input: {
      background: string; // Input field background color
      text: string; // Input text color
      border: string; // Input border color
      focus: string; // Border color when input is focused
    };
    card: {
      background: string; // Card background color
      shadow?: string; // Card shadow color (optional)
      border?: string; // Card border color (optional)
    };
  };
}

type ThemeProviderType = {
  name: string;
  themes: ThemeColorsType;
};

interface ContextType {
  theme: string;
  setTheme: (value: string) => void;
  loading: boolean;
  themes: Record<string, ThemeColorsType>;
}

interface UseThemeReturnType {
  theme: ThemeColorsType;
  activeTheme: string;
  isDark: boolean;
  setActiveTheme: (themeName: string) => void;
  toggleTheme: () => void;
}

interface CreateStylesParams {
  theme: ThemeColorsType;
  activeTheme: string;
  isDark: boolean;
}

enum DefaultThemeKeys {
  Light = "light",
  Dark = "dark",
}

type WithDynamicStylesProps<Styles> = {
  styles: Styles;
};

export {
  ThemeProviderType,
  ContextType,
  ThemeColorsType,
  UseThemeReturnType,
  CreateStylesParams,
  WithDynamicStylesProps,
  DefaultThemeKeys,
};
