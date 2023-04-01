import { Component } from '@angular/core';
import { MenuItem } from '../../projects/ui/src/lib/menu/datastructure';

@Component({
  selector: 'app-root',
  template: `
    <jff-screen-locker [visible]="lockerVisible">
      <h1>Login</h1>
      <button (click)="lockerVisible = !lockerVisible">X</button>
    </jff-screen-locker>
    <jff-layout
      [headerVisible]="true"
      [footerVisible]="false"
      [(leftSidebarVisible)]="leftSidebarVisible"
      [(rightSidebarVisible)]="rightSidebarVisible"
    >
      <div class="head" layout_header>
        <button (click)="toggleLeftMenu()">
          <icon-menu *ngIf="!leftSidebarVisible"></icon-menu>
          <icon-close *ngIf="leftSidebarVisible"></icon-close>
        </button>

        <button (click)="toggleRightMenu()">
          <icon-menu *ngIf="!rightSidebarVisible"></icon-menu>
          <icon-close *ngIf="rightSidebarVisible"></icon-close>
        </button>

        <button (click)="lockerVisible = true">Open Locker</button>
      </div>

      <p layout_left_sidebar>
        <jff-menu [items]="menuItems"></jff-menu>
      </p>

      <div layout_content>
        <simple-chat></simple-chat>
      </div>

      <p layout_right_sidebar>Right Menu</p>

      <div class="foot" layout_footer></div>
    </jff-layout>
  `,
  styles: [
    `
      .head,
      .foot {
        background-color: blue;
        box-shadow: 0 2px 5px #0000004d;
        height: 100%;
      }

      .head > button {
        width: 35px;
        height: 35px;
        background-color: transparent;
        border: none;
        padding: 5px;
        cursor: pointer;
      }
    `,
  ],
})
export class AppComponent {
  leftSidebarVisible = true;
  rightSidebarVisible = false;
  lockerVisible = false;
  menuItems: MenuItem[] = [
    {
      id: 1,
      title: 'Home',
      childs: [],
      clickHandler: (i) => console.info('clicked:', i),
    },
    {
      id: 2,
      title: 'Modul1',
      childs: [
        {
          id: 20,
          title: 'Modul1.1',
          childs: [],
          clickHandler: (i) => console.info('clicked:', i),
        },
      ],
      clickHandler: (i) => console.info('clicked:', i),
    },
  ];

  toggleLeftMenu(): void {
    this.leftSidebarVisible = !this.leftSidebarVisible;
  }

  toggleRightMenu(): void {
    this.rightSidebarVisible = !this.rightSidebarVisible;
  }
}
