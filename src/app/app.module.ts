import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AnswerComponent } from './answer/answer.component';
import { ResultComponent } from './result/result.component';
import { ChoiceComponent } from './choice/choice.component';

@NgModule({
  declarations: [
    AppComponent,
    AnswerComponent,
    ResultComponent,
    ChoiceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
