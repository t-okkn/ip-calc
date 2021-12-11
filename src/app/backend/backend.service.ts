import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Const, Err } from '../app.const';
import * as MDL from './backend.models';
import { AppSharedService } from '../app.shared.service';


@Injectable({ providedIn: 'root' })
export class BackendService {

  constructor(
    private _http: HttpClient,
    private _shared: AppSharedService
  ) { }

  public getCheckCookie(): Observable<number> {
    const host = Const.BACKEND_HOST + '/hasCookie';
    const option: any = { observe: 'response' };

    return this._http.get<any>(host, option).pipe(
      map((res) => {
        const r = res as HttpResponse<any>;
        return r.status;
      }),

      catchError((err): Observable<number> => {
        const res = err as HttpErrorResponse;
        return of(res.status);
      })
    );
  }

  public getInit(total: number): Observable<MDL.InitType> {
    const host = Const.BACKEND_HOST + `/init/${total}`;

    return this._http.get<MDL.InitType>(host).pipe(
      map((res) => {
        if (res == null) {
          throw new Error('undefined');
        }

        return res as MDL.QuestionSet;
      }),

      catchError((err): Observable<MDL.ErrorMessage> => {
        if (err == null || 'message' in err || 'status' in err) {
          const tmp: MDL.ErrorMessage = {
            error:   'E999',
            message: Err.UNEXPECTED,
          };

          return of(tmp);
        }

        return of(err as MDL.ErrorMessage);
      })
    );
  }

  public postNext(body: MDL.AnswerSet): Observable<MDL.NextType> {
    const id = this._shared.nowQuestion.id;
    const qnum = this._shared.nowQuestion.q_number;

    const host = Const.BACKEND_HOST + `/next/${id}/${qnum}`;

    return this._http.post<MDL.NextType>(host, body).pipe(
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
        if (err == null || 'message' in err || 'status' in err) {
          const tmp: MDL.ErrorMessage = {
            error:   'E999',
            message: Err.UNEXPECTED,
          }

          return of(tmp);
        }

        return of(err as MDL.ErrorMessage);
      })
    );
  }

  public getResume(): Observable<MDL.ResumeType> {
    const host = Const.BACKEND_HOST + '/resume';

    return this._http.get<MDL.ResumeType>(host).pipe(
      map((res) => {
        if (res == null) {
          throw new Error('undefined');
        }

        return res as MDL.ResumeSet;
      }),

      catchError((err): Observable<MDL.ErrorMessage> => {
        if (err == null || 'message' in err || 'status' in err) {
          const tmp: MDL.ErrorMessage = {
            error:   'E999',
            message: Err.UNEXPECTED,
          }

          return of(tmp);
        }

        return of(err as MDL.ErrorMessage);
      })
    );
  }
}
