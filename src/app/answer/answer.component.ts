import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { lastValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { AnswerSet, NextType } from '../backend/backend.models';
import { AppSharedService } from '../app.shared.service';
import { AppTimerService } from '../app.timer.service';

import { AppConst } from '../app.const';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {

  private _const;

  nowAns: AnswerSet;

  nwaddr: string;
  bcaddr: string;

  isErrNwaddr: boolean;
  isErrBcaddr: boolean;

  get textSize(): string {
    return this._shared.isNarrow ? 'is-5' : 'is-4';
  }

  get questionNumber(): number {
    return this._shared.nowQuestion.q_number;
  }

  get question(): string {
    const source: string = this._shared.nowQuestion.source;
    const bits: number = this._shared.nowQuestion.cidr_bits;
    const subnet: string = this._shared.nowQuestion.subnet_mask;

    if (bits === -1) {
      if (this._shared.isNarrow) {
        return `${source}
                @${subnet}`.replace(/ /g, '');

      } else {
        return `${source} @ ${subnet}`;
      }

    } else {
      return `${source} / ${bits}`;
    }
  }

  get elapsedTime(): string {
    const d = this._timer.elapsed;

    return this._timer.elapsedSecondToDisplay(d);
  }

  constructor(
    private _shared: AppSharedService,
    private _timer: AppTimerService,
    private _backend: BackendService
  ) {
    this._const = (new AppConst).self();

    this.nwaddr = '0.0.0.0';
    this.bcaddr = '0.0.0.0';

    this.isErrNwaddr = false;
    this.isErrBcaddr = false;

    this.nowAns = {
      nwaddr_1st: '',
      nwaddr_2nd: '',
      nwaddr_3rd: '',
      nwaddr_4th: '',
      bcaddr_1st: '',
      bcaddr_2nd: '',
      bcaddr_3rd: '',
      bcaddr_4th: '',
      elapsed:    0,
    }
  }

  public nwErrCheck(v: string): string {
    if (v === '') { return 'is-primary'; }

    const octet: number = Number(v);

    if (octet >= 0 && octet <= 255) {
      return 'is-primary';
    } else {
      return 'is-danger';
    }
  }

  public bcErrCheck(v: string): string {
    if (v === '') { return 'is-primary'; }

    const octet: number = Number(v);

    if (octet >= 0 && octet <= 255) {
      return 'is-primary';
    } else {
      return 'is-danger';
    }
  }

  public nwAddrChange(): void {
    let nw: number[] = [
      Number(this.nowAns.nwaddr_1st),
      Number(this.nowAns.nwaddr_2nd),
      Number(this.nowAns.nwaddr_3rd),
      Number(this.nowAns.nwaddr_4th),
    ]

    let nwerr: boolean[] = [false, false, false, false];
    let invalidValue: boolean[] = [false, false, false, false];

    for (let i = 0; i < nw.length; i++) {
      if (nw[i] < 0 || nw[i] > 255 || Number.isNaN(nw[i])) {
        nw[i] = 0;
        invalidValue[i] = true;
      }
    }

    if (this.nowAns.nwaddr_1st !== '' && invalidValue[0]) {
      nwerr[0] = true;
    }

    if (this.nowAns.nwaddr_2nd !== '' && invalidValue[1]) {
      nwerr[1] = true;
    }

    if (this.nowAns.nwaddr_3rd !== '' && invalidValue[2]) {
      nwerr[2] = true;
    }

    if (this.nowAns.nwaddr_4th !== '' && invalidValue[3]) {
      nwerr[3] = true;
    }

    this.nwaddr = nw.join('.');
    this.isErrNwaddr = nwerr[0] || nwerr[1] || nwerr[2] || nwerr[3];
  }

  public bcAddrChange(): void {
    const bc: number[] = [
      Number(this.nowAns.bcaddr_1st),
      Number(this.nowAns.bcaddr_2nd),
      Number(this.nowAns.bcaddr_3rd),
      Number(this.nowAns.bcaddr_4th),
    ]

    const bcerr: boolean[] = [false, false, false, false];
    const invalidValue: boolean[] = [false, false, false, false];

    for (let i = 0; i < bc.length; i++) {
      if (bc[i] < 0 || bc[i] > 255 || Number.isNaN(bc[i])) {
        bc[i] = 0;
        invalidValue[i] = true;
      }
    }

    if (this.nowAns.bcaddr_1st !== '' && invalidValue[0]) {
      bcerr[0] = true;
    }

    if (this.nowAns.bcaddr_2nd !== '' && invalidValue[1]) {
      bcerr[1] = true;
    }

    if (this.nowAns.bcaddr_3rd !== '' && invalidValue[2]) {
      bcerr[2] = true;
    }

    if (this.nowAns.bcaddr_4th !== '' && invalidValue[3]) {
      bcerr[3] = true;
    }

    this.bcaddr = bc.join('.');
    this.isErrBcaddr = bcerr[0] || bcerr[1] || bcerr[2] || bcerr[3];
  }

  public async onNextClick(): Promise<boolean> {
    this.nowAns.elapsed = this._timer.elapsed;

    const next$ = this._backend.postNext(this.nowAns);
    const params: NextType = await lastValueFrom(next$);

    if ('error' in params) {
      if (Number(params.error.slice(1)) < 100) {
        this._shared.errMessage = this._const.ERR_SERIOUS;

      } else {
        this._shared.errMessage = params.message;
      }

      this._timer.stop();

      this._shared.isError = true;
      return false;
    }

    if ('source' in params) {
      this._shared.nowQuestion = params;
      this.resetAnsData();

    } else {
      this._shared.resultSummary = params;
      this._timer.stop();

      this._shared.showAppResult = true;
      this._shared.showAppAnswer = false;
    }

    return false;
  }

  private resetAnsData(): void {
    this.nowAns.nwaddr_1st = '';
    this.nowAns.nwaddr_2nd = '';
    this.nowAns.nwaddr_3rd = '';
    this.nowAns.nwaddr_4th = '';
    this.nowAns.bcaddr_1st = '';
    this.nowAns.bcaddr_2nd = '';
    this.nowAns.bcaddr_3rd = '';
    this.nowAns.bcaddr_4th = '';

    this.nwaddr = '0.0.0.0';
    this.bcaddr = '0.0.0.0';
  }
}
