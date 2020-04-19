import { Component, OnInit, Input} from '@angular/core';
import { Round } from '../election.service';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.css']
})
export class RoundComponent implements OnInit {

  @Input() round: Round;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}