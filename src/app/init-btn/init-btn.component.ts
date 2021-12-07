import { Component, OnInit } from '@angular/core';

import { lastValueFrom } from 'rxjs';

import { BackendService } from '../backend/backend.service';
import { ResumeType, QuestionSet } from '../backend/backend.models';
import { AppSharedService } from '../app.shared.service';


@Component({
  selector: 'app-init-btn',
  templateUrl: './init-btn.component.html',
  styleUrls: ['./init-btn.component.scss']
})
export class InitBtnComponent implements OnInit {

  hasCookie: boolean = false;

  constructor(
    private backend: BackendService,
    private shared: AppSharedService
  ) { }

  async ngOnInit(): Promise<void> {
    const checkCookie$ = this.backend.getCheckCookie();
    const status: number = await lastValueFrom(checkCookie$);

    this.hasCookie = status === 200;
  }

  onInitClick(): void {
    this.shared.showAppChoice = true;
    this.shared.showInitBtn = false;
  }

  async onResumeClick(): Promise<void> {
    const resume$ = this.backend.getResume();
    const params: ResumeType = await lastValueFrom(resume$);

    if ('error' in params) {
      if (Number(params.error.slice(1)) < 100) {
        this.shared.errMessage = '現在、このアプリは利用可能な状態ではありません。\n時間が経ってからアクセスし直してください。';

      } else {
        this.shared.errMessage = params.message;
      }

      this.shared.isError = true;
      return;
    }

    const qs: QuestionSet = {
      id:          params.id,
      q_number:    params.q_number,
      source:      params.source,
      cidr_bits:   params.cidr_bits,
      subnet_mask: params.subnet_mask,
    };

      //sharedでQuestionSetを持つか？
      //タイマーをスタートさせる
      //timer.start(params.elapsed) 的な

    this.shared.showInitBtn = false;
  }
}
