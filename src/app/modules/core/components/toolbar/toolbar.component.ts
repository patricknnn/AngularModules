import { Component } from '@angular/core';
import { SidenavService } from '../../services/sidenav/sidenav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private sidenav: SidenavService) { }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
