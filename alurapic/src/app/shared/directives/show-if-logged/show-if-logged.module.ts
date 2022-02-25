import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShowInfLoggedDirect } from "./show-if-logged.directs";

@NgModule({
    declarations:[ShowInfLoggedDirect],
    exports:[ShowInfLoggedDirect],
    imports:[CommonModule]
})
export class ShowIfLoggedModule{}