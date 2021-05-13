import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  small_icon: string;
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
    small_icon: ''
  };

  allTank;
  displayedColumns: string[] = ['nation', 'tier', 'name', 'big_icon', 'type', 'description', 'armor', 'gun_name'];
  dataSource;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
    });
    this.allTank = JSON.parse(localStorage.getItem('AllVehicles'));
    for(let i in this.allTank){
      if(i === this.id) {
        this.currTank = this.createDataSource(this.allTank[this.id]);
        localStorage.setItem('CurrentVehicle', JSON.stringify(this.currTank));
      }
    }
  }

  /*doRequest(url, id): void {
    this.http.get<any>(url).subscribe(data => {
      this.currTank = this.createDataSource(data.data[id]);
      localStorage.setItem('CurrentVehicle', JSON.stringify(this.currTank));
      let localData: JSON = JSON.parse(localStorage.getItem('AllVehicles'));
      let updatedData = [];
      updatedData.push(localData);
      updatedData.push(this.currTank);
      console.log(updatedData);

      localStorage.setItem('AllVehicles', JSON.stringify(updatedData));



    });
  }*/

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

    if(this.validateCurrentVehicle()) {
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
    else {
      alert('Nincs minden mező megfelelően kitöltve!');
    }
  }

  deleteCurrentVehicle(): void {
    localStorage.setItem('CurrentVehicle', JSON.stringify(this.currTank));

    let localData: JSON = JSON.parse(localStorage.getItem('AllVehicles'));
    delete localData[this.currTank['tank_id']];

    localStorage.setItem('AllVehicles', JSON.stringify(localData));
    alert('Sikeres törlés!');
    this.router.navigate(['list']);

  }

  createVehicle(): void{
    localStorage.setItem('CurrentVehicle', JSON.stringify(this.currTank));
    let prevId = this.id;

    this.currTank['tank_id'] = Math.round(Math.random() * (2147 - 1) + 1);
    this.allTank = JSON.parse(localStorage.getItem('AllVehicles'));
    this.id = this.currTank['tank_id'].toString();


    for(let i in this.allTank){
      if(i === this.id) {
        alert('Van ilyen azonosító!');
        return;
      }

      if(this.validateCurrentVehicle()){
        let localData: JSON = JSON.parse(localStorage.getItem('AllVehicles'));
        localData[this.id] = {
          tank_id: this.id,
          name: this.currTank['name'],
          nation: this.currTank['nation'],
          type: this.currTank['type'],
          tier: this.currTank['tier'],
          description: this.currTank['description'],
          images: {small_icon: this.currTank['small_icon'],
            big_icon: this.currTank['big_icon']},
          default_profile: {gun: {name: this.currTank['gun_name']},
            armor: {hull: {front: localData[prevId]['default_profile']['armor']['hull']['front'],
                sides: localData[prevId]['default_profile']['armor']['hull']['sides'],
                rear: localData[prevId]['default_profile']['armor']['hull']['rear']}}}
        };
        localStorage.setItem('AllVehicles', JSON.stringify(localData));
        alert('Sikeres hozzáadás!');
        return;
      }
      else {
        alert('Nincs minden mező megfelelően kitöltve!');
        return;
      }
    }
  }

  validateCurrentVehicle(): boolean{
    if(this.currTank['name'] === '' || this.currTank['nation'] === '' || this.currTank['type'] === '' || this.currTank['tier'] === '' ||
      this.currTank['description'] === '' || this.currTank['gun_name'] === '')
    {
      console.log('validation:notok');
      return false;
    }
    console.log('validation:ok');
    return true;
  }

}


/*this.doRequest(`https://api.worldoftanks.eu/wot/encyclopedia/vehicles/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&tank_id=${this.id}`, this.id);*/
