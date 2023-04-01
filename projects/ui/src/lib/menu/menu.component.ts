import { Component, Input } from '@angular/core';
import { MenuItem } from './datastructure';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'jff-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.css'],
  standalone: true,
  imports: [NgForOf, NgIf],
})
export class MenuComponent {
  @Input()
  items: MenuItem[] = [];

  itemClicked(item: MenuItem) {
    if (!item.clickHandler) {
      return;
    }
    item.clickHandler(item);
  }
}
