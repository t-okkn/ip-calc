import { Component } from '@angular/core';

import { AppSharedService } from '../app.shared.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent{

  get errMessage(): string {
    return this._shared.errMessage;
  }

  constructor(
    private _shared: AppSharedService
  ) { }

  onDeleteClick() {
    this._shared.isError = false;
  }
}
