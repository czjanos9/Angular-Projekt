import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ElsoService} from '../elso.service';

@Component({
  selector: 'app-sub-child-routing',
  templateUrl: './sub-child-routing.component.html',
  styleUrls: ['./sub-child-routing.component.css']
})
export class SubChildRoutingComponent implements OnInit {

  id: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public elsoService: ElsoService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
    });
  }

}
