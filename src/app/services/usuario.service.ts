import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  constructor(private http: HttpClient,
    private router: Router)
    {
      this.googleInit()
     }



    googleInit(){
    

    }

  logout() {
    localStorage.removeItem('token');
   
    google.accounts.id.revoke('carlosparedesg1520@gmail.com', ()=>{
       this.router.navigateByUrl('/')
    });

        // google.accounts.id.revoke('carlosparedesg1520@gmail.com', ()=>{

    // });

    // this.auth2 = gapi.auth2.getAuthInstance();
    // this.auth2.signOut().then( () => {
    //   // this.ngZone.run(()=>{
    //     this.router.navigateByUrl('/')
    //   // })
    // });

    

  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp: any) =>{
        localStorage.setItem('token',resp.token)
      }),
      map( resp => true),
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm){
    
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap(( resp: any) => {
        console.log(resp);
        localStorage.setItem('token',resp.token)
      })
    )
  }

  login(formData: any){
    
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap(( resp: any) => {
        console.log(resp);
        localStorage.setItem('token',resp.token)
      })
    )
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
    .pipe(
      tap(( resp: any) => {
        // console.log(resp);
        localStorage.setItem('token',resp.token)
      })
    )
  }
}
