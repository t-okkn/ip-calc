import { Component } from '@angular/core';

import { AppSharedService } from '../app.shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  get textSize(): string {
    return this.shared.textSize;
  }

  constructor(
    private shared: AppSharedService
  ) { }
}
