import { Component, OnInit } from '@angular/core';

import { AppSharedService } from './app.shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  get showInitBtn(): boolean {
    return this._shared.showInitBtn;
  }

  get showAppChoice(): boolean {
    return this._shared.showAppChoice;
  }

  get showAppAnswer(): boolean {
    return this._shared.showAppAnswer;
  }

  get showAppResult(): boolean {
    return this._shared.showAppResult;
  }

  get textSize(): string {
    return this._shared.isNarrow ? 'is-5' : 'is-4';
  }

  get isError(): boolean {
    return this._shared.isError;
  }

  constructor(
    private _shared: AppSharedService
  ) { }

  ngOnInit(): void { }
}
