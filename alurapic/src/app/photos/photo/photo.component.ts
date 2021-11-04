import { Component, Input } from "@angular/core";

const CLOUD = "http://localhost:3000/imgs/";

@Component({
  selector: "ap-photo",
  templateUrl: "photo.component.html",
})
export class PhotoComponent {
  private _url = "";
  @Input() description = "";

  //Aqui fizemos uma inbound property para um setter, e fizemos uma lógica para verificar se é uma imagem física iniciada com "data" ou uma imagem em formato base64
  @Input() set url(url: string) {
    if (!url.startsWith("data")) {
      this._url = CLOUD + url;
    } else {
      this._url = url;
    }
  }

  get url() {
    return this._url;
  }
}
