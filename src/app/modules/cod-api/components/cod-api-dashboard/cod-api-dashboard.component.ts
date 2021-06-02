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
  resultTitle?: string;

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

  getProfile(): void {
    this.api.getProfile(this.game, this.gameType, this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Profile';
  }

  getMatches(): void {
    this.api.getMatches(this.game, this.gameType, this.player, true).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Matches';
  }

  getLeaderBoard(): void {
    this.api.getLeaderboard(this.game, this.player.platform, 1).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Leaderboard';
  }

  getSettings(): void {
    this.api.getSettings(this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Settings';
  }

  getMatchAnalysis(): void {
    this.api.getMatchAnalysis(this.game, this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Match Analysis';
  }

  getFriends(): void {
    this.api.getFriends(this.game, this.gameType, this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Friends';
  }

  getFriendFeed(): void {
    this.api.getFriendFeed(this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Friend Feed';
  }

  getEventFeed(): void {
    this.api.getEventFeed().then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Event feed';
  }

  getMaps(): void {
    this.api.getMaps(this.game, this.gameType, this.player.platform).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Maps';
  }

  getLoot(): void {
    this.api.getLoot(this.game, this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Loot';
  }

  getIdentity(): void {
    this.api.getUserIdentities().then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'User Identities';
  }

  getAccounts(): void {
    this.api.getUserAccounts(this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'User Accounts';
  }

  getInfo(): void {
    this.api.getUserInfo().then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'User Info';
  }

  getBattlepassInfo(): void {
    this.api.getBattlePassInfo(this.game, this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Battlepass Info';
  }

  getBattlepassLoot(): void {
    this.api.getBattlePassLoot(this.game, this.player.platform, 4).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Battlepass Loot';
  }

  getCodPoints(): void {
    this.api.getCodPoints(this.game, this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'COD Points';
  }

  getPresence(): void {
    this.api.getPresence(this.player).then(result => this.content = JSON.stringify(result));
    this.resultTitle = 'Presence';
  }
}
