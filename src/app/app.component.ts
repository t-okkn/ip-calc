import { Component } from '@angular/core';

import { BackendService } from './backend/backend.service';
import { InitType } from './backend/backend.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private backend: BackendService
  ) {}

  onStartClick() {
    this.backend.getInit(10, this.callbackInitial);
  }

  callbackInitial(res: InitType): void {
    if (res == null) { return }

    if ('id' in res) {
      console.log(res.id);
    } else {
      console.log(res.error);
    }
  }
}
