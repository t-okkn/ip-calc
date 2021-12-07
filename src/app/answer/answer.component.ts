import { Component } from '@angular/core';

import { AppSharedService } from '../app.shared.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {

  get textSize(): string {
    return this.shared.textSize;
  }

  constructor(
    private shared: AppSharedService
  ) { }

  onNextClick(): boolean {
    return false;
  }
}
