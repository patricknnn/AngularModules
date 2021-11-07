export interface SnackbarData {
  text: string;
  type: 'succes' | 'info' | 'warn';
  dismissable: boolean;
  preClose: any;
}
