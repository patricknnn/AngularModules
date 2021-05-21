import { Component, Input } from '@angular/core';
import { Navlink } from '../../models/navlink';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  /**
   * The navlinks to display
   */
  @Input() navLinks!: Navlink[];

  constructor() { }

}
