import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ListService} from './list.service';
import { Router } from '@angular/router';

export interface Tanks {
  tank_id: number;
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
  dataSource;

  constructor(
    private http: HttpClient,
    public listService: ListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.doRequest('https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tier=10&nation=Germany');
    /*this.doRequest('https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&nation=Germany');*/
    /*this.doRequest('https://api.worldoftanks.eu/wot/account/info/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&account_id=500706953');*/
    /* this.http.get<any>('https://api.worldoftanks.eu/wot/account/info/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&account_id=500706953').subscribe(data => {
      console.log(data.data);
    });*/

  }

  getRecord(row): void{
    console.log(row['tank_id']);
    this.router.navigateByUrl(`/details/${row['tank_id']}`);


  }

  doRequest(url): void {
    this.http.get<any>(url).subscribe(data => {

      this.listService.data = data.data;
      this.listService.dataString = JSON.stringify(data.data);
      /*for (var i in data.data){
        console.log(this.listService.data[i]['name']);
      }*/

      /*console.log(this.listService.data[6929]['images']['small_icon']);*/
      this.dataSource = this.createDataSource(data.data);
    });
  }
  createDataSource(data): Tanks[] {
    let results: Tanks[] = [{tank_id: 0, name: 'üres', small_icon: 'üres', type: 'üres'}];
    results.shift();
    for (let i in data){
      let tank: Tanks = {tank_id: parseInt(i), name: data[i].name, small_icon: data[i].images.small_icon, type: data[i].type};
      results.push(tank);
      /*results.push({tank_id: parseInt(i), name: data[i]['name'], small_icon: data[i]['images']['small_icon'], type: data[i]['type']});*/
    }
    return results;
  }

}



/*{tank_id: i, name: this.listService.data[i].name, small_icon: this.listService.data[i].small_icon, type: this.listService.data[i].type};*/
