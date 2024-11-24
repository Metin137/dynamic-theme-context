# Dynamic Theme Context

Dynamic Theme Context is a lightweight library designed to handle dynamic theming for **React Native** projects. This library allows developers to manage multiple themes effortlessly.

![logo](https://media.licdn.com/dms/image/v2/D4D12AQHUtXuvPnlFOg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1732436365222?e=1738195200&v=beta&t=f3dk2S6jz-eEv0OJRgLprE99tONmJT-yevOR5DSOFbs)

---

## Features

- **Dynamic theming**: Easily switch between themes like light and dark mode.
- **TypeScript support**: Fully typed for a better development experience.
- **Customizable**: Extendable theme structure to meet your project's needs.

---

## Installation

Install the library via npm or yarn:

```bash
npm install dynamic-theme-context @react-native-async-storage/async-storage
# or
yarn add dynamic-theme-context @react-native-async-storage/async-storage
```

---

## Requirements

| Dependency       | Minimum Version |
| ---------------- | --------------- |
| **React**        | 16.3.1          |
| **React Native** | 0.64.0          |

---

## Usage Example

### Add Your Theme

You can pass your theme data like this:

```tsx
import React from "react";
import { ThemeProvider, ThemeColorsType } from "dynamic-theme-context";

const lightTheme: ThemeColorsType = {
  general: {
    primary: "#3498db", // Blue
    secondary: "#2ecc71", // Green
    background: "#ffffff", // White
    text: "#2c3e50", // Dark Gray
    border: "#bdc3c7", // Light Gray
    shadow: "rgba(0, 0, 0, 0.1)",
  },
  status: {
    success: "#27ae60", // Green
    error: "#e74c3c", // Red
    warning: "#f1c40f", // Yellow
    info: "#8e44ad", // Purple
  },
  components: {
    button: {
      default: "#2980b9", // Darker blue
      hover: "#1abc9c", // Turquoise
      disabled: "#95a5a6", // Gray
    },
    input: {
      background: "#ecf0f1", // Light gray
      text: "#2c3e50", // Dark gray
      border: "#bdc3c7", // Light gray
      focus: "#3498db", // Blue
    },
    card: {
      background: "#ffffff", // White
      shadow: "rgba(0, 0, 0, 0.1)",
      border: "#bdc3c7", // Light gray
    },
  },
};

const darkTheme: ThemeColorsType = {
  general: {
    primary: "#9b59b6", // Purple
    secondary: "#e67e22", // Orange
    background: "#34495e", // Dark blue-gray
    text: "#ecf0f1", // Light gray
    border: "#7f8c8d", // Gray
    shadow: "rgba(0, 0, 0, 0.5)",
  },
  status: {
    success: "#2ecc71", // Green
    error: "#e74c3c", // Red
    warning: "#f39c12", // Yellow
    info: "#3498db", // Blue
  },
  components: {
    button: {
      default: "#8e44ad", // Purple
      hover: "#9b59b6", // Lighter purple
      disabled: "#95a5a6", // Gray
    },
    input: {
      background: "#2c3e50", // Dark gray
      text: "#ecf0f1", // Light gray
      border: "#7f8c8d", // Gray
      focus: "#9b59b6", // Purple
    },
    card: {
      background: "#2c3e50", // Dark gray
      shadow: "rgba(0, 0, 0, 0.5)",
      border: "#7f8c8d", // Gray
    },
  },
};

export const themes = [
  { name: "light", themes: lightTheme },
  { name: "dark", themes: darkTheme },
];

function App(): React.JSX.Element {
  return (
    <ThemeProvider
      themes={themes}
      defaultTheme="light" // it's optional
    >
      <Home />
    </ThemeProvider>
  );
}

export default App;
```

### Extend Theme Colors

If you want to add new colors to current colors;

- create Global.d.ts file and move to src/types location
- open your tsconfig.json file and add these lines

```code
   {
    "compilerOptions": {
      ...
      "typeRoots": ["./node_modules/@types", "./src/types"]
    },
    "include": ["src/**/*"]
   }
```

- and add these lines to Global.d.ts file

```tsx
import "dynamic-theme-context";

declare module "dynamic-theme-context" {
  interface ThemeColorsType {
    primarytText?: string; // new color
  }
}
```

### Get Theme Data From useTheme hook

Here’s a basic example of how to use `dynamic-theme-context` in a React Native project:

```tsx
import { ThemeProvider, useTheme } from "dynamic-theme-context";

const App = () => {
  const { theme, activeTheme, toggleTheme, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.general.background }}>
      <Text style={{ color: theme.general.text }}>
        Current Theme: {activeTheme}
      </Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
};
```

### Get Theme Data from StyleSheet

You can access theme data from StyleSheet:

```tsx
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { getStyles, useTheme, ThemeColorsType } from "dynamic-theme-context";

const App: React.FC = () => {
  const { activeTheme, toggleTheme } = useTheme();
  const styles = getStyles(createStyles); // it's only rerender when theme changed

  return (
    <View style={styles.container}>
      <Text>Current Theme: {activeTheme}</Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
};

const createStyles = (
  theme: ThemeColorsType, // get access theme
  activeTheme: string, // get access active theme
  isDark: boolean // get access isDark or not info
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.general.background,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default App;
```

### With HOC

If you want, you can access styles with HOC:

```tsx
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  useTheme,
  withStyles,
  ThemeColorsType,
  WithDynamicStylesProps,
} from "dynamic-theme-context";

const App: React.FC<
  WithDynamicStylesProps<ReturnType<typeof createStyles>>
> = ({ styles }) => {
  const { activeTheme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text>Current Theme: {activeTheme}</Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
};

const createStyles = (
  theme: ThemeColorsType,
  activeTheme: string,
  isDark: boolean
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.general.background,
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default withStyles(App, createStyles);
```

---

## License

Dynamic Theme Context is licensed under the MIT License.
