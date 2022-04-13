export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  bool: boolean;
  dateRange: {
    start: string,
    end: string,
  }
  nested?: {
    element: string;
    deep?: {
      element: string;
    }
  };
}
