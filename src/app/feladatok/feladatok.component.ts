import { Component, OnInit } from '@angular/core';
import { BaseService } from '../services/base.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { timeInterval } from 'rxjs';

interface MegoldasokInter { id: number, interviewee: string, task_number: number, solution: string };
interface KarakterekInter { id: number, name: string, hair_color: string, height: string, hianyzo: boolean };
interface BolygokInter { id: number, name: string, terrain: string, films: string, hianyzo: boolean };
interface FajokInter { id: number, name: string, average_lifespan: string, films: string };
interface JarmuvekHajokInter { id: number, name: string, manufacturer: string, max_atmosphering_speed: string, type: string };

export interface MegoldasKuld {
  interviewee: string;
  task_number: number;
  solution: string;
}

@Component({
  selector: 'app-feladatok',
  templateUrl: './feladatok.component.html',
  styleUrls: ['./feladatok.component.scss']
})
export class FeladatokComponent implements OnInit {
  Megoldasok: Array<MegoldasokInter> = [];
  Karakterek: Array<KarakterekInter> = [];
  Bolygok: Array<BolygokInter> = [];
  Fajok: Array<FajokInter> = [];
  HajokJarmuvek: Array<JarmuvekHajokInter> = [];
  JarmuAlap: Array<JarmuvekHajokInter> = [];
  KarakterekUnknown: Array<KarakterekInter> = [];
  BolygokUnknown: Array<BolygokInter> = [];
  OsszesFilmDarab: number = 0;

  BonuszFeladatTomb: any = [];
  BonuszToroltTalalat: number = 0;

  tablazat1zaroIndex: number = 10;
  tablazat2zaroIndex: number = 10;
  tablazat3zaroIndex: number = 10;
  tablazat4zaroIndex: number = 10;
  tablazat5zaroIndex: number = 5;
  tablazat6zaroIndex: number = 5;

  megOldasKuld: MegoldasKuld = {
    interviewee: "Verók Attila",
    task_number: 0,
    solution: "",
  }

  elsoFeladatMegoldva: any = { id: 0, task_number: 0 };
  masodikFeladatMegoldva: any = { id: 0, task_number: 0 };
  harmadikFeladatMegoldva: any = { id: 0, task_number: 0 };
  negyedikFeladatMegoldva: any = { id: 0, task_number: 0 };
  otodikFeladatMegoldva: any = { id: 0, task_number: 0 };
  hatodikFeladatMegoldva: any = { id: 0, task_number: 0 };

  constructor(public base: BaseService, private snackBar: MatSnackBar) {
    this.base.oldalcimEvent.emit('Feladatok');
    this.base.aktivKomponens = "feladatok";
  }

  ngOnInit(): void {
    this.filmek_darabszam_lekeres();
    this.karakterek_lekeres();
    this.bolygok_lekeres();
    this.karakterek_unknown_lekeres();
    this.bolygok_unknown_lekeres();
    this.fajok_lekeres();
    this.jarmuvek_lekeres();
    this.hajok_lekeres();
    this.bonusz_feladat_lekeresek();
    setTimeout(() => {
      this.megoldasok_lekeres();
    }, 300);
  }

  megoldasok_lekeres() {
    this.base.getFeladatMegoldasok().subscribe(
      list => {
        this.Megoldasok = list;
        this.Megoldasok.forEach((megoldas: any) => {
          if (megoldas.task_number == 1) {
            this.elsoFeladatMegoldva.id = megoldas.id;
            this.elsoFeladatMegoldva.task_number = megoldas.task_number;
            this.megoldas('elso_feladat');
          }
          if (megoldas.task_number == 3) {
            this.harmadikFeladatMegoldva.id = megoldas.id;
            this.harmadikFeladatMegoldva.task_number = megoldas.task_number;
            this.megoldas('harmadik_feladat');
          }
          if (megoldas.task_number == 4) {
            this.negyedikFeladatMegoldva.id = megoldas.id;
            this.negyedikFeladatMegoldva.task_number = megoldas.task_number;
            this.megoldas('negyedik_feladat');
          }
          if (megoldas.task_number == 5) {
            this.otodikFeladatMegoldva.id = megoldas.id;
            this.otodikFeladatMegoldva.task_number = megoldas.task_number;
            this.megoldas('otodik_feladat');
          }
          if (megoldas.task_number == 6) {
            this.hatodikFeladatMegoldva.id = megoldas.id;
            this.hatodikFeladatMegoldva.task_number = megoldas.task_number;
            this.megoldas('hatodik_feladat');
          }
        });
      });
  }

