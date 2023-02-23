import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicosService } from 'src/app/services/medicos.service';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent  implements OnInit{
  
  public medicoForm!: FormGroup;
  public hospital : Hospital[]= [];
  public medicoSeleccionado!: Medico;
  public hospitalSeleccionado? : Hospital ;


  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicosService,
              private router: Router,
              private activateRoute: ActivatedRoute){

  }
  
  ngOnInit(): void {
    this.activateRoute.params.subscribe(({id}) => {
          // console.log(id);
      
      this.cargarMedico(id);
    })

    
   
    // 
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
    .subscribe((hospitalId)=>{
     
      this.hospitalSeleccionado = this.hospital.find(h => h._id === hospitalId )
      console.log(this.hospitalSeleccionado);
      
    })
  }

  cargarMedico(id: string){
    console.log(id);

    try {
      if (id !== 'nuevo' ) {
      this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
      .subscribe(({medico}: any)=> {

        if (!medico) {
           this.router.navigateByUrl(`/dashboard/medicos`)
        }
        this.medicoSeleccionado = medico;
        console.log(this.medicoSeleccionado);
        
          this.medicoForm.controls['nombre'].setValue(medico.nombre)
          this.medicoForm.controls['hospital'].setValue(medico.hospital?._id)
      })
    }
    } catch (error) {
      console.log('error '+error);
      
    }
    
    
  }

  cargarHospitales(){

    this.hospitalService.cargarHospitales()
      .subscribe((hospital: Hospital[]) => {
        console.log(hospital);
        this.hospital = hospital;
        
      })
    
  }

  guardarMedico(){

    console.log(this.medicoSeleccionado);
    const {nombre} = this.medicoForm.value;
    if (this.medicoSeleccionado) {
      // actualizar

      const data: Medico = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
       this.medicoService.actualizarMedicos(data)
       .subscribe(resp => {
        Swal.fire('Actualizado', `${nombre} Actualizado correctamente`, 'success')
       
       })
    }else{
      // crear 
     
      this.medicoService.crearMedicos(this.medicoForm.value)
      .subscribe( (resp: any) => {
        console.log(resp);
        Swal.fire('Creado', `${nombre} creado correctamente`, 'success')
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })
    }

    

    
    
    
  }

}
