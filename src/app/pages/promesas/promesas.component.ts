import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {
  ngOnInit(): void {
  //   const promesa = new Promise((resolve, reject)=>{
  //     if (true) {
  //        resolve('hola mundo');
  //     }else{
  //       reject('salio mal algo!!!')
  //     }
  //   });
  //  promesa.then((mensaje) => console.log(mensaje))
  //  .catch((error)=>console.log(error))
  //   console.log('q pedo');
    

    this.getUsuarios().then(usuario => {
      console.log(usuario);
      
    }).catch((error => console.log('noooo'+error)))
  }

  getUsuarios() {

    const promesa = new Promise((resolve, reject ) =>{
      fetch('https://reqres.in/api/users')
      .then((res) => res.json() )
      .then((data) => resolve(data.data))
      .catch((error => reject(error)))
    })

    return promesa
    
  }

   




}
