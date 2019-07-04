import { AutenticacaoGuard } from './guards/autenticacao.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', loadChildren: './menu/menu.module#MenuPageModule', canActivate: [AutenticacaoGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'modal-similar', loadChildren: './modal-similar/modal-similar.module#ModalSimilarPageModule' },
  { path: 'mapa', loadChildren: './mapa/mapa.module#MapaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
