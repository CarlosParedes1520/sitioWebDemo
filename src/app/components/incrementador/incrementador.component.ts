import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit{
  ngOnInit(): void {
   this.btnClass = `btn ${this.btnClass}`
  }

  @Input('valorSS') progreso: number = 55;
  @Input() btnClass: string = 'btn-primary';
  @Output('valorSalidaSS') valorSalida: EventEmitter<number> = new EventEmitter();
 
  cambiarValor(valor: number) {

   this.progreso = this.progreso + valor;
   if (this.progreso < 0 ) {
    this.valorSalida.emit(0)
     this.progreso = 0;
   }
 
   if (this.progreso > 100 ) {
    this.valorSalida.emit(100)
     this.progreso = 100;
   }
 
   this.valorSalida.emit(this.progreso)
 
  }

  onChange(valor: number){
    console.log(valor);
    if (valor >= 100) {
      this.progreso  = 100;
    } else if (valor <= 0) {
      this.progreso  = 0;
    }else{
      this.progreso = valor
    }
 
    this.valorSalida.emit(this.progreso )
  }
}
