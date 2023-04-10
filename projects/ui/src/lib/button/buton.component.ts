import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { StyleService } from '../services/style.service';

@Component({
  selector: 'jff-button',
  templateUrl: 'buton.component.html',
  styleUrls: ['buton.component.css'],
  standalone: true,
  providers: [StyleService],
})
export class ButtonComponent {
  @Input()
  height = 30;
  @Input()
  width = 0;
  @Output()
  onClick = new EventEmitter<never>();
  cursor = 'pointer';
  hover = false;
  private styleService = inject(StyleService);
  @Input()
  textColor = this.styleService.buttonStyle.color;
  @Input()
  backgroundColor = this.styleService.buttonStyle.backgroundColor;
  @Input()
  margin = this.styleService.buttonStyle.margin;
  @Input()
  borderRadius = this.styleService.buttonStyle.borderRadius;
  @Input()
  borderWidth = this.styleService.buttonStyle.borderWidth;
  @Input()
  borderColor = this.styleService.buttonStyle.borderColor;
  @Input()
  hoverBackgroundColor = this.styleService.buttonStyle.hoverBackgroundColor;
  @Input()
  hoverTextColor = this.styleService.buttonStyle.hoverColor;
}
