import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppConst } from '../app.const';
import * as Models from './backend.models';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private appConst;

  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    }),
    observe: 'response',
    body: null
  };

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {
    this.appConst = (new AppConst).main();
  }

  public getInit(total: number, callback: (p: Models.InitType) => void): void {
    const host = this.appConst.BACKEND_HOST + '/v1/init/' + total;

    this.http.get(host).subscribe({
      next: (res) => {
        callback(res as Models.QuestionSet);
      },
      error: (error) => {
        callback(error as Models.ErrorMessage);
      }
    });
  }

  public postNext(
    qnum: number,
    body: any,
    callback: (p: Models.NextType) => void
): void {

    const cid = this.cookie.get('icp-id');
    const host = this.appConst.BACKEND_HOST + '/v1/next/' + cid + '/' + qnum;

    this.http.post(host, body, this.httpOptions).subscribe({
      next: (res) => {
        const str = new TextDecoder().decode(res);
        let end = false;

        const obj = JSON.parse(str, (key, val) => {
          if (key === "is_end") {
            end = true;
          }
        })

        if (end) {
          callback(obj as Models.SummaryCollection);

        } else {
          callback(obj as Models.QuestionSet);
        }
      },
      error: (error) => {
        callback(error as Models.ErrorMessage);
      }
    });
  }

  public getResume(callback: (p: Models.ResumeType) => void): void {
    const host = this.appConst.BACKEND_HOST + '/v1/resume';

    this.http.get(host).subscribe({
      next: (res) => {
        callback(res as Models.ResumeSet);
      },
      error: (error) => {
        callback(error as Models.ErrorMessage);
      }
    });
  }
}
