import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";

import { AppComponent } from "./app.component";
import { ElectionService } from "./election.service";
import { UploaderComponent } from "./uploader/uploader.component";
import { FileReaderService } from "./file-reader.service";
import { ElectionComponent } from "./election/election.component";
import { RoundComponent } from "./round/round.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    UploaderComponent,
    ElectionComponent,
    RoundComponent
  ],
  entryComponents: [
    UploaderComponent
  ],
  bootstrap: [AppComponent],
  providers: [ElectionService, FileReaderService]
})
export class AppModule {}
