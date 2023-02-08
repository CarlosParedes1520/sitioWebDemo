import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {    
    const color = localStorage.getItem('colorWeb') || './assets/css/colors/green'
     this.linkTheme?.setAttribute('href', color)

  }

  changeTheme(theme: string){
    this.linkTheme?.setAttribute('href', `./assets/css/colors/${theme}.css`)
    localStorage.setItem('colorWeb', `./assets/css/colors/${theme}.css`);
    this.checkSelecionadoTema()
  }

  checkSelecionadoTema(){
    const link = document.querySelectorAll('.selector');

    link.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
    
  }

}
