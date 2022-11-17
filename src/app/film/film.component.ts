import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from '../services/base.service';



@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})


export class FilmComponent implements OnInit {
  film_id: number = 0;
  Film: any = {};
  filmekMegkerkeztek: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, public base: BaseService) { 
    this.route.params.subscribe((data) => {
      if (data['id']) {
        this.film_id = data['id'];
      }
    })
    this.base.aktivKomponens = "film";
  }

  ngOnInit(): void {
    this.base.getFilm(this.film_id).subscribe(
      list => { 
        this.Film = list;
        this.base.getFilmFotok(this.Film.title).subscribe(
          list => { 
            this.Film.coverLink = "http://image.tmdb.org/t/p/w500/" + list.results[0].backdrop_path;
          });
        this.base.oldalcimEvent.emit(this.Film.title);
        this.karakterek_lekeres();
    });
  }

  karakterek_lekeres(){
    let Characters: any = [];
    this.Film.characters = this.Film.characters.split(",");
    this.Film.characters.forEach((character: any) => {
      this.base.getFilmCharacter(character).subscribe(
        list => { 
          Characters.push(list);
          this.Film.characters = Characters;
        },
        err => {
        },
        );
      });
      setTimeout(() => {
      this.karakter_faj_lekeres();
      this.karakter_filmek_lekeres();
    }, 300);
  }

  karakter_faj_lekeres(){
    this.Film.characters.forEach((character: any) => {
      this.base.getFilmCharacterSpecies(character.species).subscribe(
        list => { 
          if(list)
          character.species = list.name;
        },
        err => {
        },
      );
    });
  }

  karakter_filmek_lekeres(){
    this.Film.characters.forEach((character: any) => {
      let Films: any[] = [];
      character.films = character.films.split(",");
      character.films.forEach((film: any) => {
        this.base.getFilmCharacterFilms(film).subscribe(
          list => { 
            Films.push(list);
            character.films = Films;
            this.filmekMegkerkeztek = true;
          },
          err => {
          },);
      });
      });
  }

  vissza_a_filemkhez(){
    this.router.navigate(['/']);
  }

}
