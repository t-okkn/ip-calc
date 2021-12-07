import { Component, OnInit } from '@angular/core';

import { AppSharedService } from './app.shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  get showInitBtn(): boolean {
    return this.shared.showInitBtn;
  }

  get showAppChoice(): boolean {
    return this.shared.showAppChoice;
  }

  get showAppAnswer(): boolean {
    return this.shared.showAppAnswer;
  }

  get showAppResult(): boolean {
    return this.shared.showAppResult;
  }

  get textSize(): string {
    return this.shared.textSize;
  }

  get isError(): boolean {
    return this.shared.isError;
  }

  constructor(
    private shared: AppSharedService
  ) { }

  ngOnInit(): void { }
}
