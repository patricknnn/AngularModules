import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimation } from './animations/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent {
  title = 'AngularModules';

  getAnimationData(outlet: RouterOutlet): any {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
