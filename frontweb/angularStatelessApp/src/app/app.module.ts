import './rxjs-extensions';

import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ConnectModule } from './connect/connect.module';
import { ConnectComponent } from './connect/connect.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FormsModule,
    HttpModule,
    ConnectModule
  ],
   exports: [ ConnectComponent, FormsModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
