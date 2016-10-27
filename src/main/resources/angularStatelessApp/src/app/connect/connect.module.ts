import { MaterialModule } from '@angular/material';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from './connect.component';
import { FormsModule }        from '@angular/forms';
import { ConnectService }     from './connect.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule.forRoot()
  ],
  declarations: [ConnectComponent],
  exports: [ ConnectComponent ],
  providers: [ConnectService]
})
export class ConnectModule { }
