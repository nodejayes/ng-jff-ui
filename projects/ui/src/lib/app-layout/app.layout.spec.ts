import { AppLayoutComponent } from './app.layout.component';
import { TestBed, waitForAsync } from '@angular/core/testing';
import {
  IViewportService,
  ViewportService,
  ViewState,
} from '../services/viewport.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  imports: [AppLayoutComponent],
  standalone: true,
  template: `<app-layout
    [(leftMenuVisible)]="leftMenuVisible"
    [(rightMenuVisible)]="rightMenuVisible"
  >
    <p layout_header class="headerText">some Title</p>
    <p layout_footer class="footerText">some Footer</p>
    <p layout_left_menu class="leftMenuText">the left Menu</p>
    <p layout_right_menu class="rightMenuText">the right Menu</p>
  </app-layout>`,
})
class AppLayoutWrapperComponent {
  leftMenuVisible = true;
  rightMenuVisible = true;
}

class MockedViewportService implements IViewportService {
  private currentView$ = new BehaviorSubject(ViewState.LARGE);

  getCurrentValue(): ViewState {
    return this.currentView$.getValue();
  }

  listenViewState(): Observable<ViewState> {
    return this.currentView$;
  }

  setCurrentView(state: ViewState): void {
    this.currentView$.next(state);
  }
}

describe('AppLayoutComponent Tests', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppLayoutWrapperComponent,
        BrowserAnimationsModule,
        AppLayoutComponent,
      ],
    }).compileComponents();
  }));

  describe('on default', () => {
    it('header is visible', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.headerVisible).toBeTruthy();
    });
    it('footer is visible', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.footerVisible).toBeTruthy();
    });
    it('leftMenu is hidden', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.leftMenuVisible).toBeFalsy();
    });
    it('rightMenu is hidden', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.rightMenuVisible).toBeFalsy();
    });
  });

  describe('header', () => {
    it('can be hidden', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.headerVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('header'))).toBeNull();
    });
    it('can be visible', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.headerVisible = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('header'))).not.toBeNull();
    });
    it('content has projected', () => {
      const fixture = TestBed.createComponent(AppLayoutWrapperComponent);
      fixture.detectChanges();
      const headerContent = fixture.debugElement.query(By.css('.headerText'));
      expect(headerContent).not.toBeNull();
      expect(headerContent.nativeElement.innerText).toBe('some Title');
    });
  });

  describe('footer', () => {
    it('can be hidden', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.footerVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('footer'))).toBeNull();
    });
    it('can be visible', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.footerVisible = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('footer'))).not.toBeNull();
    });
    it('content has projected', () => {
      const fixture = TestBed.createComponent(AppLayoutWrapperComponent);
      fixture.detectChanges();
      const footerContent = fixture.debugElement.query(By.css('.footerText'));
      expect(footerContent).not.toBeNull();
      expect(footerContent.nativeElement.innerText).toBe('some Footer');
    });
  });

  describe('leftMenu', () => {
    it('can be hidden', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.leftMenuVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.leftSidebar'))).toBeNull();
    });
    it('can be visible', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.leftMenuVisible = true;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.leftSidebar'))).not.toBeNull();
    });
    it('content has projected', () => {
      const fixture = TestBed.createComponent(AppLayoutWrapperComponent);
      fixture.detectChanges();
      const leftMenuContent = fixture.debugElement.query(
        By.css('.leftMenuText')
      );
      expect(leftMenuContent).not.toBeNull();
      expect(leftMenuContent.nativeElement.innerText).toBe('the left Menu');
    });
  });

  describe('rightMenu', () => {
    it('can be hidden', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.rightMenuVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.rightSidebar'))).toBeNull();
    });
    it('can be visible', () => {
      const fixture = TestBed.createComponent(AppLayoutComponent);
      fixture.detectChanges();
      fixture.componentInstance.rightMenuVisible = true;
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.rightSidebar'))
      ).not.toBeNull();
    });
    it('content has projected', () => {
      const fixture = TestBed.createComponent(AppLayoutWrapperComponent);
      fixture.detectChanges();
      const rightMenuContent = fixture.debugElement.query(
        By.css('.rightMenuText')
      );
      expect(rightMenuContent).not.toBeNull();
      expect(rightMenuContent.nativeElement.innerText).toBe('the right Menu');
    });
  });

  describe('max-width: 839px', () => {
    it('close the leftMenu when open and the rightMenu was opened', (done) => {
      const viewportServiceMock = new MockedViewportService();
      TestBed.overrideComponent(AppLayoutComponent, {
        set: {
          providers: [
            { provide: ViewportService, useValue: viewportServiceMock },
          ],
        },
      });
      viewportServiceMock.setCurrentView(ViewState.MEDIUM);
      const fixture = TestBed.createComponent(AppLayoutWrapperComponent);
      fixture.detectChanges();
      fixture.componentInstance.leftMenuVisible = true;
      fixture.componentInstance.rightMenuVisible = true;
      fixture.detectChanges();
      setTimeout(() => {
        expect(fixture.debugElement.query(By.css('.leftSidebar'))).toBeNull();
        done();
      }, 500);
    });
  });
});

/*

describe('Component: AppLayout', () => {
  describe('menu handling on small screens', () => {
    it('closes the rightMenu when the leftMenu was open', (done) => {
      viewportState.next(ViewState.MEDIUM);
      wrapperFixture.detectChanges();
      wrapper.leftMenuVisible = true;
      wrapper.rightMenuVisible = true;
      wrapperFixture.detectChanges();
      setTimeout(() => {
        wrapperFixture.detectChanges();
        expect(getLeftMenuWrapperElement()).toBeNull();
        expect(getRightMenuWrapperElement()).not.toBeNull();
        done();
      }, 300);
    });

    it('closes the rightMenu when the leftMenu was open and the viewport changes', (done) => {
      wrapper.leftMenuVisible = true;
      wrapper.rightMenuVisible = true;
      wrapperFixture.detectChanges();
      viewportState.next(ViewState.MEDIUM);
      wrapperFixture.detectChanges();
      setTimeout(() => {
        expect(getLeftMenuWrapperElement()).not.toBeNull();
        expect(getRightMenuWrapperElement()).toBeNull();
        done();
      }, 300);
    });

    it('not closes the rightMenu when the leftMenu was closed', (done) => {
      wrapper.leftMenuVisible = true;
      wrapper.rightMenuVisible = false;
      wrapperFixture.detectChanges();
      viewportState.next(ViewState.MEDIUM);
      wrapperFixture.detectChanges();
      setTimeout(() => {
        expect(getLeftMenuWrapperElement()).not.toBeNull();
        expect(getRightMenuWrapperElement()).toBeNull();
        done();
      }, 300);
    });
  });
});
*/
