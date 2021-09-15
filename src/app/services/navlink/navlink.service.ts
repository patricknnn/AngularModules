import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Navlink } from 'src/app/modules/core/models/navlink';

@Injectable({
  providedIn: 'root'
})
export class NavlinkService {

  constructor() { }

  /**
   * Returns form controls
   * @returns Observable stream of form controls
   */
  getNavlinks(): Observable<Navlink[]> {
    const navlinks: Navlink[] = [
      new Navlink("Home", "edit", "/home"),
      new Navlink("Dynamic forms", "edit", "/forms"),
      new Navlink("Dynamic tables", "edit", "/tables"),
    ];
    return of(navlinks);
  }
}
