import { Component, Input, OnInit } from '@angular/core';
import {ElsoService} from '../elso.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {



  @Input() inputValtozo;
  constructor() { }

  ngOnInit(): void {
  }


}
