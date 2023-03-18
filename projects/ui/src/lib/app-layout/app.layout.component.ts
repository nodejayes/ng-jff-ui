import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
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

@Component({
  selector: 'app-layout',
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
    trigger('rightMenu', [
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
    trigger('leftMenu', [
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
export class AppLayoutComponent implements OnDestroy, OnChanges {
  /*
   * the State of the AnimationTrigger for the left Menu
   * this one changes automatically when the leftMenuVisible was changed
   */
  leftMenuAnimationState = 'on';
  /*
   * the State of the AnimationTrigger for the right Menu
   * this one changes automatically when the rightMenuVisible was changed
   */
  rightMenuAnimationState = 'on';

  /*
   * is the left Menu of the Layout visible or not
   */
  @Input() leftMenuVisible = false;
  /*
   * is the right Menu of the Layout visible or not
   */
  @Input() rightMenuVisible = false;
  /*
   * is the Header of the Layout visible or not
   */
  @Input() headerVisible = true;
  /*
   * is the Footer of the Layout visible or not
   */
  @Input() footerVisible = true;
  @Output() leftMenuVisibleChange = new EventEmitter<boolean>();
  @Output() rightMenuVisibleChange = new EventEmitter<boolean>();
  @Output() headerMenuVisibleChange = new EventEmitter<boolean>();
  @Output() footerMenuVisibleChange = new EventEmitter<boolean>();

  constructor(private viewportService: ViewportService) {}

  private viewSwitchListener = this.viewportService
    .listenViewState()
    .subscribe((d) => {
      switch (d) {
        case ViewState.MEDIUM:
          // only one menu can be open so close the right one when left is open
          if (this.leftMenuVisible && this.rightMenuVisible) {
            this.rightMenuVisibleChange.emit(false);
          }
          break;
        case ViewState.SMALL:
          // TODO: view must be switched
          break;
      }
    });

  /*
   * change the AnimationState of the left Menu from given Visible Value
   * @param currentValue the current leftMenuVisible value
   */
  leftMenuStateChange(currentValue: boolean): void {
    if (currentValue) {
      this.leftMenuAnimationState = 'on';
      return;
    }
    this.leftMenuAnimationState = 'off';
  }

  /*
   * change the AnimationState of the right Menu from given Visible Value
   * @param currentValue the current rightMenuVisible value
   */
  rightMenuStateChange(currentValue: boolean): void {
    if (currentValue) {
      this.rightMenuAnimationState = 'on';
      return;
    }
    this.rightMenuAnimationState = 'off';
  }

  ngOnDestroy() {
    this.viewSwitchListener?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['leftMenuVisible'] &&
      changes['leftMenuVisible'].currentValue !==
        changes['leftMenuVisible'].previousValue
    ) {
      switch (this.viewportService.getCurrentValue()) {
        case ViewState.MEDIUM:
          if (
            changes['leftMenuVisible'].currentValue &&
            this.rightMenuVisible
          ) {
            setTimeout(() => {
              this.rightMenuVisibleChange.emit(false);
            });
          }
          break;
      }
      this.leftMenuStateChange(changes['leftMenuVisible'].currentValue);
    }
    if (
      changes['rightMenuVisible'] &&
      changes['rightMenuVisible'].currentValue !==
        changes['rightMenuVisible'].previousValue
    ) {
      switch (this.viewportService.getCurrentValue()) {
        case ViewState.MEDIUM:
          if (
            changes['rightMenuVisible'].currentValue &&
            this.leftMenuVisible
          ) {
            setTimeout(() => {
              this.leftMenuVisibleChange.emit(false);
            });
          }
          break;
      }
      this.rightMenuStateChange(changes['rightMenuVisible'].currentValue);
    }
  }
}
