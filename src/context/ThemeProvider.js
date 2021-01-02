import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export const ThemeContext = React.createContext("dark");
export const MyThemeProvider = ({ children }) => {
  const [themeType, setThemeType] = useState("dark");
  return (
    <ThemeContext.Provider
      value={{
        theme: themeType,
        toggle: () => setThemeType(themeType === "dark" ? "light" : "dark"),
        setTheme: (th) => setThemeType(th),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
