import { Component } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { InitType } from '../backend/backend.models';
import { AppSharedService } from '../app.shared.service';
import { AppTimerService } from '../app.timer.service';

import { AppConst } from '../app.const';


@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {

  private _const;

  q_number: number;

  readonly q_nums: number[];

  constructor(
    private _backend: BackendService,
    private _shared: AppSharedService,
    private _timer: AppTimerService
  ) {
    this._const = (new AppConst).self();

    this.q_number = 10;
    this.q_nums = [];

    for (let i = this.q_number; i <= 100; i+=10) {
      this.q_nums.push(i);
    }
  }

  public async onStartClick(): Promise<boolean> {
    const init$ = this._backend.getInit(this.q_number);
    const params: InitType = await lastValueFrom(init$);

    if ('error' in params) {
      if (Number(params.error.slice(1)) < 100) {
        this._shared.errMessage = this._const.ERR_SERIOUS;

      } else {
        this._shared.errMessage = params.message;
      }

      this._shared.isError = true;
      return false;
    }

    this._shared.nowQuestion = params;
    this._timer.start();

    this._shared.showAppAnswer = true;
    this._shared.showAppChoice = false;

    return false;
  }
}
