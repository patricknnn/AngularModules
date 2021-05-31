import { Component, OnInit } from '@angular/core';
import { CodApiService } from '../../services/cod-api/cod-api.service';

@Component({
  selector: 'app-cod-api-content',
  templateUrl: './cod-api-content.component.html',
  styleUrls: ['./cod-api-content.component.scss'],
  providers: [CodApiService]
})
export class CodApiContentComponent implements OnInit {
  content?: any;

  constructor(private api: CodApiService) { }

  ngOnInit(): void {
    //this.api.mwLeaderboard("1", "battle").then(result => this.content = result);
    //this.api.getProfile("mw", "BENNIEMAN", "battle").then(result => this.content = JSON.stringify(result));
    this.api.getMatches("mw", "mp", {username: "BENNIEMAN#21282", platform: "battle"}).then(result => this.content = JSON.stringify(result));
  }
}
