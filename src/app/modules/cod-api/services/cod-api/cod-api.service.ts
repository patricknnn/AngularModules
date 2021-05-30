import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  observe?: 'body' | 'events' | 'response';
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>; };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;
}

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
  isLoggedIn: boolean = false;
  csrfToken?: string;
  ssoToken?: string;
  atknToken?: string;

  baseCookie: string = "Cookie: XSRF-TOKEN=Set by test scripts; new_SiteId=activision;";
  ssoCookie: string = "";
  userAgent: string = "a4b471be-4ad2-47e2-ba0e-e1f2aa04bff9";
  requestRetries: number = 3;
  requestOptions: RequestOptions = {
    headers: {
      "content-type": "application/json",
      "Cookie": this.baseCookie,
      "userAgent": this.userAgent,
      "x-requested-with": this.userAgent,
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Connection": "keep-alive"
    }
  };

  /**
   * Initialize CodApiService
   * @param http HttpClient module
   */
  constructor(private http: HttpClient) { }

  /**
   * Log in
   * @param username Username
   * @param password Password
   * @returns Promise<string>
   */
  login(username: string, password: string): Promise<string> {
    // Fetch token
    return new Promise((resolve, reject) => {
      this.getRequest<string>("https://s.activision.com/activision/login")
        .toPromise()
        .then((result) => {
          this.csrfToken = result;
          let options: RequestOptions = {
            headers: {
              "content-type": "application/json",
              "Cookie": "XSRF-TOKEN" + this.csrfToken + "; new_SiteId=activision;",
              "Accept": "application/json",
              "Connection": "keep-alive"
            }
          };
          let body = {
            "username": username,
            "password": password,
            "remember_me": "true",
            "_csrf": this.csrfToken
          }
          this.postRequest<any>("https://s.activision.com/do_login?new_SiteId=activision", body, options)
            .toPromise()
            .then((result) => {
              console.log(result);
              resolve("200 - OK. Log in successful.");
            }).catch((error) => {
              reject(typeof error === "string" ? error : error.message);
            });
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
        `body was: ${error.error}`);
    }
    // Return error message
    return throwError('Request resulted in an error.');
  }
}
