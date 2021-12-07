import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppSharedService {
  showInitBtn: boolean = true;
  showAppChoice: boolean = false;
  showAppAnswer: boolean = false;
  showAppResult: boolean = false;

  textSize: string = 'is-4';

  isError: boolean = false;
  errMessage: string = '';

  constructor() {
    window.addEventListener('resize', (ev): any => {
      if (document.body.clientWidth < 400) {
        this.textSize = 'is-5';
      } else {
        this.textSize = 'is-4';
      }
    }, false);
  }
}
