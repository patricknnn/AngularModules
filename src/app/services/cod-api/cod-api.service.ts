import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class CodApiService {
  isLoggedIn: boolean = false;
  apiBaseURL: string = "https://my.callofduty.com/api/papi-client/";
  apiLoginURL: string = "https://profile.callofduty.com/cod/mapp/";
  apiProfileURL: string = "https://profile.callofduty.com/";
  baseCookie: string = "new_SiteId=cod; ACT_SSO_LOCALE=en_US;country=US;XSRF-TOKEN=68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041;API_CSRF_TOKEN=68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041;";
  ssoCookie: string = "";
  userAgent: string = "a4b471be-4ad2-47e2-ba0e-e1f2aa04bff9";
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
}
