import { Component, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { ResumeType } from '../backend/backend.models';
import { AppSharedService } from '../app.shared.service';
import { AppTimerService } from '../app.timer.service';

import { Err } from '../app.const';


@Component({
  selector: 'app-init-btn',
  templateUrl: './init-btn.component.html',
  styleUrls: ['./init-btn.component.scss']
})
export class InitBtnComponent implements OnInit {

  hasCookie: boolean;

  constructor(
    private _backend: BackendService,
    private _shared: AppSharedService,
    private _timer: AppTimerService
  ) {
    this.hasCookie = false;
  }

  async ngOnInit(): Promise<void> {
    const checkCookie$ = this._backend.getCheckCookie();
    const status: number = await lastValueFrom(checkCookie$);

    this.hasCookie = status === 200;
  }

  public onInitClick(): void {
    this._shared.showAppChoice = true;
    this._shared.showInitBtn = false;
  }

  public async onResumeClick(): Promise<void> {
    const resume$ = this._backend.getResume();
    const params: ResumeType = await lastValueFrom(resume$);

    if ('error' in params) {
      if (Number(params.error.slice(1)) < 100) {
        this._shared.errMessage = Err.SERIOUS;

      } else {
        this._shared.errMessage = params.message;
      }

      this._shared.isError = true;
      return;
    }

    this._shared.nowQuestion = {
      id:          params.id,
      q_number:    params.q_number,
      source:      params.source,
      cidr_bits:   params.cidr_bits,
      subnet_mask: params.subnet_mask,
    };

    this._timer.start(params.elapsed);

    this._shared.showAppAnswer = true;
    this._shared.showInitBtn = false;
  }
}
