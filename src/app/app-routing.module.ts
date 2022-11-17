import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeladatokComponent } from './feladatok/feladatok.component';
import { FilmComponent } from './film/film.component';
import { FilmekComponent } from './filmek/filmek.component';

const routes: Routes = [
  { path: '', component: FilmekComponent },
  { path: 'film/:id', component: FilmComponent },
  { path: 'feladatok', component: FeladatokComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
