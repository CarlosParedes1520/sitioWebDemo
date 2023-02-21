import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent {

  public usuario!: Usuario;
  public imagenSubir!: File;
  public imgTemp!: any;

  constructor(public modalImagenService: ModalImagenService,
    public fileUploadService:FileUploadService ) {

  }

  cerrarModal() {
    this.imgTemp = null;
   this.modalImagenService.cerrarModal();
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

  subirImagen() {
    
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
    .actualizarFoto(this.imagenSubir, tipo ,id )
    .then(img => {
      Swal.fire('La imagen se subio correctamente', 'Cambios fueron guardados', 'success')
      // cambio de foto se actualiza instantaneamente
      this.modalImagenService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch( (error)=>{
      console.log(error.error.msg);
      Swal.fire('Error', 'No se pudo subir la img', 'error')
    })
  }
}
