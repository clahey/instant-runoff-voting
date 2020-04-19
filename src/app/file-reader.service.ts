import { Injectable } from "@angular/core";

@Injectable()
export class FileReaderService {
  constructor() {}

  readFileAsync(file):Promise<string> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;

      reader.readAsText(file);
    });
  }
}
