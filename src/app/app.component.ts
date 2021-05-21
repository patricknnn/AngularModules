import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { routeAnimation } from './animations/route-animations';
import { Navlink } from './modules/core/models/navlink';
import { SidenavService } from './modules/core/services/sidenav/sidenav.service';
import { NavlinkService } from './services/navlink/navlink.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimation]
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * Page title
   */
  title = 'AngularModules';
  /**
   * Media query list
   */
  mobileQuery: MediaQueryList;
  /**
   * Mobile query listener
   */
  private _mobileQueryListener: () => void;
  /**
   * Sidenav viewchild
   */
  @ViewChild('sidenav')
  public sidenav!: MatSidenav;

  navLinks$: Observable<Navlink[]>;

  /**
   * Constructor
   * @param changeDetectorRef Change detector
   * @param media Media
   * @param sidenavService Sidenav service 
   */
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private sidenavService: SidenavService,
    navlinkService: NavlinkService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener<"change">("change", this._mobileQueryListener);
    this.navLinks$ = navlinkService.getNavlinks();
  }

  /**
   * Called aafter
   */
  ngOnInit(): void {
    console.log();
  }

  /**
   * Called after view initialized
   */
  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  /**
   * Called on component destroy
   */
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener<"change">("change", this._mobileQueryListener);
  }

  /**
   * Returns activated route
   * @param outlet Router outlet
   * @returns Activated route if activated, "" otherwise
   */
  public getActivatedRoute(outlet: RouterOutlet): ActivatedRoute | undefined {
    return outlet.isActivated ? outlet.activatedRoute : undefined;
  }
}