  bonusz_feladat_lekeresek() {
    this.base.getFilmek().subscribe(
      list => {
        list.forEach((elem: any) => {
          this.BonuszFeladatTomb.push(elem);
        });
      });
    this.base.getCharacters().subscribe(
      list => {
        list.forEach((elem: any) => {
          this.BonuszFeladatTomb.push(elem);
        });
      });
    this.base.getPlanets().subscribe(
      list => {
        list.forEach((elem: any) => {
          this.BonuszFeladatTomb.push(elem);
        });
      });
    this.base.getSpecies().subscribe(
      list => {
        list.forEach((elem: any) => {
          this.BonuszFeladatTomb.push(elem);
        });
      });
    this.base.getStarships().subscribe(
      list => {
        list.forEach((elem: any) => {
          this.BonuszFeladatTomb.push(elem);
        });
      });
    this.base.getVehicles().subscribe(
      list => {
        list.forEach((elem: any) => {
          this.BonuszFeladatTomb.push(elem);
        });
      });
  }

  filmek_darabszam_lekeres() {
    this.base.getFilmek().subscribe(
      list => {
        this.OsszesFilmDarab = list.length
      });
  }

  karakterek_lekeres() {
    this.base.getCharacters().subscribe(
      list => {
        this.Karakterek = list;
      });
  }

  karakterek_unknown_lekeres() {
    this.base.getCharacters().subscribe(
      list => {
        this.KarakterekUnknown = list;
        this.KarakterekUnknown.forEach((karakter: any) => {
          if (
            karakter.birth_year != "unknown" &&
            karakter.eye_color != "unknown" &&
            karakter.films != "unknown" &&
            karakter.gender != "unknown" &&
            karakter.hair_color != "unknown" &&
            karakter.height != "unknown" &&
            karakter.homeworld != "unknown" &&
            karakter.id != "unknown" &&
            karakter.mass != "unknown" &&
            karakter.name != "unknown" &&
            karakter.skin_color != "unknown" &&
            karakter.species != "unknown" &&
            karakter.starships != "unknown" &&
            karakter.url != "unknown" &&
            karakter.vehicles != "unknown"
          ) {
            karakter.hianyzo = false;
          } else {
            karakter.hianyzo = true;
          }
        });
      });
  }

  bolygok_lekeres() {
    this.base.getPlanets().subscribe(
      list => {
        this.Bolygok = list;
        this.Bolygok.forEach((bolygo: any) => {
          bolygo.films = bolygo.films.split(",");
        });
      });
  }

  bolygok_unknown_lekeres() {
    this.base.getPlanets().subscribe(
      list => {
        this.BolygokUnknown = list;
        this.BolygokUnknown.forEach((bolygo: any) => {
          if (
            bolygo.climate != "unknown" &&
            bolygo.diameter != "unknown" &&
            bolygo.films != "unknown" &&
            bolygo.gravity != "unknown" &&
            bolygo.id != "unknown" &&
            bolygo.name != "unknown" &&
            bolygo.orbital_period != "unknown" &&
            bolygo.population != "unknown" &&
            bolygo.residents != "unknown" &&
            bolygo.rotation_period != "unknown" &&
            bolygo.surface_water != "unknown" &&
            bolygo.terrain != "unknown" &&
            bolygo.url != "unknown"
          ) {
            bolygo.hianyzo = false;
          } else {
            bolygo.hianyzo = true;
          }
        });
      });
  }

  fajok_lekeres() {
    this.base.getSpecies().subscribe(
      list => {
        this.Fajok = list;
        this.Fajok.forEach((faj: any) => {
          faj.films = faj.films.split(",");
        });
      });
  }

  jarmuvek_lekeres() {
    this.base.getVehicles().subscribe(
      list => {
        list.forEach((hajojarmu: any) => {
          this.HajokJarmuvek.push({
            id: hajojarmu.id,
            name: hajojarmu.name,
            manufacturer: hajojarmu.manufacturer,
            max_atmosphering_speed: hajojarmu.max_atmosphering_speed,
            type: "vehicle"
          })
          this.JarmuAlap.push({
            id: hajojarmu.id,
            name: hajojarmu.name,
            manufacturer: hajojarmu.manufacturer,
            max_atmosphering_speed: hajojarmu.max_atmosphering_speed,
            type: "vehicle"
          })
        });
      });
  }

