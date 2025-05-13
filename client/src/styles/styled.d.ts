import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      area: string;
      background: string;
      deco1: string;
      deco2: string;
      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;
      black: string;
      white: string;
    };
    fontSize: {
      xs: string;
      s: string;
      m: string;
      ml: string;
      lg: string;
      xl: string;
    };
    fontWeight: {
      light: number;
      medium: number;
      bold: number;
    };
    fontFamily: string;
  }
}
