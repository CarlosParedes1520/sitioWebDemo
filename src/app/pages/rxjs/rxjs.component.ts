import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval,take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs!: Subscription;
  constructor(){
   this.intervalSubs = this.retornaObservabol()
    .subscribe((valor) => console.log(valor))
    //  this.retornaObservable().pipe(
    //   retry()
    //  )
    //  .subscribe(
    //   valor => console.log('Subs: '+valor),
    //   err => console.warn('Error', err),
    //   () => console.info('obs fin')
    //   );
  }
  ngOnDestroy(): void {
   this.intervalSubs.unsubscribe();
  }


  retornaObservabol():Observable<number>{
    const interval$ = interval(100)
    .pipe(
      map(valor =>  valor+1),
      filter(valor => (valor %2 === 0)? true: false),
      take(10),
      );
    return interval$ 
  }

 retornaObservable():Observable<number>{
  let i = -1;
  const obs$ = new Observable<number>(observer => {
    
  
    const intervalo = setInterval(()=>{
    i++;

      observer.next(i);

      if (i === 4) {
        clearInterval(intervalo);
        observer.complete();
      }
      if (i === 2) {
        
        observer.error('i llego al valor de 2')
      }
     

    },1000)
  });

  return obs$;
 }
  
}
