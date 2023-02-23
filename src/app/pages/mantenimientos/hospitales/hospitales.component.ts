import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit , OnDestroy{

 nombreActual="";
  public hospital: Hospital[] = [];
  public hospitalTempo: Hospital[] = [];
  public cargando: boolean= true;
  public imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService,
    private modalImagenService:ModalImagenService,
    private busquedasService:BusquedasService) {

  }

  ngOnDestroy(): void {
     this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales()

     this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(200)
    )
    .subscribe(img => {
      // this.cargarHospitales();
      this.cargarHospitales();
      
    })
  }


  cargarHospitales(){
     this.cargando = true;
    this.hospitalService.cargarHospitales()
    .subscribe((res: any)  => {
      console.log(res)
      this.cargando = false
      this.hospital= res
      this.hospitalTempo = res;
    })
  }
  

  guardarCambios(hospital: Hospital, nom :any){

    
    this.hospitalService.actualizarHospitales(hospital._id!, nom.value)
    .subscribe((res)  => {

      Swal.fire('Actualizando', nom.value, 'success');
      console.log(res);

    });
    // this.nombreActual!.nativeElement = ""
  }
  

  eliminarHospital(hospital: Hospital){
    this.hospitalService.borrarHospitales(hospital._id!)
    .subscribe((res: any)  => {
     Swal.fire('Borrado', hospital.nombre, 'success');
    });
    
  }

  async abrirSweerAlert() {

    const {value=""} = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Ingrese  el nombre del hospital ',
      showCancelButton: true,

    })

    if (value!.trim().length > 0) {
      this.hospitalService.crearHospitales(value!)
      .subscribe((resp: any) => {
        this.hospital.push(resp.hospital)
      })
    }
    console.log(value);
    

  }

  abrirModal(hospital: Hospital){
    console.log(hospital);
    this.modalImagenService.abrirModal('hospitales', hospital._id+"",  hospital.img)
  }


  buscar(termino: string) {
    if (termino.length === 0) {
       this.hospital = this.hospitalTempo;
    }else{
      this.busquedasService.buscar('hospitales',termino)
      .subscribe(resp => {
        this.hospital = resp;
      })
    }
  }
}
