import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent implements OnDestroy{

  titulo: string = ''
  tituloSubs$! : Subscription;

  constructor(private router: Router){
    this.tituloSubs$ = this.getArgumentosRuta().subscribe(({titulo})=>{
                        this.titulo = titulo;
                        document.title = titulo
                        console.log(this.titulo );
                      
   });
  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event:any) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data),

    )
    
  }
}
