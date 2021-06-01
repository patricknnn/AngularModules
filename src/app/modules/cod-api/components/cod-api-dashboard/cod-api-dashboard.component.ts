import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { CodApiGame, CodApiGameType, CodApiPlatform, CodApiPlayer, CodApiService } from '../../services/cod-api/cod-api.service';

@Component({
  selector: 'app-cod-api-dashboard',
  templateUrl: './cod-api-dashboard.component.html',
  styleUrls: ['./cod-api-dashboard.component.scss'],
  providers: [CodApiService]
})
export class CodApiDashboardComponent implements OnInit {
  // ka4scod@gmail.com KAASCOD#8395529 Kakbaard1
  username = new FormControl('ka4scod@gmail.com', [Validators.required]);
  password = new FormControl('Kakbaard1', [Validators.required]);
  content?: any;
  appearance: MatFormFieldAppearance = "standard";
  color: string = "accent";
  platform: CodApiPlatform = "battle";
  platforms?: CodApiPlatform[];
  game: CodApiGame = 'mw';
  games?: CodApiGame[];
  gameType: CodApiGameType = 'mp';
  gameTypes?: CodApiGameType[];
  player: CodApiPlayer = { username: "BENNIEMAN#21282", platform: "battle" };
  players: CodApiPlayer[] = [{ username: "BENNIEMAN#21282", platform: "battle" }];

  constructor(private api: CodApiService) { }

  ngOnInit(): void {
    this.platforms = this.api.getPlatforms();
    this.games = this.api.getGames();
    this.gameTypes = this.api.getGameTypes();
  }

  isLoggedIn(): boolean {
    return this.api.isLoggedIn;
  }

  login(): void {
    this.api.login(this.username.value, this.password.value);
  }

  getData(): void {
    //this.api.getLeaderboard(this.game, this.player.platform, 1).then(result => this.content = JSON.stringify(result));
    //this.api.getProfile(this.game, this.gameType, this.player).then(result => this.content = JSON.stringify(result));
    this.api.getMatches(this.game, this.gameType, this.player, true).then(result => this.content = JSON.stringify(result));
  }

}
