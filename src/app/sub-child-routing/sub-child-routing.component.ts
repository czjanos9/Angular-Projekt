import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sub-child-routing',
  templateUrl: './sub-child-routing.component.html',
  styleUrls: ['./sub-child-routing.component.css']
})
export class SubChildRoutingComponent implements OnInit {

  id: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.id = param['id'];
    });
  }

}
