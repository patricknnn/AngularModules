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
export declare type CodApiPlayer = { username: string, platform: CodApiPlatform };
export declare type CodApiPlatform = 'battle' | 'steam' | 'psn' | 'xbl' | 'acti' | 'uno' | 'all';
export declare type CodApiGame = 'mw' | 'cw' | 'wwii' | 'bo4';
export declare type CodApiGameType = 'mp' | 'wz' | 'zm';

@Injectable()
export class CodApiService {
  isLoggedIn: boolean = true;
  apiURL: string = 'https://my.callofduty.com/api/papi-client/';
  profileURL: string = 'https://profile.callofduty.com/';
  deviceId: string = 'ka4scodapi';
  csrfToken: string = 'e08e64e8-9f11-4fe4-b898-2a76c001904f';
  xsrfToken: string = '4bXkGzPzT0al65vAy8ORbmXj7dZMYiDR0xY52-nZ71ER_-nlyg5NI1xYc06E2uyK';
  atknToken: string = `eyJhbGciOiAiQTEyOEtXIiwgImVuYyI6ICJBMTI4R0NNIiwgImtpZCI6ICJ1bm9fcHJvZF9sYXNfMSJ9.
  RGTIx4OAeWLaUhB15VQEzQ_Jg8xnH9r_xsnqkwzLgkBzoprvbQ4Jmg.3x3ZgJ9foujvPPOG.47kFYU670q4s1uVqM9LIfPafDPAK7U
  ijWm2ej9wxOEUYzs6LtRNcMKiLOJ2ZnjbILbxvVo9A8KLXR9JCoIX0xlX79l9rb64QPzYUl5FsMayOISeRoN6EKmQsNwd3HxD02zAy
  cCvJ8VRZALwUAGUqMDU8Y515CqcREwkD4SRdpNmvImKmV5PHb-S6ltgt1HtID55-aVeo7pm3cSNkz0a9fiOHz43OEPlxkl0Yr3PVg2
  gfPWtzx1oipEwoqYAk7d7PPo_RhlZcHircPjNY78-wc_vhiWmstNTQLlo7kNaBu4sXalKGEb0aG98rRZ9U2n6DPPGM-qqdETAWFdRG
  01CT39QbwN2Jx4hXTqZ-hdL4_kuVDg-DGsNoKTZMuBfDSfVK9sUyTjFkpoF1Qqdbx3hvLRSpOy4ISuD3ETuSjnRRziSfiN_nhSA6Gy
  vwkz-JbJZy6HD6XlXJc2dkkqeZJi-k7sVi51w.oesAs2OLB1vqXk7f5bKgbQ`;
  rtknToken: string = ``;
  ssoCookie: string = `NjM5NzM2NzM2MzEwNzIyNDgzNDoxNjIzNzU2MzM5MDg2OjU5NTQ5Nzc3MTYxN2NkMjMzZTczMzQ2NTYzYTNkYWUx`;
  ssoExpiry: string = `1623755351557`;
  baseCookie: string;
  requestRetries: number = 3;
  requestHeaders: HttpHeaders;

  /**
   * Initialize CodApiService
   * @param http HttpClient module
   */
  constructor(private http: HttpClient) {
    this.baseCookie = `new_SiteId=cod; country=NL; ACT_SSO_LOCALE=en_US;`;
    this.baseCookie = `${this.baseCookie}ACT_SSO_COOKIE=${this.ssoCookie};ACT_SSO_COOKIE_EXPIRY=${this.ssoExpiry};`;
    this.baseCookie = `${this.baseCookie}XSRF-TOKEN=${this.xsrfToken}; API_CSRF_TOKEN=${this.xsrfToken};`;
    this.baseCookie = `${this.baseCookie}atkn=${this.atknToken};`;
    this.requestHeaders = new HttpHeaders();
    this.requestHeaders = this.requestHeaders.append('Accept', 'application/json, text/javascript, */*; q=0.01');
    this.requestHeaders = this.requestHeaders.append('Content-Type', 'application/json');
    this.requestHeaders = this.requestHeaders.append('Authorization', ``);
    this.requestHeaders = this.requestHeaders.append('Cookie', this.baseCookie);
    this.requestHeaders = this.requestHeaders.append('x_cod_device_id', this.deviceId);
  }

