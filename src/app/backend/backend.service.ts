import { Injectable } from '@angular/core';
import * as HTTP from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AppConst } from '../app.const';
import * as MDL from './backend.models';


@Injectable({ providedIn: 'root' })
export class BackendService {

  private appConst;

  private readonly errMsg: string =
    '予期せぬエラーが発生しました。\nリロードしてください。';

  constructor(
    private http: HTTP.HttpClient
  ) {
    this.appConst = (new AppConst).self();
  }

  public getCheckCookie(): Observable<number> {
    const host = this.appConst.BACKEND_HOST + '/hasCookie';
    const option: any = { observe: 'response' };

    return this.http.get<any>(host, option).pipe(
      map((res) => {
        const r = res as HTTP.HttpResponseBase;
        return r.status;
      }),

      catchError((err): Observable<number> => {
        const res = err as HTTP.HttpResponseBase;
        return of(res.status);
      })
    );
  }

  public getInit(total: number): Observable<MDL.InitType> {
    const host = this.appConst.BACKEND_HOST + `/init/${total}`;

    return this.http.get<MDL.InitType>(host).pipe(
      map((res) => {
        if (res == null) {
          throw new Error('undefined');
        }

        return res as MDL.QuestionSet;
      }),

      catchError((err): Observable<MDL.ErrorMessage> => {
        if (err == null || 'message' in err) {
          const tmp: MDL.ErrorMessage = {
            error:   'E999',
            message: this.errMsg,
          };

          return of(tmp);
        }

        return of(err as MDL.ErrorMessage);
      })
    );
  }

  public postNext(id: string, qnum: number, body: MDL.AnswerSet):
                                        Observable<MDL.NextType> {

    const host = this.appConst.BACKEND_HOST + `/next/${id}/${qnum}`;
    const h = new HTTP.HttpHeaders().set('Content-Type', 'multipart/form-data');

    return this.http.post<MDL.NextType>(host, body, { headers: h }).pipe(
      map((res) => {
        if (res == null) {
          throw new Error('undefined');
        }

        if ('is_end' in res) {
          return res as MDL.SummaryCollection;

        } else if ('q_number' in res) {
          return res as MDL.QuestionSet;

        } else {
          throw new Error('invalidCast');
        }
      }),

      catchError((err): Observable<MDL.ErrorMessage> => {
        if (err == null || 'message' in err) {
          const tmp: MDL.ErrorMessage = {
            error:   'E999',
            message: this.errMsg,
          }

          return of(tmp);
        }

        return of(err as MDL.ErrorMessage);
      })
    );
  }

  public getResume(): Observable<MDL.ResumeType> {
    const host = this.appConst.BACKEND_HOST + '/resume';

    return this.http.get<MDL.ResumeType>(host).pipe(
      map((res) => {
        if (res == null) {
          throw new Error('undefined');
        }

        return res as MDL.ResumeSet;
      }),

      catchError((err): Observable<MDL.ErrorMessage> => {
        if (err == null || 'message' in err) {
          const tmp: MDL.ErrorMessage = {
            error:   'E999',
            message: this.errMsg,
          }

          return of(tmp);
        }

        return of(err as MDL.ErrorMessage);
      })
    );
  }
}
