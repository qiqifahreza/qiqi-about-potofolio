/* oxlint-disable react/only-export-components */
export { 
  PortfolioProvider as ThemeProvider, 
  usePortfolio as useTheme 
} from './PortfolioContext';

export type { 
  PortfolioContextType as ThemeContextType 
} from './PortfolioContext';

export interface Preset {
  name: string;
  primary: string;
  secondary: string;
}