  /**
   * Log in
   * @param username Username
   * @param password Password
   * @returns Promise<string>
   */
  login(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const body = {
        'deviceId': this.deviceId
      };
      // Fetch authHeader for login
      this.postRequest<any>(`${this.profileURL}cod/mapp/registerDevice`, body).toPromise()
        .then((result) => {
          this.requestHeaders = this.requestHeaders.set('Authorization', `bearer ${result.data.authHeader}`);
          const body = {
            'username': username,
            'password': password
          };
          // Login and fetch tokens
          this.postRequest<any>(`${this.profileURL}cod/mapp/login`, body)
            .toPromise()
            .then((result) => {
              // process login result
              if (!result.success) throw Error(`${result.status} - ${result.message}`);
              this.rtknToken = result.rtkn;
              this.atknToken = result.atkn;
              this.ssoCookie = result.s_ACT_SSO_COOKIE;
              this.isLoggedIn = true;
              this.requestHeaders = this.requestHeaders.set('Cookie', `${this.baseCookie}ACT_SSO_COOKIE=${this.ssoCookie};atkn=${this.atknToken};`);
              resolve('Succesfully logged in');
            })
            .catch((error) => {
              reject(typeof error === 'string' ? error : error.message);
            })
        }).catch((error) => {
          reject(typeof error === 'string' ? error : error.message);
        });
    })
  }

  getProfile(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer, periods?: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = 'gamer';
      let apiVersion = (game == 'mw' || game == 'cw') ? 'v1' : 'v2';
      let periodQuery = periods ? '?periods=' : '';
      periods?.forEach(period => periodQuery.concat(period.toString()));
      let requestUrl = this.buildUrl(`stats/cod/${apiVersion}/title/${game}/platform/${platform}/${lookupType}/${username}/profile/type/${type}${periodQuery}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMatches(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer, full: boolean = false, start: number = 0, end: number = 0): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = 'gamer';
      let apiVersion = 'v2';
      let detailsQuery = full ? '' : 'details'
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/title/${game}/platform/${platform}/${lookupType}/${username}/matches/${type}/start/${start}/end/${end}/${detailsQuery}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMatchInfo(game: CodApiGame, type: CodApiGameType, platform: CodApiPlatform, matchId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiVersion = 'v2';
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/title/${game}/platform/${platform}/fullMatch/${type}/${matchId}/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMatchAnalysis(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = 'v2';
      let requestUrl = this.buildUrl(`ce/${apiVersion}/title/${game}/platform/${platform}/gametype/all/gamer/${username}/summary/match_analysis/contentType/full/end/0/matchAnalysis/mobile/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getFriends(game: CodApiGame, type: CodApiGameType, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = 'gamer';
      let apiVersion = 'v1';
      let requestUrl = this.buildUrl(`stats/cod/${apiVersion}/title/${game}/platform/${platform}/${lookupType}/${username}/profile/friends/type/${type}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getFriendFeed(player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = 'gamer';
      let apiVersion = 'v1';
      let requestUrl = this.buildUrl(`userfeed/${apiVersion}/friendFeed/platform/${platform}/${lookupType}/${username}/friendFeedEvents/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getEventFeed(): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiVersion = 'v1';
      let requestUrl = this.buildUrl(`userfeed/${apiVersion}/friendFeed//rendered/en/${this.ssoCookie}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getMaps(game: CodApiGame, type: CodApiGameType, platform: CodApiPlatform): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiVersion = 'v1';
      let requestUrl = this.buildUrl(`ce/${apiVersion}/title/${game}/platform/${platform}/gameType/${type}/communityMapData/availability`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getLoot(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = 'gamer';
      let requestUrl = this.buildUrl(`loot/title/${game}/platform/${platform}/${lookupType}/${username}/status/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getLeaderboard(game: CodApiGame, platform: CodApiPlatform, page: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiVersion = 'v2';
      let requestUrl = this.buildUrl(`leaderboards/${apiVersion}/title/${game}/platform/${platform}/time/alltime/type/core/mode/career/page/${page}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  }

  getUserIdentities(): Promise<any> {
    return new Promise((resolve, reject) => {
      let apiVersion = 'v2';
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
      let lookupType = 'gamer';
      let apiVersion = 'v2';
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/accounts/platform/${platform}/${lookupType}/${username}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getBattlePassInfo(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let lookupType = 'gamer';
      let requestUrl = this.buildUrl(`loot/title/${game}/platform/${platform}/${lookupType}/${username}/status/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getBattlePassLoot(game: CodApiGame, platform: CodApiPlatform, season: number): Promise<any> {
    return new Promise((resolve, reject) => {
      let requestUrl = this.buildUrl(`loot/title/${game}/platform/${platform}/list/loot_season_${season}/en`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getCodPoints(game: CodApiGame, player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = 'v1';
      let requestUrl = this.buildUrl(`inventory/${apiVersion}/title/${game}/platform/${platform}/gamer/${username}/currency`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getPresence(player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = 'v2';
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/friends/platform/${platform}/gamer/${username}/presence/1/${this.ssoCookie}`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  getSettings(player: CodApiPlayer): Promise<any> {
    return new Promise((resolve, reject) => {
      let username = encodeURIComponent(player.username);
      let platform = player.platform;
      let apiVersion = 'v1';
      let requestUrl = this.buildUrl(`preferences/${apiVersion}/platform/${platform}/gamer/${username}/list`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  searchQuery(query: string, platform: CodApiPlatform): Promise<any> {
    return new Promise((resolve, reject) => {
      query = encodeURIComponent(query);
      let apiVersion = 'v2';
      let requestUrl = this.buildUrl(`crm/cod/${apiVersion}/platform/${platform}/username/${query}/search`);
      this.getRequest(requestUrl).toPromise().then(data => resolve(data)).catch(e => reject(e));
    });
  };

  /**
   * Returnes platforms
   * @returns CodApiPlatform[]
   */
  getPlatforms(): CodApiPlatform[] {
    return ['battle', 'steam', 'psn', 'xbl', 'acti', 'uno', 'all'];
  }

  /**
   * Returnes games
   * @returns CodApiGame[]
   */
  getGames(): CodApiGame[] {
    return ['mw', 'cw', 'wwii', 'bo4']
  }

  /**
   * Returnes game types
   * @returns CodApiGameType[]
   */
  getGameTypes(): CodApiGameType[] {
    return ['mp', 'wz', 'zm']
  }

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
      withCredentials: true
    }
  ): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      retry(this.requestRetries),
      catchError(this.handleError)
    );
  }

  /**
   * Perform a full get request
   * @param url Request url
   * @returns Observable<any>
   */
  private getRequestFull(
    url: string,
    options: any = {
      headers: this.requestHeaders,
      observe: 'response',
      responseType: 'text',
      withCredentials: true
    }
  ): Observable<any> {
    return this.http.get(url, options);
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
    body: any,
    options: HttpOptions = {
      headers: this.requestHeaders,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
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
