import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface HttpOptions {
  headers?: HttpHeaders;
  context?: HttpContext;
  params?: HttpParams;
  reportProgress?: boolean;
  withCredentials?: boolean;
  observe: 'body';
  responseType: 'json';
}
export declare type CodApiPlayer = { username: string, platform: string };
export declare type CodApiPlatform = "battle" | "steam" | "psn" | "xbl" | "acti" | "uno" | "all";
export declare type CodApiGame = 'mw' | 'cw' | 'wwii' | 'bo4';
export declare type CodApiGameType = 'mp' | 'wz' | 'zm';

@Injectable()
export class CodApiService {
  apiURL: string = "https://my.callofduty.com/api/papi-client/";
  profileURL: string = "https://profile.callofduty.com/";
  isLoggedIn: boolean = false;
  authHeader: string = "";
  rtknToken: string = "";
  atknToken: string = "";
  ssoCookie: string = "";
  baseCookie: string = "new_SiteId=cod; ACT_SSO_LOCALE=nl_NL;country=NL;XSRF-TOKEN=68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041;API_CSRF_TOKEN=68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041;";
  userAgent: string = "a4b471be-4ad2-47e2-ba0e-e1f2aa04bff9";
  deviceId: string = "ka4scodapi";
  requestRetries: number = 3;
  requestHeaders: HttpHeaders;
  players: CodApiPlayer[] = [
    { username: "KAASCOD#8395529", platform: "uno" },
  ];

  /**
   * Initialize CodApiService
   * @param http HttpClient module
   */
  constructor(private http: HttpClient) {
    this.requestHeaders = new HttpHeaders();
    this.requestHeaders = this.requestHeaders.append("Accept", "application/json, text/javascript, */*; q=0.01");
    this.requestHeaders = this.requestHeaders.append('Content-Type', 'application/json');
    this.requestHeaders = this.requestHeaders.append('Connection', 'keepalive');
    this.requestHeaders = this.requestHeaders.append('Cookie', this.baseCookie);
    this.requestHeaders = this.requestHeaders.append('userAgent', this.userAgent);
    this.requestHeaders = this.requestHeaders.append('x_requested_with', this.userAgent);
    this.requestHeaders = this.requestHeaders.append("x_cod_device_id", this.deviceId);
  }

