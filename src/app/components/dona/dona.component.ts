import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  @Input() ventas : string ="sin titulo";


 @Input() public  title: string[] = [ 'Ventas', 'Gastos', 'Mercaderia' ];
 @Input()  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.title,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: ["red", "green", "blue"]
      
      },
     
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
