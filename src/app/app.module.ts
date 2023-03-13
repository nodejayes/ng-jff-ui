import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuIconComponent } from '../../projects/ui/src/lib/icon/menu.icon.component';
import { CloseIconComponent } from '../../projects/ui/src/lib/icon/close.icon.component';
import { AppLayoutComponent } from '../../projects/ui/src/lib/app-layout/app.layout.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MenuIconComponent,
    CloseIconComponent,
    AppLayoutComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
