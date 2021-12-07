import { Component } from '@angular/core';

import { AppSharedService } from '../app.shared.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent{

  get errMessage(): string {
    return this.shared.errMessage;
  }
  
  constructor(
    private shared: AppSharedService
  ) { }

  onDeleteClick() {
    this.shared.isError = false;
  }
}
