import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'jff-screen-locker',
  templateUrl: 'screen.locker.component.html',
  styleUrls: ['screen.locker.component.css'],
  standalone: true,
  imports: [NgIf],
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
