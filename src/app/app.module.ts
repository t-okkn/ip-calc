import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BackendService } from './backend/backend.service';
import { AppSharedService } from './app.shared.service';
import { AppTimerService } from './app.timer.service';

import { AppComponent } from './app.component';
import { AnswerComponent } from './answer/answer.component';
import { ResultComponent } from './result/result.component';
import { ChoiceComponent } from './choice/choice.component';
import { ErrorComponent } from './error/error.component';
import { InitBtnComponent } from './init-btn/init-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    ResultComponent,
    ChoiceComponent,
    ErrorComponent,
    InitBtnComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    BackendService,
    AppSharedService,
    AppTimerService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
