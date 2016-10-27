import { Injectable } from '@angular/core';

import 'rxjs/Rx';

import { Http, Response, Headers } from '@angular/http';

import { Connect } from './shared/connect';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class ConnectService {

  private TOKEN_KEY: string = "jwtToken";
  private BASE_URL: string = "";//http://localhost:8081";

  // Observable string Sources
  private _connectSource: BehaviorSubject<Connect> = new BehaviorSubject<Connect>(new Connect());
  // Observable string streams
  public connect$: Observable<Connect> = this._connectSource.asObservable();

  private _headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});

  constructor(private http: Http) {
    if(this.getJwtToken()) {
      this._headers.append('authorization', this.getJwtToken());
      this.getUserInformation();
    }
  }
  
  private getUserInformation(): void {  
    this.http.get(this.BASE_URL + '/user',  {headers: this._headers})
      .map(res => res.json())
      .subscribe(
        data => {
          this._connectSource.next(new Connect(data.username, '', data.email, data.authorities));
        },
        err => { console.log(err) }
      );
  }
  
  public callNoProtected(): Promise<any> {;
    return this.http.get(this.BASE_URL + '/persons', {headers: this._headers})
      .map(res => res.json())
      .toPromise();
     
  }
  
  public callProtected(): Promise<any> {
    return this.http.get(this.BASE_URL + '/protected', {headers: this._headers})
      .map(res => res.text() )
      .toPromise();    
  }

  public getJwtToken(): string {
      return localStorage.getItem(this.TOKEN_KEY);
  }

  private setJwtToken(token): void {
      localStorage.setItem(this.TOKEN_KEY, token);
  }

  private removeJwtToken(): void {
      localStorage.removeItem(this.TOKEN_KEY);
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
          this.http.post(this.BASE_URL + '/auth', JSON.stringify({username, password}), {headers: this._headers})
          .map(res => res.json())
          .subscribe(
            data => {
              this.setJwtToken(data.token);
              this._headers = new Headers({'Content-Type': 'application/json;', 'authorization': data.token});
              this.getUserInformation();
              resolve(true)
            },
            err => { reject(err); console.log(err) }
          );
        
      });


  }

  logout() {
      this.removeJwtToken();
  }

}