  hajok_lekeres() {
    this.base.getStarships().subscribe(
      list => {
        list.forEach((hajojarmu: any) => {
          this.HajokJarmuvek.push({
            id: hajojarmu.id,
            name: hajojarmu.name,
            manufacturer: hajojarmu.manufacturer,
            max_atmosphering_speed: hajojarmu.max_atmosphering_speed,
            type: "starship"
          })
        });
      });
  }


  tobbet_mutat(melyik: string) {
    if (melyik == 'elso_feladat') {
      this.tablazat1zaroIndex = this.tablazat1zaroIndex + 10;
    }
    if (melyik == 'masodik_feladat') {
      this.tablazat2zaroIndex = this.tablazat2zaroIndex + 10;
    }
    if (melyik == 'harmadik_feladat') {
      this.tablazat3zaroIndex = this.tablazat3zaroIndex + 10;
    }
    if (melyik == 'negyedik_feladat') {
      this.tablazat4zaroIndex = this.tablazat4zaroIndex + 10;
    }
    if (melyik == 'otodik_elso_feladat') {
      this.tablazat5zaroIndex = this.tablazat5zaroIndex + 5;
    }
    if (melyik == 'otodik_masodik_feladat') {
      this.tablazat6zaroIndex = this.tablazat6zaroIndex + 5;
    }
  }

  megoldas(melyik: string) {
    if (melyik == 'elso_feladat') {
      let eredmeny: any = [];
      this.Karakterek.sort(function (a: any, b: any) {
        return parseFloat(a.height) - parseFloat(b.height);
      });
      this.Karakterek = this.Karakterek.filter(x => x.hair_color == 'blond');
      eredmeny.push(this.Karakterek[this.Karakterek.length - 1]);
      this.Karakterek = eredmeny;
      if (this.elsoFeladatMegoldva.id == 0) {
        this.feladat_megoldas_kuld(1, this.Karakterek[0].name);
      }
    }
    if (melyik == 'masodik_feladat') {
      this.Bolygok = this.Bolygok.filter(x => x.films.length == this.OsszesFilmDarab && x.terrain.includes("mountain"));
    }
    if (melyik == 'harmadik_feladat') {
      this.Fajok = this.Fajok.filter(x => x.films.length == this.OsszesFilmDarab && x.average_lifespan != 'unknown' && x.average_lifespan != 'indefinite');
      if (this.harmadikFeladatMegoldva.id == 0) {
        this.feladat_megoldas_kuld(3, this.Fajok[0].name);
      }
    }
    if (melyik == 'negyedik_feladat') {
      let eredmenyHajo: any = [];
      let eredmenyJamu: any = [];
      this.HajokJarmuvek = this.HajokJarmuvek.filter(x => x.manufacturer == "Kuat Drive Yards" && x.type == 'starship');
      this.HajokJarmuvek.sort(function (a: any, b: any) {
        return parseFloat(a.max_atmosphering_speed) - parseFloat(b.max_atmosphering_speed);
      });
      eredmenyHajo.push(this.HajokJarmuvek[this.HajokJarmuvek.length - 1]);
      this.HajokJarmuvek = [];
      this.HajokJarmuvek.push(eredmenyHajo[0]);

      this.JarmuAlap = this.JarmuAlap.filter(x => x.manufacturer == "Kuat Drive Yards");
      this.JarmuAlap.sort(function (a: any, b: any) {
        return parseFloat(a.max_atmosphering_speed) - parseFloat(b.max_atmosphering_speed);
      });
      eredmenyJamu.push(this.JarmuAlap[this.JarmuAlap.length - 1]);
      this.JarmuAlap = [];
      this.HajokJarmuvek.push(eredmenyJamu[0]);
      if (this.negyedikFeladatMegoldva.id == 0) {
        this.feladat_megoldas_kuld(4, "Csillaghajó: " + this.HajokJarmuvek[0].name + " | Jármű: " + this.HajokJarmuvek[1].name);
      }
    }
    if (melyik == 'otodik_feladat') {
      let bolygok: any = [];
      let karakterek: any = [];
      this.BolygokUnknown = this.BolygokUnknown.filter(x => x.hianyzo == false);
      this.BolygokUnknown.forEach((bolygo: any) => {
        bolygok.push(bolygo.name)
      });
      this.KarakterekUnknown = this.KarakterekUnknown.filter(x => x.hianyzo == false);
      this.KarakterekUnknown.forEach((karakter: any) => {
        karakterek.push(karakter.name)
      });
      if (this.otodikFeladatMegoldva.id == 0) {
        this.feladat_megoldas_kuld(5, "Peoples: " + karakterek.join(",") + " | Planets: " + bolygok.join(","));
      }
    }
    if(melyik == 'hatodik_feladat'){
      this.BonuszFeladatTomb.forEach((bonusz: any) => {
      for(let k in bonusz){
        if(bonusz[k] == 'unknown' || bonusz[k] == '' || bonusz[k] == 'n/a' || bonusz[k] == 'N/A'){
          delete bonusz[k];
          ++this.BonuszToroltTalalat
        }
      }
      });
      if (this.hatodikFeladatMegoldva.id == 0) {
        this.feladat_megoldas_kuld(6, String(this.BonuszToroltTalalat));
      }
    }
  }


