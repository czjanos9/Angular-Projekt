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
    gun_name: 'data[default_profile][gun][name]',
  };

  allTank;
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
    //this.doRequest(`https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tank_id=${this.id}`, this.id);
    this.allTank = JSON.parse(localStorage.getItem('AllVehicles'));
    for(let i in this.allTank){
      if(i === this.id) {
        this.currTank = this.createDataSource(this.allTank[this.id]);
      }
      else {
        //this.doRequest(`https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tank_id=${this.id}`, this.id);

      }
    }
  }

  doRequest(url, id): void {
    this.http.get<any>(url).subscribe(data => {
      /*this.currTank.shift();
      this.currTank.push(this.createDataSource(data.data[id]));
      this.dataSource = this.currTank;*/
      this.currTank = this.createDataSource(data.data[id]);
      localStorage.setItem('CurrentVehicle', JSON.stringify(this.currTank));
      let localData: JSON = JSON.parse(localStorage.getItem('AllVehicles'));
      let updatedData = [];
      updatedData.push(localData);
      updatedData.push(this.currTank);
      console.log(updatedData);

      localStorage.setItem('AllVehicles', JSON.stringify(updatedData));



    });
  }

  getCurrentTank()
  {

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
                gun_name: data['default_profile']['gun']['name'],
                small_icon: data['images']['small_icon']
    };
    return tank;
  }

  updateCurrentVehicle(): void{
    localStorage.setItem('CurrentVehicle', JSON.stringify(this.currTank));

    let localData: JSON = JSON.parse(localStorage.getItem('AllVehicles'));
    localData[this.currTank['tank_id']]['name'] = this.currTank['name'];
    localData[this.currTank['tank_id']]['nation'] = this.currTank['nation'];
    localData[this.currTank['tank_id']]['type'] = this.currTank['type'];
    localData[this.currTank['tank_id']]['tier'] = this.currTank['tier'];
    localData[this.currTank['tank_id']]['description'] = this.currTank['description'];
    localData[this.currTank['tank_id']]['default_profile']['gun']['name'] = this.currTank['gun_name'];

    localStorage.setItem('AllVehicles', JSON.stringify(localData));
    alert('Sikeres szerkesztés!');
    return;
  }

}


/*https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tank_id=19217*/
