import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-close',
  standalone: true,
  templateUrl: 'close.icon.component.html',
})
export class CloseIconComponent {
  @Input() color = '#ffffff';
}
