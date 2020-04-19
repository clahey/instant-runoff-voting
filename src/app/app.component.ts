import { Component } from "@angular/core";
import {UploaderComponent} from "./uploader/uploader.component";
import { ElectionService, Election } from "./election.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  elections: Election[];
  constructor(
    private electionService: ElectionService,
    public dialog: MatDialog
  ) {
    this.electionService.elections$.subscribe(
      elections => (this.elections = elections)
    );
  }

  addCSV() {
    let dialogRef = this.dialog.open(UploaderComponent);
  }

  addExamples() {
    this.electionService.addElection(
      "Example 1",
      `Bob,Sue,Bill
1,3,2
2,1,3
3,2,1
1,3,2
2,1,3
`
    );
    this.electionService.addElection(
      "Tennessee Capital Election",
      `Memphis,Nashville,Chattanooga,Knoxville
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
1,2,3,4
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,1,2,3
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,1,2
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
4,3,2,1
`
    );
  }
}
