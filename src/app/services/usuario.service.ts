import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!:Usuario ;

  constructor(private http: HttpClient,
    private router: Router)
    {
      this.googleInit()
     }


     get token(): string {
      return localStorage.getItem('token') || '';
     }

     get uid() {
      return this.usuario.uid || ''
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
   
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) =>{
        console.log(resp);
        // desestructurar la data img='' === valor x defecto
        const { email, google, nombre, role, img='', uid } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', img, google, role, uid )
        


        localStorage.setItem('token',resp.token);
        return true;        
      }),
     
      catchError(error => {
        console.log(error);
        return of(false);
      })
    )
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string}){
    
    data = {
      ...data,
      role: this.usuario.role+""
    }
    
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    });
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
