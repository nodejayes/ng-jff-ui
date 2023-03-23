import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout
      [headerVisible]="true"
      [footerVisible]="false"
      [(leftMenuVisible)]="leftMenuVisible"
      [(rightMenuVisible)]="rightMenuVisible"
    >
      <div class="head" layout_header>
        <button (click)="toggleLeftMenu()">
          <icon-menu *ngIf="!leftMenuVisible"></icon-menu>
          <icon-close *ngIf="leftMenuVisible"></icon-close>
        </button>

        <button (click)="toggleRightMenu()">
          <icon-menu *ngIf="!rightMenuVisible"></icon-menu>
          <icon-close *ngIf="rightMenuVisible"></icon-close>
        </button>
      </div>

      <p layout_left_menu>Left Menu</p>

      <div layout_content>
        <simple-chat></simple-chat>
      </div>

      <p layout_right_menu>Right Menu</p>

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
  leftMenuVisible = false;
  rightMenuVisible = false;

  toggleLeftMenu(): void {
    this.leftMenuVisible = !this.leftMenuVisible;
  }

  toggleRightMenu(): void {
    this.rightMenuVisible = !this.rightMenuVisible;
  }
}
