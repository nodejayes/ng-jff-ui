import { AppLayoutComponent } from './app.layout.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { compileNgModule } from '@angular/compiler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  imports: [AppLayoutComponent],
  standalone: true,
  template: `<app-layout [leftMenuVisible]="true" [rightMenuVisible]="true">
    <p layout_header class="headerText">some Title</p>
    <p layout_footer class="footerText">some Footer</p>
    <p layout_left_menu class="leftMenuText">the left Menu</p>
    <p layout_right_menu class="rightMenuText">the right Menu</p>
  </app-layout>`,
})
class AppLayoutWrapperComponent {}

describe('Component: AppLayout', () => {
  let component: AppLayoutComponent;
  let fixture: ComponentFixture<AppLayoutComponent>;
  let wrapper: AppLayoutWrapperComponent;
  let wrapperFixture: ComponentFixture<AppLayoutWrapperComponent>;
  const getHeaderElement = () => fixture.debugElement.query(By.css('header'));
  const getFooterElement = () => fixture.debugElement.query(By.css('footer'));
  const getLeftMenuElement = () =>
    fixture.debugElement.query(By.css('.leftSidebar'));
  const getRightMenuElement = () =>
    fixture.debugElement.query(By.css('.rightSidebar'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AppLayoutComponent,
        AppLayoutWrapperComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppLayoutComponent);
    component = fixture.componentInstance;
    wrapperFixture = TestBed.createComponent(AppLayoutWrapperComponent);
    wrapper = wrapperFixture.componentInstance;
  });

  describe('check default values', () => {
    it('header on default is visible', () => {
      expect(component.headerVisible).toBeTruthy();
    });
    it('footer on default is visible', () => {
      expect(component.headerVisible).toBeTruthy();
    });
    it('leftMenu on default is not visible', () => {
      expect(component.leftMenuVisible).toBeFalsy();
    });
    it('rightMenu on default is not visible', () => {
      expect(component.rightMenuVisible).toBeFalsy();
    });
  });

  describe('header hide and visible', () => {
    it('header can be hidden', () => {
      component.headerVisible = false;
      fixture.detectChanges();
      expect(getHeaderElement()).toBeNull();
    });
    it('header can be visible', () => {
      component.headerVisible = true;
      fixture.detectChanges();
      expect(getHeaderElement()).not.toBeNull();
    });
  });

  describe('footer hide and visible', () => {
    it('footer can be hidden', () => {
      component.footerVisible = false;
      fixture.detectChanges();
      expect(getFooterElement()).toBeNull();
    });
    it('footer can be visible', () => {
      component.footerVisible = true;
      fixture.detectChanges();
      expect(getFooterElement()).not.toBeNull();
    });
  });

  describe('leftMenu hide and visible', () => {
    it('leftMenu can be hidden', () => {
      component.leftMenuVisible = false;
      fixture.detectChanges();
      expect(getLeftMenuElement()).toBeNull();
    });
    it('leftMenu can be visible', () => {
      component.leftMenuVisible = true;
      fixture.detectChanges();
      expect(getLeftMenuElement()).not.toBeNull();
    });
  });

  describe('rightMenu hide and visible', () => {
    it('rightMenu can be hidden', () => {
      component.rightMenuVisible = false;
      fixture.detectChanges();
      expect(getRightMenuElement()).toBeNull();
    });
    it('rightMenu can be visible', () => {
      component.rightMenuVisible = true;
      fixture.detectChanges();
      expect(getRightMenuElement()).not.toBeNull();
    });
  });

  describe('check ng-content was projected', () => {
    it('header content projected', () => {
      wrapperFixture.detectChanges();
      const headerContent = wrapperFixture.debugElement.query(
        By.css('.headerText')
      );
      expect(headerContent).not.toBeNull();
      expect(headerContent.nativeElement.innerText).toBe('some Title');
    });
    it('footer content projected', () => {
      wrapperFixture.detectChanges();
      const footerContent = wrapperFixture.debugElement.query(
        By.css('.footerText')
      );
      expect(footerContent).not.toBeNull();
      expect(footerContent.nativeElement.innerText).toBe('some Footer');
    });
    it('leftMenu content projected', () => {
      wrapperFixture.detectChanges();
      const leftMenuContent = wrapperFixture.debugElement.query(
        By.css('.leftMenuText')
      );
      expect(leftMenuContent).not.toBeNull();
      expect(leftMenuContent.nativeElement.innerText).toBe('the left Menu');
    });
    it('rightMenu content projected', () => {
      wrapperFixture.detectChanges();
      const rightMenuContent = wrapperFixture.debugElement.query(
        By.css('.rightMenuText')
      );
      expect(rightMenuContent).not.toBeNull();
      expect(rightMenuContent.nativeElement.innerText).toBe('the right Menu');
    });
  });
});
