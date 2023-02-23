import { Component } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicosService } from 'src/app/services/medicos.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent {

  nombreActual="";
  public medico: Medico[] = [];
  public medicoTempo: Medico[] = [];
  public cargando: boolean= true;
  public imgSubs!: Subscription;

  constructor(private modalImagenService:ModalImagenService,
    private busquedasService:BusquedasService, 
    private medicoService: MedicosService
    ) {

  }

  
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
 }

 ngOnInit(): void {
   this.cargarMedicos()

    this.imgSubs = this.modalImagenService.nuevaImagen
   .pipe(
     delay(200)
   )
   .subscribe(img => {
     // this.cargarHospitales();
     this.cargarMedicos();
     
   })
 }


 cargarMedicos(){
    this.cargando = true;
   this.medicoService.cargarMedicos()
   .subscribe((res: any)  => {
     console.log(res)
     this.cargando = false
     this.medico= res
     this.medicoTempo = res;
   })
 }
 

 guardarCambios(medico: Medico, nom :any){/////////////

   
   this.medicoService.actualizarMedicos(medico)
   .subscribe((res)  => {

     Swal.fire('Actualizando', nom.value, 'success');
     console.log(res);

   });
   // this.nombreActual!.nativeElement = ""
 }
 

 eliminarMedico(medico: Medico){
   this.medicoService.borrarMedicos(medico._id!)
   .subscribe((res: any)  => {
    Swal.fire('Borrado', medico.nombre, 'success');
    this.cargarMedicos();
   });
   
 }

 async abrirSweerAlert() {

   const {value=""} = await Swal.fire<string>({
     title: 'Crear Medico',
     text: 'Ingrese el nombre del medico',
     input: 'text',
    //  input: 'text',
    //  input: 'text',
     inputPlaceholder: 'Ingrese  el nombre del hospital ',
     showCancelButton: true,

   })

   if (value!.trim().length > 0) {
    //  this.medicoService.crearMedicos(value!)
    //  .subscribe((resp: any) => {
    //    this.medico.push(resp.hospital)
    //  })
   }
   console.log(value);
   

 }

 abrirModal(medico: Medico){
   console.log(medico);
   this.modalImagenService.abrirModal('medicos', medico._id+"",  medico.img)
 }


 buscar(termino: string) {
   if (termino.length === 0) {
      this.medico = this.medicoTempo;
   }else{
     this.busquedasService.buscar('medicos',termino)
     .subscribe(resp => {
       this.medico = resp;
     })
   }
 }
}
