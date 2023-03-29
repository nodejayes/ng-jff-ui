import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScreenLockerComponent } from './screen.locker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';

@Component({
  template: ` <jff-screen-locker [(visible)]="isVisible"
    >content</jff-screen-locker
  >`,
})
class ScreenLockerWrapperComponent {
  isVisible = true;
}

describe('ScreenLockerComponent Tests', () => {
  describe('basic Component', () => {
    let fixture: ComponentFixture<ScreenLockerComponent>;
    let component: ScreenLockerComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, ScreenLockerComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ScreenLockerComponent);
      component = fixture.componentInstance;
    });

    it('can create Component', () => {
      expect(component).toBeDefined();
    });
    it('on default screen locker are hidden', () => {
      expect(
        fixture.debugElement.nativeElement.querySelector(
          '[data-testid="locker-content"]'
        )
      ).toBeNull();
    });
    it('can be hidden', () => {
      component.visible = false;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector(
          '[data-testid="locker-content"]'
        )
      ).toBeNull();
    });
    it('can be visible', () => {
      component.visible = true;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector(
          '[data-testid="locker-content"]'
        )
      ).not.toBeNull();
    });
  });

  describe('with Wrapper Component', () => {
    let fixture: ComponentFixture<ScreenLockerWrapperComponent>;
    let component: ScreenLockerWrapperComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ScreenLockerWrapperComponent],
        imports: [NoopAnimationsModule, ScreenLockerComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(ScreenLockerWrapperComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('content has projected', () => {
      component.isVisible = true;
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector(
          '[data-testid="locker-content"]'
        ).innerText
      ).toBe('content');
    });
  });
});
