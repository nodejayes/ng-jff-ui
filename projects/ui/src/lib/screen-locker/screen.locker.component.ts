import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'jff-screen-locker',
  templateUrl: 'screen.locker.component.html',
  styleUrls: ['screen.locker.component.css'],
  standalone: true,
  imports: [NgIf],
  animations: [
    trigger('screenLocker', [
      transition(':enter', [
        style({
          transform: 'translateY(0)',
          opacity: 0,
        }),
        animate(
          '250ms',
          style({
            transform: 'translateY(0)',
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'translateY(0)',
          opacity: 1,
        }),
        animate(
          '400ms',
          style({
            transform: 'translateY(-100%)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class ScreenLockerComponent {
  @Input()
  visible = false;
  @Output()
  visibleChange = new EventEmitter<boolean>(true);

  close(): void {
    this.visibleChange.emit(false);
  }

  open(): void {
    this.visibleChange.emit(true);
  }
}
