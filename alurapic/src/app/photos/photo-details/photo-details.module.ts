import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { VMessageModule } from "src/app/shared/components/vmessage/vmessage.module";
import { DarkenOnHoverModule } from "src/app/shared/directives/darken-on-hover/darken-on-hover.module";
import { PhotoFormModule } from "../photo-form/photo-form.module";
import { PhotoModule } from "../photo/photo.module";
import { PhotoCommentsComponent } from "./photo-comments/photo-comments.component";
import { PhotoDetailsComponent } from "./photo-details.component";

@NgModule({
    declarations: [PhotoDetailsComponent, PhotoCommentsComponent],
    imports: [CommonModule, PhotoModule, PhotoFormModule, DarkenOnHoverModule,RouterModule,ReactiveFormsModule,VMessageModule],
    exports: [PhotoDetailsComponent, PhotoCommentsComponent]
})
export class PhotoDetailsModule { }