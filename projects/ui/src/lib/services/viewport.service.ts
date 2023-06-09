import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

export enum ViewState {
  SMALL,
  MEDIUM,
  LARGE,
}

export interface IViewportService {
  getCurrentValue(): ViewState;
  listenViewState(): Observable<ViewState>;
}

@Injectable()
export class ViewportService implements IViewportService, OnDestroy {
  private currentView$ = new BehaviorSubject(ViewState.LARGE);
  private viewSwitchListener = combineLatest([
    this.observer.observe('(max-width: 839px)'),
    this.observer.observe('(max-width: 400px)'),
  ]).subscribe((d) => {
    if (d[1]?.matches) {
      this.currentView$.next(ViewState.SMALL);
      return;
    }
    if (d[0]?.matches) {
      this.currentView$.next(ViewState.MEDIUM);
      return;
    }
    this.currentView$.next(ViewState.LARGE);
  });

  constructor(private observer: BreakpointObserver) {}

  getCurrentValue(): ViewState {
    return this.currentView$.getValue();
  }

  listenViewState(): Observable<ViewState> {
    return this.currentView$;
  }

  ngOnDestroy() {
    this.viewSwitchListener?.unsubscribe();
  }
}
