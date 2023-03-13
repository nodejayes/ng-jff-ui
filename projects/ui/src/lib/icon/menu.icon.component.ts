import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-menu',
  standalone: true,
  templateUrl: 'menu.icon.component.html',
})
export class MenuIconComponent {
  @Input() color = '#ffffff';
}
