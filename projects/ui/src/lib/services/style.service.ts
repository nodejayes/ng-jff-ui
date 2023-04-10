import { Inject } from '@angular/core';

@Inject({})
export class StyleService {
  get accentSecondColor(): string {
    return 'aqua';
  }

  get baseColor(): string {
    return 'white';
  }

  get baseTextColor(): string {
    return '#000000';
  }

  get accentColor(): string {
    return 'blue';
  }

  get boxShadow(): string {
    return '0 2px 5px #0000004d';
  }

  get buttonStyle() {
    return {
      color: this.baseTextColor,
      hoverColor: this.baseTextColor,
      backgroundColor: this.baseColor,
      hoverBackgroundColor: 'grey',
      padding: '0 15px 0 15px',
      borderWidth: 1,
      borderRadius: 4,
      borderColor: 'rgba(0, 0, 0, 0.12)',
      margin: '8px 8px 8px 0',
    };
  }
}
