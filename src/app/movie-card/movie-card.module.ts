import { ModalSimilarPage } from './../modal-similar/modal-similar.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MovieCardPage } from './movie-card.page';

const routes: Routes = [
  {
    path: '',
    component: MovieCardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MovieCardPage, ModalSimilarPage],
  entryComponents: [ModalSimilarPage]
})
export class MovieCardPageModule {}
