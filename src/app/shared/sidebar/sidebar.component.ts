import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public usuario!: Usuario;
  menuItems!: any[];

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuarioService) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario; 
  }
}
