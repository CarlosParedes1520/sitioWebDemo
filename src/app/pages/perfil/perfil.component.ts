import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent  implements OnInit{

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp!: any;


  constructor(
    private fb: FormBuilder, 
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService){
      this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre , Validators.required],
      email: [this.usuario.email , [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil(){
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(() =>{
        const {nombre, email} = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'Cambios fueron guardados', 'success')
      },(error)=>{
        console.log(error.error.msg);
        Swal.fire('Error', error.error.msg, 'error')
      })
    
  }


  cambiarImagen(file: File): any{
    console.log( file);
    this.imagenSubir = file;

    if (!file) {
      // return this.imgTemp = null ;
      return
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend= () => {
      this.imgTemp = reader.result;
      console.log(reader.result);
    }
  }
//archivo: File, tipo: 'usuarios',id: string
  subirImagen() {
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', JSON.stringify(this.usuario.uid) )
    .then(img => {
      this.usuario.img = img
      Swal.fire('La imagen se subio correctamente', 'Cambios fueron guardados', 'success')
    }).catch( (error)=>{
      console.log(error.error.msg);
      Swal.fire('Error', 'No se pudo subir la img', 'error')
    })
  }

}
