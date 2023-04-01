import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuIconComponent } from '../../projects/ui/src/lib/icon/menu.icon.component';
import { CloseIconComponent } from '../../projects/ui/src/lib/icon/close.icon.component';
import { AppLayoutComponent } from '../../projects/ui/src/lib/app-layout/app.layout.component';
import { SimpleChatComponent } from './components/simple.chat.component';
import { ScreenLockerComponent } from '../../projects/ui/src/lib/screen-locker/screen.locker.component';
import { MenuComponent } from '../../projects/ui/src/lib/menu/menu.component';

@NgModule({
  declarations: [AppComponent, SimpleChatComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MenuIconComponent,
    CloseIconComponent,
    AppLayoutComponent,
    ScreenLockerComponent,
    MenuComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
