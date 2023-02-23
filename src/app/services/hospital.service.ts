import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private  http: HttpClient) { }
  
  get token(): string {
    return localStorage.getItem('token') || '';
   }

   
   get headers() {
    return { headers: {
      'x-token': this.token
    }}
   }

   cargarHospitales(): any {
    // http://localhost:3005/api/usuarios?desde=0
    const url = `${base_url}/hospitales`;
    return this.http.get<Hospital[]>(url, this.headers)
           .pipe(
            map( (resp:any) => resp.hospitales)
           )

  }

   crearHospitales(nombre: string){
    // http://localhost:3005/api/usuarios?desde=0
    const url = `${base_url}/hospitales`;
    return this.http.post(url,{nombre}, this.headers)
  }


  //  {email: string, nombre: string, role: string}
   actualizarHospitales( _id: string, nombre: string){
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.put(url,{nombre}, this.headers)
  }

   borrarHospitales( _id: string){
    // http://localhost:3005/api/usuarios?desde=0
    const url = `${base_url}/hospitales/${_id}`;
    return this.http.delete(url, this.headers)
  }


 
}