  feladat_megoldas_kuld(sorszam: number, megoldas: string) {
    let eredmeny: any;
    let data: any = this.megOldasKuld;
    data['task_number'] = Number(sorszam);
    data['solution'] = megoldas;
    this.base.postFeladatMegoldas(data).subscribe(
      list => {
        eredmeny = list;
        if (sorszam == 1) {
          this.elsoFeladatMegoldva.id = Number(eredmeny['id']);
          this.elsoFeladatMegoldva.task_number = 1;
        }
        if (sorszam == 3) {
          this.harmadikFeladatMegoldva.id = Number(eredmeny['id']);
          this.harmadikFeladatMegoldva.task_number = 3;
        }
        if (sorszam == 4) {
          this.negyedikFeladatMegoldva.id = Number(eredmeny['id']);
          this.negyedikFeladatMegoldva.task_number = 4;
        }
        if (sorszam == 5) {
          this.otodikFeladatMegoldva.id = Number(eredmeny['id']);
          this.otodikFeladatMegoldva.task_number = 5;
        }
        if (sorszam == 6) {
          this.hatodikFeladatMegoldva.id = Number(eredmeny['id']);
          this.hatodikFeladatMegoldva.task_number = 6;
        }
        this.openSnackBar("A megoldás elküldve!", "");
      },
      error => {
        console.log(error);
        this.openSnackBar("A küldés sikertelen!", "", "snackbarstilus_sikertelen");
      }
    )
  }

  megoldas_torles(id: number, sorszam: number) {
    if (sorszam == 1) {
      this.Karakterek = [];
      this.karakterek_lekeres();
      this.elsoFeladatMegoldva.id = 0;
      this.elsoFeladatMegoldva.task_number = 0;
      this.tablazat1zaroIndex = 10;
    }
    if (sorszam == 3) {
      this.Fajok = [];
      this.fajok_lekeres();
      this.harmadikFeladatMegoldva.id = 0;
      this.harmadikFeladatMegoldva.task_number = 0;
      this.tablazat3zaroIndex = 10;
    }
    if (sorszam == 4) {
      this.HajokJarmuvek = [];
      this.JarmuAlap = [];
      this.jarmuvek_lekeres();
      this.hajok_lekeres();
      this.negyedikFeladatMegoldva.id = 0;
      this.negyedikFeladatMegoldva.task_number = 0;
      this.tablazat4zaroIndex = 10;
    }
    if (sorszam == 5) {
      this.BolygokUnknown = [];
      this.KarakterekUnknown = [];
      this.bolygok_unknown_lekeres();
      this.karakterek_unknown_lekeres();
      this.otodikFeladatMegoldva.id = 0;
      this.otodikFeladatMegoldva.task_number = 0;
      this.tablazat5zaroIndex = 5;
      this.tablazat6zaroIndex = 5;
    }
    if (sorszam == 6) {
      this.BonuszFeladatTomb = [];
      this.BonuszToroltTalalat = 0;
      this.bonusz_feladat_lekeresek();
      this.hatodikFeladatMegoldva.id = 0;
      this.hatodikFeladatMegoldva.task_number = 0;
    }
    this.base.deleteFeladatMegolas(id).subscribe(
      data => {
        this.openSnackBar("Sikeres törlés!", "");
      },
      error => {
        console.log(error);
        this.openSnackBar("A törlés sikertelen!", "", "snackbarstilus_sikertelen");
      }
    )
  }

  teszt(){
    console.log(this.BonuszFeladatTomb);
  }

  openSnackBar(message: string, action: string, stilus: string = "snackbarstilus") {
    this.snackBar.open(message, action, {
      duration: 1600,
      panelClass: stilus
    });
  }

}
