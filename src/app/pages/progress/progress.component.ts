import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  valor: number = 5;
  valor2: number = 55;

  get getProgres1() {
    return `${this.valor}%`
  }

  get getProgres2() {
    return `${this.valor2}%`
  }
 
  cambioValorHijo(valor: number) {
    console.log(valor);
    this.valor = valor;
  }

  cambioValorHijo2(valor: number) {
    console.log(valor);
    this.valor2 = valor;
  }
}
