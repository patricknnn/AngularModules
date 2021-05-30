import { Component, OnInit } from '@angular/core';
import { CodApiService } from '../../services/cod-api/cod-api.service';

@Component({
  selector: 'app-cod-api-dashboard',
  templateUrl: './cod-api-dashboard.component.html',
  styleUrls: ['./cod-api-dashboard.component.scss'],
  providers: [CodApiService]
})
export class CodApiDashboardComponent implements OnInit {

  constructor(private api: CodApiService) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.api.isLoggedIn;
  }

  csrfToken(): string {
    return this.api.csrfToken ? this.api.csrfToken : '';
  }

  ssoToken(): string {
    return this.api.ssoToken ? this.api.ssoToken : '';
  }

  atknToken(): string {
    return this.api.atknToken ? this.api.atknToken : '';
  }

}
