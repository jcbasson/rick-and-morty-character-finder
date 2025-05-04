import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      background: "#010000";
      brand: {
        500: string; // Rick's portal green
      };
      rickBlue: {
        500: "#24b2cc"; // Rick's hair color
      };
      mortyYellow: {
        500: string;
      };
      portalGreen: {
        500: string;
        600: string;
      };
      space: {
        500: string;
        600: string;
        700: string;
        800: string;
      };
    };
  }
}
