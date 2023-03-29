import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout
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
      </div>

      <p layout_left_sidebar>Left Menu</p>

      <div layout_content>
        <simple-chat></simple-chat>
      </div>

      <p layout_right_sidebar>Right Menu</p>

      <div class="foot" layout_footer></div>
    </app-layout>
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
  leftSidebarVisible = false;
  rightSidebarVisible = false;

  toggleLeftMenu(): void {
    this.leftSidebarVisible = !this.leftSidebarVisible;
  }

  toggleRightMenu(): void {
    this.rightSidebarVisible = !this.rightSidebarVisible;
  }
}
