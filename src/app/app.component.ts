import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  oldal_cim: string = "Összes film"
  constructor(public base: BaseService, private router: Router){
    this.base.oldalcimEvent.subscribe(
      (data: any) => {
        this.oldal_cim = data;
      }
    )
  }

  tovabb_a_komponensre(hova: string){
    this.router.navigate([hova]);
  }

}
