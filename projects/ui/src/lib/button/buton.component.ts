import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'jff-button',
  templateUrl: 'buton.component.html',
  styleUrls: ['buton.component.css'],
  standalone: true,
})
export class ButtonComponent {
  @Output()
  onClick = new EventEmitter<never>();
}
