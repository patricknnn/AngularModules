export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
  bool: boolean;
  nested?: {
    element: string;
    deep?: {
      element: string;
    }
  };
}
