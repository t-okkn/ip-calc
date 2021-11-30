import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private _cookieService: CookieService
  ) {}

  //this._cookieService.set('ipc-id', 'test', 1);
  //let id = this._cookieService.getCookie('ipc-id');
}
