import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Tanks} from '../list/list.component';

export interface Tank {
  tank_id: number;
  name: string;
  big_icon: string;
  tier: string;
  type: string;
  description: string;
  nation: string;
  gun_name: string;
  armor: string;
}

@Component({
  selector: 'app-tank-details',
  templateUrl: './tank-details.component.html',
  styleUrls: ['./tank-details.component.css']
})
export class TankDetailsComponent implements OnInit {

  id: string;
  currTank: Tank = {
    tank_id: 0,
    nation: 'data[nation]',
    name: 'data[name]',
    big_icon: '',
    type: 'data[type]',
    tier: 'data[tier]',
    description: 'data[description]',
    armor: '0mm/0mm/0mm',
    gun_name: 'data[default_profile][gun][name]'
  };
  //displayedColumns: string[] = ['tank_id', 'nation', 'tier', 'name', 'big_icon', 'type', 'description', 'armor', 'gun_name'];
  displayedColumns: string[] = ['nation', 'tier', 'name', 'big_icon', 'type', 'description', 'armor', 'gun_name'];
  dataSource;


  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
    });
    this.doRequest(`https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tank_id=${this.id}`, this.id);
  }

  doRequest(url, id): void {
    this.http.get<any>(url).subscribe(data => {
      /*this.currTank.shift();
      this.currTank.push(this.createDataSource(data.data[id]));
      this.dataSource = this.currTank;*/
      this.currTank = this.createDataSource(data.data[id]);
    });
  }

  createDataSource(data): Tank {
    let tank = {
                tank_id: data['tank_id'],
                nation: data['nation'],
                name: data['name'],
                big_icon: data['images']['big_icon'],
                type: data['type'],
                tier: data['tier'],
                description: data['description'],
                armor: `${data['default_profile']['armor']['hull']['front']}mm/${data['default_profile']['armor']['hull']['sides']}mm/${data['default_profile']['armor']['hull']['rear']}mm`,
                gun_name: data['default_profile']['gun']['name']
    };
    return tank;
  }

}


/*https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tank_id=19217*/
