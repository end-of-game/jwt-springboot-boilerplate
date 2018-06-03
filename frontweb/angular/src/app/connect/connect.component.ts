import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarContainer
} from '@angular/material';
import { ConnectService } from './connect.service';

import { Connect } from '../models/connect';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css'],
  providers: [MatSnackBar],
  entryComponents: [MatSnackBarContainer]
})
export class ConnectComponent implements OnInit {
  public connect: Connect = new Connect();
  private token = '';
  private error = '';
  private callNoProtectedData: any[] = [];
  private callProtectedData = '';

  constructor(
    private connectService: ConnectService,
    private snackBar: MatSnackBar,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.connectService.connect$.subscribe(res => {
      if (res) {
        this.connect = res;
        this.token = this.connectService.getJwtToken();
      }
    });
  }

  login(value: Connect) {
    event.preventDefault();
    this.connectService
      .login(value.username, value.password)
      .then(data => {
        this.token = this.connectService.getJwtToken();
      })
      .catch(error => {
        this.snackBar.open(error, 'Error', new MatSnackBarConfig());
      });
  }

  logout() {
    this.connectService.logout();
    this.connect = new Connect();
    this.token = '';
    this.callNoProtectedData = [];
    this.callProtectedData = '';
  }

  callNoProtected() {
    this.connectService
      .callNoProtected()
      .then(data => {
        this.callNoProtectedData = data;
        this.callProtectedData = '';
      })
      .catch(error => {
        this.snackBar.open(error, 'Error', new MatSnackBarConfig());
      });
  }

  callProtected() {
    this.connectService
      .callProtected()
      .then(data => {
        this.callProtectedData = data;
        this.callNoProtectedData = [];
      })
      .catch(error => {
        this.snackBar.open(error, 'Error', new MatSnackBarConfig());
      });
  }
}
