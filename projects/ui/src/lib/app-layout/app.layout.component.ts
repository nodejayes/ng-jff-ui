import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ViewportService, ViewState } from '../services/viewport.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jff-layout',
  standalone: true,
  imports: [NgIf, NgScrollbarModule, AsyncPipe],
  providers: [ViewportService],
  templateUrl: 'app.layout.component.html',
  styleUrls: ['app.layout.component.css'],
  animations: [
    trigger('mainContentLeft', [
      state('on', style({ 'padding-left': '220px' })),
      state('off', style({ 'padding-left': '0' })),
      transition('* => off', animate('250ms')),
      transition('* => on', animate('250ms')),
    ]),
    trigger('mainContentRight', [
      state('on', style({ 'padding-right': '220px' })),
      state('off', style({ 'padding-right': '0' })),
      transition('* => off', animate('250ms')),
      transition('* => on', animate('250ms')),
    ]),
    trigger('rightSidebar', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
          opacity: 0,
        }),
        animate(
          '250ms',
          style({
            transform: 'translateX(0)',
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0)',
          opacity: 1,
        }),
        animate(
          '250ms',
          style({
            transform: 'translateX(100%)',
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger('leftSidebar', [
      transition(':enter', [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        }),
        animate(
          '250ms',
          style({
            transform: 'translateX(0)',
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0)',
          opacity: 1,
        }),
        animate(
          '250ms',
          style({
            transform: 'translateX(-100%)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AppLayoutComponent implements OnInit, OnDestroy, OnChanges {
  /*
   * the State of the AnimationTrigger for the left Menu
   * this one changes automatically when the leftMenuVisible was changed
   */
  leftSidebarAnimationState = 'on';
  /*
   * the State of the AnimationTrigger for the right Menu
   * this one changes automatically when the rightMenuVisible was changed
   */
  rightSidebarAnimationState = 'on';

  /*
   * is the left Menu of the Layout visible or not
   */
  @Input() leftSidebarVisible = false;
  /*
   * is the right Menu of the Layout visible or not
   */
  @Input() rightSidebarVisible = false;
  /*
   * is the Header of the Layout visible or not
   */
  @Input() headerVisible = true;
  /*
   * is the Footer of the Layout visible or not
   */
  @Input() footerVisible = true;
  @Output() leftSidebarVisibleChange = new EventEmitter<boolean>(true);
  @Output() rightSidebarVisibleChange = new EventEmitter<boolean>(true);
  @Output() headerVisibleChange = new EventEmitter<boolean>();
  @Output() footerVisibleChange = new EventEmitter<boolean>();
  private viewSwitchListener: Subscription | null = null;

  constructor(private viewportService: ViewportService) {}

  /*
   * change the AnimationState of the left Menu from given Visible Value
   * @param currentValue the current leftMenuVisible value
   */
  leftSidebarStateChange(currentValue: boolean): void {
    if (currentValue) {
      this.leftSidebarAnimationState = 'on';
      return;
    }
    this.leftSidebarAnimationState = 'off';
  }

  /*
   * change the AnimationState of the right Menu from given Visible Value
   * @param currentValue the current rightMenuVisible value
   */
  rightSidebarStateChange(currentValue: boolean): void {
    if (currentValue) {
      this.rightSidebarAnimationState = 'on';
      return;
    }
    this.rightSidebarAnimationState = 'off';
  }

  ngOnInit(): void {
    this.viewSwitchListener = this.viewportService
      .listenViewState()
      .subscribe((d) => {
        switch (d) {
          case ViewState.MEDIUM:
            // only one menu can be open so close the right one when left is open
            if (this.leftSidebarVisible && this.rightSidebarVisible) {
              this.rightSidebarVisible = false;
              this.rightSidebarStateChange(false);
              this.rightSidebarVisibleChange.emit(false);
            }
            break;
          case ViewState.SMALL:
            // TODO: view must be switched
            break;
        }
      });
  }

  ngOnDestroy(): void {
    this.viewSwitchListener?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['leftSidebarVisible']) {
      switch (this.viewportService.getCurrentValue()) {
        case ViewState.MEDIUM:
          if (
            changes['leftSidebarVisible'].currentValue &&
            this.rightSidebarVisible
          ) {
            this.rightSidebarVisible = false;
            this.rightSidebarStateChange(false);
            this.rightSidebarVisibleChange.emit(false);
          }
          break;
      }
      this.leftSidebarStateChange(changes['leftSidebarVisible'].currentValue);
    }
    if (changes['rightSidebarVisible']) {
      switch (this.viewportService.getCurrentValue()) {
        case ViewState.MEDIUM:
          if (
            changes['rightSidebarVisible'].currentValue &&
            this.leftSidebarVisible
          ) {
            this.leftSidebarVisible = false;
            this.leftSidebarStateChange(false);
            this.leftSidebarVisibleChange.emit(false);
          }
          break;
      }
      this.rightSidebarStateChange(changes['rightSidebarVisible'].currentValue);
    }
  }
}
