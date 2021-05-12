import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ElsoService} from '../elso.service';
import {ListService} from './list.service';

export interface PeriodicElement {
  name: string;
  tank_id: number;
  small_icon: string;
  type: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {tank_id: 1, name: 'Hydrogen', small_icon: 'http://api.worldoftanks.eu/static/2.69.0/wot/encyclopedia/vehicle/small/germany-G02_Hummel.png', type: 'H'},
  {tank_id: 2, name: 'Helium', small_icon: 'http://api.worldoftanks.eu/static/2.69.0/wot/encyclopedia/vehicle/small/germany-G02_Hummel.png', type: 'He'},
  {tank_id: 3, name: 'Lithium', small_icon: 'http://api.worldoftanks.eu/static/2.69.0/wot/encyclopedia/vehicle/small/germany-G02_Hummel.png', type: 'Li'},
  {tank_id: 4, name: 'Beryllium', small_icon: 'http://api.worldoftanks.eu/static/2.69.0/wot/encyclopedia/vehicle/small/germany-G02_Hummel.png', type: 'Be'},
  {tank_id: 5, name: 'Boron', small_icon: 'http://api.worldoftanks.eu/static/2.69.0/wot/encyclopedia/vehicle/small/germany-G02_Hummel.png', type: 'B'}
];


export interface Tanks {
  tank_id: string;
  name: string;
  small_icon: string;
  type: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public json;
  displayedColumns: string[] = ['tank_id', 'name', 'small_icon', 'type'];
  dataSource = ELEMENT_DATA;

  constructor(
    private http: HttpClient,
    public listService: ListService
  ) { }

  ngOnInit(): void {
    this.doRequest('https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tier=10&nation=Germany');
    /*this.doRequest('https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&nation=Germany');*/
   /*this.doRequest('https://api.worldoftanks.eu/wot/account/info/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&account_id=500706953');*/
    /* this.http.get<any>('https://api.worldoftanks.eu/wot/account/info/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&account_id=500706953').subscribe(data => {
      console.log(data.data);
    });*/

  }

  doRequest(url): void {
    this.http.get<any>(url).subscribe(data => {
      console.log(data.data);
      this.listService.data = data.data;
      this.listService.dataString = JSON.stringify(data.data);
      /*for (var i in data.data){
        console.log(this.listService.data[i]['name']);
      }*/

      /*console.log(this.listService.data[6929]['images']['small_icon']);*/
    });
  }
  /*createDataSource(): Tanks[] {
    let results: Tanks[];
    for (let i in this.listService.data){
      console.log(this.listService.data[i].name);
      results.push(i, this.listService.data[i].name, this.listService.data[i].small_icon, this.listService.data[i].type);
  }
  return results;
}*/


}



/*{tank_id: i, name: this.listService.data[i].name, small_icon: this.listService.data[i].small_icon, type: this.listService.data[i].type};*/
