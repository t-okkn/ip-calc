import { Component } from '@angular/core';

import { AppSharedService } from '../app.shared.service';
import { SummarySet } from '../backend/backend.models';
import { AppTimerService } from '../app.timer.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  get textSize(): string {
    return this._shared.isNarrow ? 'is-5' : 'is-4';
  }

  get results(): SummarySet[] {
    return this._shared.resultSummary.summary;
  }

  constructor(
    private _shared: AppSharedService,
    private _time: AppTimerService,
  ) { }

  public getDisplayQuestion(ss: SummarySet): string {
    const source: string = ss.source;
    const bits: number = ss.cidr_bits;
    const subnet: string = ss.subnet_mask;

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

  public isCorrect(ss: SummarySet): boolean {
    return ss.answer_nw === ss.correct_nw && ss.answer_bc === ss.correct_bc;
  }

  public getBackgroundColor(ss: SummarySet): string {
    if (this.isCorrect(ss)) {
      return 'has-background-primary-light';
    } else {
      return 'has-background-danger-light';
    }
  }

  public getIcon(ss: SummarySet): string {
    if (this.isCorrect(ss)) {
      return 'fab fa-angellist';
    } else {
      return 'fas fa-times';
    }
  }

  public getIconColor(ss: SummarySet): string {
    if (this.isCorrect(ss)) {
      return 'has-text-primary-dark';
    } else {
      return 'has-text-danger-dark';
    }
  }

  public getAnsweredTime(sec: number): string {
    return this._time.elapsedSecondToDisplay(sec);
  }

  public onReload(): void {
    window.location.reload();
  }
}
