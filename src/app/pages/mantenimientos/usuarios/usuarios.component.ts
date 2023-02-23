import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { CargarUsuario } from '../../../interfaces/cargar-usuarios.interfaces';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenComponent } from '../../../components/modal-imagen/modal-imagen.component';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent  implements OnInit, OnDestroy{

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTempo: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;


  constructor( private usuariosService: UsuarioService,
    private busquedasService:BusquedasService,
    private modalImagenService:ModalImagenService) {
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario() ;
   
    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(img => this.cargarUsuario())
  }
  
  cargarUsuario() {
    this.cargando = true;
    this.usuariosService.cargarUusarios(this.desde)
    .subscribe(({total, usuarios}) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTempo = usuarios;
      this.cargando = false;

      
    })
  }

  cambiarPagina(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    }else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor; 
    }

    console.log(this.desde);
    
    // if (this.desde < 0) {
    //   this.desde = 0;
    // }
    this.cargarUsuario() ;
  }


  buscar(termino: string) {
    if (termino.length === 0) {
       this.usuarios = this.usuariosTempo;
    }else{
      this.busquedasService.buscar('usuarios',termino)
      .subscribe((resp:any) => {
        this.usuarios = resp;
      })
    }
  }

  eliminarUsuario(usuario: Usuario){
    
    if (usuario.uid === this.usuariosService.uid) {
       Swal.fire('Error','No puede borrar ese usuario, esta en uso')
    }else{
      Swal.fire({
        title: 'Borar usuario?',
        text: `Esta a punto de borrar a ${usuario.nombre}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrarlo!'
      }).then((result) => {
        if (result.value) {
          this.usuariosService.eliminarUsuario(usuario)
          .subscribe(resp => {
            this.cargarUsuario()
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
          })
        }
      })
    }
  }

  cambiarRole(usuario: Usuario){

    this.usuariosService.guardarUsuario(usuario)
    .subscribe( resp => {
      console.log(resp);

      
    })
    
  }

  abrirModal(usuario: Usuario){
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid+"",  usuario.img)
  }

}
