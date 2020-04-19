import { Component, OnInit, ViewChild, Renderer2 } from "@angular/core";
import { FileReaderService } from "../file-reader.service";
import { ElectionService, Election } from "../election.service";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.css"]
})
export class UploaderComponent implements OnInit {
  selectedFiles: FileList = null;

  constructor(
    private dialogRef: MatDialogRef<UploaderComponent>,
    private fileReaderService: FileReaderService,
    private electionService: ElectionService,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {}

  onFileChange(e) {
    this.selectedFiles = e.target.files;
    this.renderer.selectRootElement('#ok').focus();
  }

  onCancel() {
    this.dialogRef.close();
  }

  async addElections() {
    const csvs: string[] = [];
    for (const file of this.selectedFiles) {
      const reader = new FileReader();
      reader.onload;
      reader.readAsText(file);
      this.electionService.addElection(
        file.name,
        await this.fileReaderService.readFileAsync(file)
      );
    }
    this.dialogRef.close();
  }
}
