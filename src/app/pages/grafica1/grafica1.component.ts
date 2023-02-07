import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

  titulo1: string = 'grafica de prueba v-1';
  titulo2: string = 'grafica de prueba v-2';
  titulo3: string = 'grafica de prueba v-3';
  
  graficaTitulos: string[] = [ 'Ventas-v1', 'Gastos-v1', 'Mercaderia-v1' ];
  graficaTitulos2: string[] = [ 'Ventas-v2', 'Gastos-v2', 'Mercaderia-v2' ];
  graficaTitulos3: string[] = [ 'Ventas-v3', 'Gastos-v3', 'Mercaderia-v3' ];


  public ChartData ={
    labels: this.graficaTitulos,
    datasets: [
      { data: [ 50, 150, 100 ],
        backgroundColor: ["yellow", "green", "pink"]
      
      },
     
    ]
  };
  public ChartData2 ={
    labels: this.graficaTitulos2,
    datasets: [
      { data: [ 200, 10, 50 ],
        backgroundColor: ["blue", "orange", "blak"]
      
      },
     
    ]
  };
  public ChartData3 ={
    labels: this.graficaTitulos3,
    datasets: [
      { data: [ 50, 50, 100 ],
        backgroundColor: ["red", "yellow", "blue"]
      
      },
     
    ]
  };
}
