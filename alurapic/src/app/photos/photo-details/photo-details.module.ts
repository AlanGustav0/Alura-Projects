import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DarkenOnHoverModule } from "src/app/shared/directives/darken-on-hover/darken-on-hover.module";
import { PhotoFormModule } from "../photo-form/photo-form.module";
import { PhotoModule } from "../photo/photo.module";
import { PhotoDetailsComponent } from "./photo-details.component";

@NgModule({
    declarations: [PhotoDetailsComponent],
    imports: [CommonModule, PhotoModule, PhotoFormModule, DarkenOnHoverModule],
    exports: [PhotoDetailsComponent]
})
export class PhotoDetailsModule { }