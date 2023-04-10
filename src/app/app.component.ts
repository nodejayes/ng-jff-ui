import { Component, inject } from '@angular/core';
import { MenuItem } from '../../projects/ui/src/lib/menu/datastructure';
import { StyleService } from '../../projects/ui/src/lib/services/style.service';

@Component({
  selector: 'app-root',
  template: `
    <jff-screen-locker [visible]="lockerVisible">
      <h1>Login</h1>
      <jff-button (click)="lockerVisible = !lockerVisible">X</jff-button>
    </jff-screen-locker>
    <jff-layout
      [headerVisible]="true"
      [footerVisible]="false"
      [(leftSidebarVisible)]="leftSidebarVisible"
      [(rightSidebarVisible)]="rightSidebarVisible"
    >
      <div class="head" layout_header>
        <jff-button (click)="toggleLeftMenu()" [width]="25" [height]="25">
          <icon-menu
            *ngIf="!leftSidebarVisible"
            [color]="styleService.baseTextColor"
          ></icon-menu>
          <icon-close
            *ngIf="leftSidebarVisible"
            [color]="styleService.baseTextColor"
          ></icon-close>
        </jff-button>

        <jff-button (click)="toggleRightMenu()" [width]="25" [height]="25">
          <icon-menu
            *ngIf="!rightSidebarVisible"
            [color]="styleService.baseTextColor"
          ></icon-menu>
          <icon-close
            *ngIf="rightSidebarVisible"
            [color]="styleService.baseTextColor"
          ></icon-close>
        </jff-button>

        <jff-button (click)="lockerVisible = true" [height]="25"
          >Open Locker</jff-button
        >
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
  styles: [],
})
export class AppComponent {
  styleService = inject(StyleService);
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
