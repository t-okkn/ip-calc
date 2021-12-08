import { Injectable } from '@angular/core';

import {
  QuestionSet,
  SummaryCollection,
} from './backend/backend.models';


@Injectable({ providedIn: 'root' })
export class AppSharedService {

  showInitBtn: boolean;
  showAppChoice: boolean;
  showAppAnswer: boolean;
  showAppResult: boolean;

  isNarrow: boolean

  nowQuestion: QuestionSet;
  resultSummary: SummaryCollection;

  isError: boolean;
  errMessage: string;

  constructor() {
    this.showInitBtn   = true;
    this.showAppChoice = false;
    this.showAppAnswer = false;
    this.showAppResult = false;

    this.isError    = false;
    this.errMessage = '';

    this.nowQuestion = {
      id:          '',
      q_number:    -1,
      source:      '',
      cidr_bits:   -1,
      subnet_mask: '',
    };

    this.resultSummary = {
      id: '',
      is_end: false,
      summary: [{
        q_number:     -1,
        source:       '',
        cidr_bits:    -1,
        subnet_mask:  '',
        correct_nw:   '',
        answer_nw:    '',
        correct_bc:   '',
        answer_bc:    '',
        answered_sec: 0,
      }],
    }

    if (document.body.clientWidth < 420) {
      this.isNarrow = true;
    } else {
      this.isNarrow = false;
    }

    window.addEventListener('resize', (ev): any => {
      if (document.body.clientWidth < 420) {
        this.isNarrow = true;
      } else {
        this.isNarrow = false;
      }
    }, false);
  }
}
