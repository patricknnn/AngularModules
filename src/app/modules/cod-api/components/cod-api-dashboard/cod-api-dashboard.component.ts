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

}
