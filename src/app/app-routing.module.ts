import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages-routing.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: '**', 
    component: NopagefoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    // PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
