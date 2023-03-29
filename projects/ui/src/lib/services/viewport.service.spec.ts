import { ViewportService, ViewState } from './viewport.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject, of } from 'rxjs';
import createSpyObj = jasmine.createSpyObj;

describe('ViewportService Tests', () => {
  it('screens with max-width larger than 839px returns ViewState LARGE', () => {
    const breakpointObserverSpy = createSpyObj(BreakpointObserver, ['observe']);
    breakpointObserverSpy.observe.and.callFake(() =>
      of({
        breakpoints: {},
        matches: false,
      })
    );
    const viewportService = new ViewportService(breakpointObserverSpy);
    expect(viewportService.getCurrentValue()).toBe(ViewState.LARGE);
  });
  it('screens with max-width of 839px returns ViewState MEDIUM', () => {
    const breakpointObserverSpy = createSpyObj(BreakpointObserver, ['observe']);
    breakpointObserverSpy.observe.and.callFake((q: string) => {
      switch (q) {
        case '(max-width: 839px)':
          return of({
            breakpoints: {},
            matches: true,
          });
      }
      return of({
        breakpoints: {},
        matches: false,
      });
    });
    const viewportService = new ViewportService(breakpointObserverSpy);
    expect(viewportService.getCurrentValue()).toBe(ViewState.MEDIUM);
  });
  it('screens with max-width of 400px returns ViewState SMALL', () => {
    const breakpointObserverSpy = createSpyObj(BreakpointObserver, ['observe']);
    breakpointObserverSpy.observe.and.callFake((q: string) => {
      switch (q) {
        case '(max-width: 839px)':
          return of({
            breakpoints: {},
            matches: false,
          });
      }
      return of({
        breakpoints: {},
        matches: true,
      });
    });
    const viewportService = new ViewportService(breakpointObserverSpy);
    expect(viewportService.getCurrentValue()).toBe(ViewState.SMALL);
  });
  it('can stream the ViewState', (done) => {
    const breakpointObserverSpy = createSpyObj(BreakpointObserver, ['observe']);
    breakpointObserverSpy.observe.and.callFake(() =>
      of({
        breakpoints: {},
        matches: false,
      })
    );
    const viewportService = new ViewportService(breakpointObserverSpy);
    viewportService.listenViewState().subscribe((state) => {
      expect(state).toBe(ViewState.LARGE);
      done();
    });
  });
  it('ngDestroy unsubscribe ViewState Stream', () => {
    const breakpointState = new BehaviorSubject<BreakpointState>({
      breakpoints: {},
      matches: false,
    });
    const breakpointObserverSpy = createSpyObj(BreakpointObserver, ['observe']);
    breakpointObserverSpy.observe.and.callFake(() => breakpointState);
    const viewportService = new ViewportService(breakpointObserverSpy);
    expect(viewportService.getCurrentValue()).toBe(ViewState.LARGE);
    viewportService.ngOnDestroy();
    breakpointState.next({
      breakpoints: {},
      matches: true,
    });
    expect(viewportService.getCurrentValue()).toBe(ViewState.LARGE);
  });
});
