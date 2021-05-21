import { Injectable } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  /**
   * MatSidenav instance
   */
  private sidenav: MatSidenav | undefined;

  /**
   * Initialize sidenav service
   */
  constructor() { }

  /**
   * Sets MatSidenav instance
   * @param sidenav MatSidenav instance
   */
  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  /**
   * Opens MatSidenav instance
   * @returns Promise<MatDrawerToggleResult>
   */
  public open(): Promise<MatDrawerToggleResult> | undefined {
    return this.sidenav?.open();
  }

  /**
   * Closes MatSidenav instance
   * @returns Promise<MatDrawerToggleResult>
   */
  public close(): Promise<MatDrawerToggleResult> | undefined {
    return this.sidenav?.close();
  }

  /**
   * Toggles MatSidenav instance
   * @returns Promise<MatDrawerToggleResult>
   */
  public toggle(): Promise<MatDrawerToggleResult> | undefined {
    return this.sidenav?.toggle();
  }
}
