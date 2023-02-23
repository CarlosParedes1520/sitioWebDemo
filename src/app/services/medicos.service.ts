import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medico } from '../models/medico.model';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  constructor(private  http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
   }

   
   get headers() {
    return { headers: {
      'x-token': this.token
    }}
   }

   cargarMedicos(): any {
    // http://localhost:3005/api/usuarios?desde=0
    const url = `${base_url}/medicos`;
    return this.http.get<Medico[]>(url, this.headers)
           .pipe(
            map( (resp:any) => resp.medicos)
           )

  }

  obtenerMedicoPorId(id: string){
    const url = `${base_url}/medicos/${id}`; 
    return this.http.get<Medico>(url, this.headers)
      //      .pipe(
      //         map( (resp:any) =>{ 
      // console.log(resp);
      
      //         resp
      //         })
      //      )
  }

   crearMedicos(medico: {nombre: string, hospital: string}){
    // http://localhost:3005/api/usuarios?desde=0
    const url = `${base_url}/medicos`;
    return this.http.post(url,medico, this.headers)
  }


  //  {email: string, nombre: string, role: string}
   actualizarMedicos( medico: Medico){
    console.log(medico);
    
    const url = `${base_url}/medicos/${medico._id}`;
    return this.http.put(url,medico, this.headers)
  }

   borrarMedicos( _id: string){
    // http://localhost:3005/api/usuarios?desde=0
    const url = `${base_url}/medicos/${_id}`;
    return this.http.delete(url, this.headers)
  }
}
