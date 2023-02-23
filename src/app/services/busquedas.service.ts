import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

  const base_ur = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
      'x-token': this.token
      }
    }
  }

  private transformarUsuarios(resultados: any[]) : Usuario[] {

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    )
  }

  private transformarHospital(resultados: any[]) : Hospital[] {

    return resultados
  }
  private transformarMedico(resultados: any[]) : Medico[] {

    return resultados
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_ur}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers)
    .pipe(
      map( (resp: any) => {

        // switch (tipo) {
        //   case 'usuarios':
        //   return this.transformarUsuarios(resp.resultados)

        //   case 'hospitales':
        //   return this.transformarHospital(resp.resultados)
        //   // break

        //   default:
        //     return [];
        // }
        if (tipo == 'usuarios') {
          return this.transformarUsuarios(resp.resultados)
        } else if (tipo == 'hospitales') {
          return this.transformarHospital(resp.resultados)
        }else  if (tipo == 'medicos') {
          return this.transformarMedico(resp.resultados)
        } {
          return [];
        }
      })
    );
  }

  // buscar2(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
  //   const url = `${base_ur}/todo/coleccion/${tipo}/${termino}`;
  //   return this.http.get<any[]>(url, this.headers)
  //   .pipe(
  //     map( (resp: any) => {

  //       switch (tipo) {
  //         case 'hospitales':
  //           console.log(resp.resultados);
            
  //         return this.transformarHospital(resp.resultados)
  //         // break

  //         default:
  //           return [];
  //       }
  //     })
  //   );
  // }



}
