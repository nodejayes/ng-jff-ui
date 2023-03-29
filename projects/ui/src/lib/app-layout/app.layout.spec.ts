import {AppLayoutComponent} from "./app.layout.component";
import {BehaviorSubject} from "rxjs";
import {ViewportService, ViewState} from "../services/viewport.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {Component, SimpleChange} from "@angular/core";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

@Component({
  template: `
    <app-layout [(headerVisible)]="headerVisible"
                [(footerVisible)]="footerVisible"
                [(leftSidebarVisible)]="leftSidebarVisible"
                [(rightSidebarVisible)]="rightSidebarVisible">
      <div layout_header>Title</div>
      <div layout_left_sidebar>Left</div>
      <div layout_right_sidebar>Right</div>
      <div layout_footer>Foot</div>
    </app-layout>`,
})
class AppLayoutWrapperComponent {
  leftSidebarVisible = true;
  rightSidebarVisible = true;
  headerVisible = true;
  footerVisible = true;
}

describe('AppLayoutComponent', () => {
  describe('basic Component', () => {
    let currentView = new BehaviorSubject(ViewState.LARGE);
    let viewportServiceSpy: SpyObj<ViewportService>;
    let fixture: ComponentFixture<AppLayoutComponent>;
    let component: AppLayoutComponent;

    beforeEach(async () => {
      viewportServiceSpy = createSpyObj<ViewportService>([
        'listenViewState', 'getCurrentValue',
      ]);
      viewportServiceSpy.getCurrentValue.and.callFake(() => currentView.getValue());
      viewportServiceSpy.listenViewState.and.callFake(() => currentView);
      await TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, AppLayoutComponent]
      }).overrideComponent(AppLayoutComponent, {
        set: {
          providers: [{provide: ViewportService, useValue: viewportServiceSpy}],
        }
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppLayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('on default header is visible', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-header"]')).not.toBeNull();
    });
    it('on default footer is visible', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-footer"]')).not.toBeNull();
    });
    it('on default leftMenu is hidden', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-left-sidebar"]')).toBeNull();
    });
    it('on default rightMenu is hidden', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-right-sidebar"]')).toBeNull();
    });

    it('header can be hidden', async () => {
      component.headerVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-header"]')).toBeNull();
    });
    it('header can be visible', async () => {
      component.headerVisible = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-header"]')).not.toBeNull();
    });

    it('footer can be hidden', async () => {
      component.footerVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-footer"]')).toBeNull();
    });
    it('footer can be visible', async () => {
      component.footerVisible = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-footer"]')).not.toBeNull();
    });

    it('leftMenu can be hidden', async () => {
      component.leftSidebarVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-left-sidebar"]')).toBeNull();
    });
    it('leftMenu can be visible', async () => {
      component.leftSidebarVisible = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-left-sidebar"]')).not.toBeNull();
    });

    it('rightMenu can be hidden', async () => {
      component.rightSidebarVisible = false;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-right-sidebar"]')).toBeNull();
    });
    it('rightMenu can be visible', async () => {
      component.rightSidebarVisible = true;
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-right-sidebar"]')).not.toBeNull();
    });
  });

  describe('with Wrappper Component', () => {
    let currentView = new BehaviorSubject(ViewState.LARGE);
    let viewportServiceSpy: SpyObj<ViewportService>;
    let fixture: ComponentFixture<AppLayoutWrapperComponent>;
    let component: AppLayoutWrapperComponent;

    beforeEach(async () => {
      viewportServiceSpy = createSpyObj<ViewportService>([
        'listenViewState', 'getCurrentValue',
      ]);
      viewportServiceSpy.getCurrentValue.and.callFake(() => currentView.getValue());
      viewportServiceSpy.listenViewState.and.callFake(() => currentView);
      await TestBed.configureTestingModule({
        declarations: [AppLayoutWrapperComponent],
        imports: [NoopAnimationsModule, AppLayoutComponent]
      }).overrideComponent(AppLayoutComponent, {
        set: {
          providers: [{provide: ViewportService, useValue: viewportServiceSpy}],
        }
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppLayoutWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('header content has projected', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-header"]').innerText).toBe('Title');
    });
    it('left Sidebar content has projected', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-left-sidebar"]').innerText).toBe('Left');
    });
    it('right Sidebar content has projected', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-right-sidebar"]').innerText).toBe('Right');
    });
    it('footer content has projected', async () => {
      expect(fixture.debugElement.nativeElement.querySelector('[data-testid="layout-footer"]').innerText).toBe('Foot');
    });
  });

  describe('Medium View', () => {
    let currentView = new BehaviorSubject(ViewState.MEDIUM);
    let viewportServiceSpy: SpyObj<ViewportService>;
    let fixture: ComponentFixture<AppLayoutComponent>;
    let component: AppLayoutComponent;

    beforeEach(async () => {
      viewportServiceSpy = createSpyObj<ViewportService>([
        'listenViewState', 'getCurrentValue',
      ]);
      viewportServiceSpy.getCurrentValue.and.callFake(() => currentView.getValue());
      viewportServiceSpy.listenViewState.and.callFake(() => currentView);
      await TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, AppLayoutComponent]
      }).overrideComponent(AppLayoutComponent, {
        set: {
          providers: [{provide: ViewportService, useValue: viewportServiceSpy}],
        }
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppLayoutComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('max-width: 839px close the leftMenu when open and the rightMenu was opened', async () => {
      spyOn(component.leftSidebarVisibleChange, 'emit');
      component.leftSidebarVisible = true;
      component.rightSidebarVisible = false;
      component.ngOnChanges({
        rightSidebarVisible: new SimpleChange(false, true, false),
      });
      fixture.detectChanges();
      expect(component.leftSidebarVisibleChange.emit).toHaveBeenCalledWith(false);
    });

    it('max-width: 839px close the rightMenu when open and the leftMenu was opened', async () => {
      spyOn(component.rightSidebarVisibleChange, 'emit');
      component.leftSidebarVisible = false;
      component.rightSidebarVisible = true;
      component.ngOnChanges({
        leftSidebarVisible: new SimpleChange(false, true, false),
      });
      fixture.detectChanges();
      expect(component.rightSidebarVisibleChange.emit).toHaveBeenCalledWith(false);
    });

    it('closes rightSidebar when both are open and side was loaded', () => {
      spyOn(component.rightSidebarVisibleChange, 'emit');
      component.leftSidebarVisible = true;
      component.rightSidebarVisible = true;
      fixture.detectChanges();
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.rightSidebarVisibleChange.emit).toHaveBeenCalledWith(false);
    });
  });
});
