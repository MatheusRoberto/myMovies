import { AutenticacaoGuard } from './../guards/autenticacao.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  { path: '', redirectTo: '/menu/home', pathMatch: 'full', canActivate: [AutenticacaoGuard] },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'top-rated',
        loadChildren: '../top-rated/top-rated.module#TopRatedPageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'movie-card',
        loadChildren: '../movie-card/movie-card.module#MovieCardPageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'login',
        loadChildren: '../login/login.module#LoginPageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'assistir',
        loadChildren: '../assistir/assistir.module#AssistirPageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'assistido',
        loadChildren: '../assistido/assistido.module#AssistidoPageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'buscar',
        loadChildren: '../buscar/buscar.module#BuscarPageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'comming',
        loadChildren: '../comming/comming.module#CommingPageModule',
        canActivate: [AutenticacaoGuard]
      },
      {
        path: 'similar',
        loadChildren: '../similar/similar.module#SimilarPageModule',
        canActivate: [AutenticacaoGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
