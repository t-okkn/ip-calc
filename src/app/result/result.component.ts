import { Component } from '@angular/core';

import { AppSharedService } from '../app.shared.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {

  get textSize(): string {
    return this._shared.isError ? 'is-5' : 'is-4';
  }

  constructor(
    private _shared: AppSharedService
  ) { }
}
