import { Injectable } from '@angular/core';

import { map, interval, Subscription } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AppTimerService {

  private _timer: Subscription;
  private _elapsed: number;

  private _isStopped: boolean;

  get elapsed(): number {
    return this._elapsed;
  };

  constructor() {
    this._timer = new Subscription();
    this._elapsed = 0;
    this._isStopped = false;
  }

  public start(addition: number = 0): void {
    const t = interval(1000).pipe(
      map(x => x + 1 + addition)
    );

    this._timer = t.subscribe({
      next: (x) => this._elapsed = x
    });
  }

  public stop(): void {
    if (!this._isStopped) {
      this._timer.unsubscribe();
      this._isStopped = true;
    }
  }

  public elapsedSecondToDisplay(v: number): string {
    const h = (v - (v % 3600)) / 3600;
    const m = (v - 3600 * h - ((v - 3600 * h) % 60)) / 60;
    const s = v - 3600 * h - 60 * m;

    const m_str = m.toString().padStart(2, '0');
    const s_str = s.toString().padStart(2, '0');

    if (h === 0 && m === 0) {
      return `${s_str}秒`;

    } else if (h === 0) {
      return `${m_str}分${s_str}秒`;

    } else {
      return `${h}時間${m_str}分${s_str}秒`;
    }
  }
}
