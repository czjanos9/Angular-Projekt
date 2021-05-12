import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  /*totalAngularPackages;*/
  public errorMessage: string;
  public json;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any>('https://api.worldoftanks.eu/wot/account/info/?application_id=7d8440b17a9bc5cbd0f8be1dc99a4fb6&account_id=500706953').subscribe(data => {
      console.log(data.data);
    });
  }

}
