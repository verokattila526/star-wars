import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filmek',
  templateUrl: './filmek.component.html',
  styleUrls: ['./filmek.component.scss']
})
export class FilmekComponent implements OnInit {
  Filmek: any = [];
  constructor(public base: BaseService, private router: Router) { 
    this.base.oldalcimEvent.emit('Összes film');
    this.base.aktivKomponens = "filmek";
  }

  ngOnInit(): void {
    this.filmek_lekeres();
  }

  filmek_lekeres(){
    this.base.getFilmek().subscribe(
      list => { 
        this.Filmek = list;
        this.Filmek.forEach((film: any) => {
            this.base.getFilmFotok(film.title).subscribe(
              list => { 
                film.coverLink = "http://image.tmdb.org/t/p/w500/" + list.results[0].backdrop_path;
              });
            });
          });
  }

  film_kivalaszt(id: number){
    this.router.navigate(['/film/' + id]);
  }

}
