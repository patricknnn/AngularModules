import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface HttpOptions {
  headers?: any;
  observe?: any;
  params?: any;
  reportProgress?: any;
  responseType?: any;
  withCredentials?: boolean;
}

@Injectable()
export class CodApiService {
  apiURL: string = "https://my.callofduty.com/api/papi-client/";
  loginURL: string = "https://profile.callofduty.com/cod/mapp/";
  profileURL: string = "https://profile.callofduty.com/";

  isLoggedIn: boolean = false;
  rtknToken: string = "";
  atknToken: string = "";
  baseCookie: string = "new_SiteId=cod; ACT_SSO_LOCALE=nl_NL;country=NL;XSRF-TOKEN=68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041;API_CSRF_TOKEN=68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041;";
  ssoCookie: string = "";
  deviceId: string = "ka4scodapi";
  userAgent: string = "a4b471be-4ad2-47e2-ba0e-e1f2aa04bff9";

  requestRetries: number = 3;
  requestHeaders: any = {
    "Authorization": "" as const,
    "Accept": "" as const,
    "Connection": "" as const,
    "Cookie": "" as const,
    "content-type": "" as const,
    "userAgent": "" as const,
    "x-cod-device-id": "" as const,
    "x-requested-with": "" as const,
  };

  requestBody: any = {
    "deviceId": "" as const,
    "email": "" as const,
    "password": "" as const,
  };

  platforms: Object = {
    battle: "battle",
    steam: "steam",
    psn: "psn",
    xbl: "xbl",
    acti: "acti",
    uno: "uno",
    all: "all"
  };

  /**
   * Initialize CodApiService
   * @param http HttpClient module
   */
  constructor(private http: HttpClient) {
    this.requestHeaders["content-type"] = "application/json";
    this.requestHeaders["Cookie"] = this.baseCookie;
    this.requestHeaders["userAgent"] = this.userAgent;
    this.requestHeaders["x-requested-with"] = this.userAgent;
    this.requestHeaders["Accept"] = "application/json";
    this.requestHeaders["Connection"] = "keep-alive";
  }

  /**
   * Log in
   * @param username Username
   * @param password Password
   * @returns Promise<string>
   */
  login(username: string, password: string): Promise<string> {
    // Fetch token
    return new Promise((resolve, reject) => {
      // Register device (working)
      this.requestBody["deviceId"] = this.deviceId;
      this.postRequest<any>(`${this.loginURL}registerDevice`, this.requestBody, this.requestHeaders)
        .toPromise()
        .then((result) => {
          // login
          this.requestHeaders["Authorization"] = `bearer ${result.data.authHeader}`;
          this.requestHeaders["x-cod-device-id"] = `${this.deviceId}`;
          this.requestBody["email"] = username;
          this.requestBody["password"] = password;
          this.postRequest<any>(`${this.loginURL}login`, this.requestBody, this.requestHeaders)
            .toPromise()
            .then((result) => {
              // process login result
              if (!result.success) throw Error(`${result.status} - ${result.message}`);
              this.rtknToken = result.rtkn;
              this.atknToken = result.atkn;
              this.ssoCookie = result.s_ACT_SSO_COOKIE;
              this.requestHeaders["Cookie"] = `${this.baseCookie}rtkn=${this.rtknToken};ACT_SSO_COOKIE=${this.ssoCookie};atkn=${this.atknToken};`;
              this.isLoggedIn = true;
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

  /**
   * Perform a (typed) get request
   * @param url Request url
   * @returns Observable<T>
   */
  getRequest<T>(url: string, options?: HttpOptions): Observable<T> {
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
  postRequest<T>(url: string, body: T, options?: HttpOptions): Observable<T> {
    return this.http.post<T>(url, body, options)
      .pipe(
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
}