  /**
   * Log in
   * @param username Username
   * @param password Password
   * @returns Promise<string>
   */
  login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const options: HttpOptions = { headers: this.requestHeaders, observe: 'body', responseType: 'json' };
      const body = { "deviceId": this.deviceId };
      // Fetch authHeader for login
      this.postRequest<any>(`${this.profileURL}cod/mapp/registerDevice`, body, options)
        .toPromise()
        .then((result) => {
          this.requestHeaders = this.requestHeaders.append("Authorization", `bearer ${result.data.authHeader}`);
          const options: HttpOptions = { headers: this.requestHeaders, observe: 'body', responseType: 'json' };
          const body = { "email": username, "password": password };
          // Login and fetch tokens
          this.postRequest<any>(`${this.profileURL}cod/mapp/login`, body, options)
            .toPromise()
            .then((result) => {
              // process login result
              if (!result.success) throw Error(`${result.status} - ${result.message}`);
              this.rtknToken = result.rtkn;
              this.atknToken = result.atkn;
              this.ssoCookie = result.s_ACT_SSO_COOKIE;
              this.isLoggedIn = true;
              this.requestHeaders = this.requestHeaders.set("Cookie", `${this.baseCookie}rtkn=${this.rtknToken};ACT_SSO_COOKIE=${this.ssoCookie};atkn=${this.atknToken};`);
              resolve("Succesfully logged in");
            })
            .catch((error) => {
              reject(typeof error === "string" ? error : error.message);
            })
        }).catch((error) => {
          reject(typeof error === "string" ? error : error.message);
        });
    })
  }

  getProfile(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer, periods?: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = "gamer";
      let apiVersion = (game == "mw" || game == "cw") ? "v1" : "v2";
      let periodQuery = periods ? "?periods=" : "";
      periods?.forEach(period => periodQuery.concat(period.toString()));
      let requestUrl = this.buildUrl(`stats/cod/${apiVersion}/title/${game}/platform/${platform}/${lookupType}/${username}/profile/type/${type}${periodQuery}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMatches(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer, full: boolean = false, start: number = 0, end: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = "gamer";
      let apiVersion = "v2";
      let detailsQuery = full ? "" : "details"
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/title/${game}/platform/${platform}/${lookupType}/${username}/matches/${type}/start/${start}/end/${end}/${detailsQuery}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMatchInfo(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer, matchId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let platform = player.platform;
      let apiVersion = "v2";
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/title/${game}/platform/${platform}/fullMatch/${type}/${matchId}/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMatchAnalysis(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = "v2";
      let requestUrl = this.buildUrl(`ce/${apiVersion}/title/${game}/platform/${platform}/gametype/all/gamer/${username}/summary/match_analysis/contentType/full/end/0/matchAnalysis/mobile/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getFriends(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = "gamer";
      let apiVersion = "v1";
      let requestUrl = this.buildUrl(`stats/cod/${apiVersion}/title/${game}/platform/${platform}/${lookupType}/${username}/profile/friends/type/${type}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getFriendFeed(player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = "gamer";
      let apiVersion = "v1";
      let requestUrl = this.buildUrl(`userfeed/${apiVersion}/friendFeed/platform/${platform}/${lookupType}/${username}/friendFeedEvents/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getEventFeed(): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiVersion = "v1";
      let requestUrl = this.buildUrl(`userfeed/${apiVersion}/friendFeed//rendered/en/${this.ssoCookie}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMaps(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let platform = player.platform;
      let apiVersion = "v1";
      let requestUrl = this.buildUrl(`ce/${apiVersion}/title/${game}/platform/${platform}/gameType/${type}/communityMapData/availability`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getLoot(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = "gamer";
      let requestUrl = this.buildUrl(`loot/title/${game}/platform/${platform}/${lookupType}/${username}/status/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getLeaderboard(game: CodApiGame, player: CodApiPlayer, page: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let platform = player.platform;
      let apiVersion = "v2";
      let requestUrl = this.buildUrl(`leaderboards/${apiVersion}/title/${game}/platform/${platform}/time/alltime/type/core/mode/career/page/${page}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  }

  getUserIdentities(): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiVersion = "v2";
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/identities/${this.ssoCookie}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getUserInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      let requestUrl = this.buildProfileUrl(`cod/userInfo/${this.ssoCookie}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getUserAccounts(player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = "gamer";
      let apiVersion = "v2";
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/accounts/platform/${platform}/${lookupType}/${username}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getBattlePassInfo(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = "gamer";
      let requestUrl = this.buildUrl(`loot/title/${game}/platform/${platform}/${lookupType}/${username}/status/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getBattlePassLoot(game: CodApiGame, player: CodApiPlayer, season: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let platform = player.platform;
      let requestUrl = this.buildUrl(`loot/title/${game}/platform/${platform}/list/loot_season_${season}/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getCodPoints(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = "v1";
      let requestUrl = this.buildUrl(`inventory/${apiVersion}/title/${game}/platform/${platform}/gamer/${username}/currency`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getPresence(player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = "v2";
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/friends/platform/${platform}/gamer/${username}/presence/1/${this.ssoCookie}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getSettings(player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = "v1";
      let requestUrl = this.buildUrl(`preferences/${apiVersion}/platform/${platform}/gamer/${username}/list`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  searchQuery(query: string, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      query = encodeURIComponent(query);
      let platform = player.platform;
      let apiVersion = "v2";
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/platform/${platform}/username/${query}/search`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  /**
   * Perform a (typed) get request
   * @param url Request url
   * @returns Observable<T>
   */
  private getRequest<T>(
    url: string,
    options: HttpOptions = {
      headers: this.requestHeaders,
      observe: 'body',
      responseType: 'json',
    }
  ): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      retry(this.requestRetries),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a (typed) post request
   * @param url Request url
   * @param data Data to post
   * @param options Post options
   * @returns 
   */
  private postRequest<T>(
    url: string,
    body: T,
    options: HttpOptions = {
      headers: this.requestHeaders,
      observe: 'body',
      responseType: 'json',
    }
  ): Observable<T> {
    return this.http.post<T>(url, body, options)
      .pipe(
        retry(this.requestRetries),
        catchError(this.handleError)
      );
  }

  /**
   * Handle http error response
   * @param error HttpErrorResponse
   * @returns Observable<never>
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      // Client-side or network error
      console.error('An error occurred:', error.error);
    } else {
      // Backend error code
      console.error(
        `Backend returned code ${error.status}, ` +
        `url was ${error.url}, ` +
        `type was ${error.type}, ` +
        `body was: ${JSON.stringify(error.error.text)}`);
    }
    // Return error message
    return throwError('Request resulted in an error.');
  }

  /**
   * Adds string to url
   * @param str string to add
   * @returns url
   */
  private buildUrl(str: string) {
    return `${this.apiURL}${str}`;
  }

  /**
   * Adds string to url
   * @param str string to add
   * @returns url
   */
  private buildProfileUrl(str: string) {
    return `${this.profileURL}${str}`;
  }
}
