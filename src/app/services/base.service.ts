import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  oldalcimEvent = new EventEmitter<any>();
  aktivKomponens: string = "";

  server: string = "http://localhost/";
  serverTMDB: string = "https://api.themoviedb.org/3/search/movie"
  serverFilmekUrl: string = this.server + "films/";
  serverKarakterekUrl: string = this.server + "peoples/";
  serverBolygokUrl: string = this.server + "planets/";
  serverFajokUrl: string = this.server + "species/";
  serverHajokUrl: string = this.server + "starships/";
  serverJarmuvekUrl: string = this.server + "vehicles/";
  serverSolutionsUrl: string = this.server + "solutions"

  constructor(private http: HttpClient) {
  }

  getData(url: string, httpparams?: any): Observable<any> {
    let httpheaders = {
      'Content-Type': 'application/json'
    }
    if (httpparams) {
      return this.http.get(url, { headers: httpheaders, params: httpparams });
    } else {
      return this.http.get(url, { headers: httpheaders });
    }
  };

  postData(url: string, data: any): Observable<any> {
    let httpheaders = {
      'Content-Type': 'application/json',
    };
    return this.http.post(url, data, { headers: httpheaders });
  };

  deleteData(url: string, id: any): Observable<any> {
    let httpheaders = {
      'Content-Type': 'application/json'
    };
    return this.http.delete(url + id, { headers: httpheaders });
  };

  //Filmek
  //----------------------------------
  getFilmek(): Observable<any> {
    return this.getData(this.serverFilmekUrl + "get-films");
  }
  //Filmfotók lekerés
  getFilmFotok(filmcim: string): Observable<any> {
    let params = { "api_key": "110b9b1f3e634171edad0f45c5ffe52a", "language": "en-US", "query": filmcim };
    return this.getData(this.serverTMDB, params);
  }
  //Film
  getFilm(id: number): Observable<any> {
    return this.getData(this.serverFilmekUrl + id);
  }
  //Film karakterek
  getFilmCharacter(url: string): Observable<any> {
    if (url.includes('https://swapi.dev/api/people')) {
      url = url.replace('https://swapi.dev/api/people/', this.serverKarakterekUrl);
    }
    return this.getData(url.substring(0, url.length - 1));
  }
  //Film karakterek
  getFilmCharacterSpecies(url: string): Observable<any> {
    if (url.includes('https://swapi.dev/api/species')) {
      url = url.replace('https://swapi.dev/api/species/', this.serverFajokUrl);
    }
    return this.getData(url.substring(0, url.length - 1));
  }
  //Film karakterek filmjei
  getFilmCharacterFilms(url: string): Observable<any> {
    if (url.includes('https://swapi.dev/api/films')) {
      url = url.replace('https://swapi.dev/api/films/', this.serverFilmekUrl);
    }
    return this.getData(url.substring(0, url.length - 1));
  }
  //Film bolygok
  getFilmPlanet(url: string): Observable<any> {
    if (url.includes('https://swapi.dev/api/planets')) {
      url = url.replace('https://swapi.dev/api/planets/', this.serverBolygokUrl);
    }
    return this.getData(url.substring(0, url.length - 1));
  }
  //Film fajok
  getFilmSpecies(url: string): Observable<any> {
    if (url.includes('https://swapi.dev/api/species')) {
      url = url.replace('https://swapi.dev/api/species/', this.serverFajokUrl);
    }
    return this.getData(url.substring(0, url.length - 1));
  }
  //Film hajók
  getFilmStarships(url: string): Observable<any> {
    if (url.includes('https://swapi.dev/api/starships')) {
      url = url.replace('https://swapi.dev/api/starships/', this.serverHajokUrl);
    }
    return this.getData(url.substring(0, url.length - 1));
  }
  //Film járművek
  getFilmVehicles(url: string): Observable<any> {
    if (url.includes('https://swapi.dev/api/vehicles')) {
      url = url.replace('https://swapi.dev/api/vehicles/', this.serverJarmuvekUrl);
    }
    return this.getData(url.substring(0, url.length - 1));
  }
  //----------------------------------
  
  
  //Feladat
  getCharacters(): Observable<any> {
    return this.getData(this.serverKarakterekUrl + "get-peoples");
  }
  getPlanets(): Observable<any> {
    return this.getData(this.serverBolygokUrl + "get-planets");
  }
  getSpecies(): Observable<any> {
    return this.getData(this.serverFajokUrl + "get-species");
  }
  getStarships(): Observable<any> {
    return this.getData(this.serverHajokUrl + "get-starships");
  }
  getVehicles(): Observable<any> {
    return this.getData(this.serverJarmuvekUrl + "get-vehicles");
  }

  //Megoldások
  getFeladatMegoldasok(): Observable<any> {
    return this.getData(this.serverSolutionsUrl + "/get-films");
  }

  postFeladatMegoldas(data: any): Observable<Object> {
    return this.postData(this.serverSolutionsUrl, data);
  }

  deleteFeladatMegolas(id: number): Observable<Object> {
    return this.deleteData(this.serverSolutionsUrl + "/", id);
  }

}
