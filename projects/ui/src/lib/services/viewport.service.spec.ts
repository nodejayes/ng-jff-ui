import { ViewportService, ViewState } from './viewport.service';
import { BehaviorSubject } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout';
import createSpyObj = jasmine.createSpyObj;

describe('ViewportService Tests', () => {
  let breakpointState: BehaviorSubject<BreakpointState>;
  let breakpointObserver = createSpyObj('BreakpointObserver', ['observe']);
  let viewportService: ViewportService;

  beforeEach(() => {
    breakpointState = new BehaviorSubject<BreakpointState>({
      matches: false,
      breakpoints: {
        '(width: 839px)': false,
        '(width: 400px)': false,
      },
    });
    breakpointObserver.observe.and.returnValue(breakpointState);
    viewportService = new ViewportService(breakpointObserver);
  });

  afterEach(() => {
    viewportService.ngOnDestroy();
  });

  it('default is LARGE ViewState', () => {
    expect(viewportService.getCurrentValue()).toBe(ViewState.LARGE);
  });
  it('can change View to MEDIUM', () => {
    breakpointState.next({
      matches: true,
      breakpoints: {
        '(width: 839px)': true,
      },
    });
    expect(viewportService.getCurrentValue()).toBe(ViewState.MEDIUM);
  });
  it('can change View to SMALL', () => {
    breakpointState.next({
      matches: true,
      breakpoints: {
        '(width: 400px)': true,
      },
    });
    expect(viewportService.getCurrentValue()).toBe(ViewState.SMALL);
  });
  it('can listen', (done) => {
    breakpointState.next({
      matches: false,
      breakpoints: {
        '(width: 839px)': false,
        '(width: 400px)': false,
      },
    });
    viewportService.listenViewState().subscribe((d) => {
      expect(d).toBe(ViewState.LARGE);
      done();
    });
  });
});
