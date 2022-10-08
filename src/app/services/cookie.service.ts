import { Injectable } from '@angular/core';
import {CookieKeyEnum} from "../utils/cookie.enum";
import {CookieService} from "ngx-cookie";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService: CookieService) { }

  setCookies(key: CookieKeyEnum, value: any): void {
    this.cookieService.put(key, JSON.stringify(value));
  }

  getCookies(key: CookieKeyEnum): any {
    return this.cookieService.get(key);
  }

  cleanCookies(key: CookieKeyEnum): void {
    this.cookieService.remove(key)
  }
}
