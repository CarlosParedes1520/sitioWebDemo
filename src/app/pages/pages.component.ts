import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from 'src/app/services/sidebar.service';


// declare function customInicial():any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit{
  
  constructor(private settingsService: SettingsService,
    private sidebarService:SidebarService ){

  }


  ngOnInit(): void {
    // customInicial();
    this.sidebarService.cargarMenu();
  }

}
