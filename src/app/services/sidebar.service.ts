import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any [] = [
    {
      titulo: 'Dashboard P',
      icono: 'mdi mdi-guage',
      submenu: [
        {
          titulo: 'Main',
          url: '/dashboard'
        },
        {
          titulo: 'ProgressBar',
          url: '/dashboard/progress'
        },
        {
          titulo: 'Graficas',
          url: '/dashboard/grafica1'
        },
        {
          titulo: 'Promesas',
          url: '/dashboard/promesas'
        },
        {
          titulo: 'Rxjs',
          url: '/dashboard/rxjs'
        }
      ]
    },
  ];

  constructor() { }
}
