import { Component, Input, OnInit } from '@angular/core';
import { Election } from "../election.service"

@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css']
})
export class ElectionComponent implements OnInit {
  @Input() election: Election;

  constructor() { }

  ngOnInit() {
  }

}