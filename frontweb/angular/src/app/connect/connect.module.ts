import { SharedModule } from '../shared/shared.module';

import {
  MatToolbarModule,
  MatToolbarRow,
  MatToolbar,
  MatInputModule,
  MatCardModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectComponent } from './connect.component';
import { FormsModule } from '@angular/forms';
import { ConnectService } from './connect.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    OverlayModule,
    MatSnackBarModule
  ],
  declarations: [ConnectComponent],
  exports: [ConnectComponent],
  providers: [ConnectService]
})
export class ConnectModule {}
