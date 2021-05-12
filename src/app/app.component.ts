import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ElsoService} from './elso.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Projekt';
  valtozom = 'SDFSDF';
  valtozo2 = 'fgdhgfd';

  constructor(
    private router: Router,
    public elsoService: ElsoService
  ) {
  }

  navigate(): void{
    this.router.navigate(['details', 'valami']);
  }

  fuggvenyem(): void {
    this.valtozom = 'DFSSDFDSFDS';
    this.valtozo2 = 'PPPP';
    this.elsoService.adatom = '++++';
  }
}


