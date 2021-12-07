import { Component } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { AppSharedService } from '../app.shared.service';

import { InitType } from '../backend/backend.models';


@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent {

  q_number: number = 10;

  readonly q_nums: number[] = [];

  constructor(
    private backend: BackendService,
    private shared: AppSharedService
  ) {
    for (let i = this.q_number; i <= 100; i+=10) {
      this.q_nums.push(i);
    }
  }

  async onStartClick(): Promise<boolean> {
    this.shared.showAppAnswer = true;

    const init$ = this.backend.getInit(this.q_number);
    const params: InitType = await lastValueFrom(init$);

    if ('error' in params) {
      if (Number(params.error.slice(1)) < 100) {
        this.shared.errMessage = '現在、このアプリは利用可能な状態ではありません。\n時間が経ってからアクセスし直してください。';

      } else {
        this.shared.errMessage = params.message;
      }

      this.shared.isError = true;
      return false;
    }

    console.log(params);
    // 問題を詰め詰め

    this.shared.showAppChoice = false;
    return false;
  }
}
