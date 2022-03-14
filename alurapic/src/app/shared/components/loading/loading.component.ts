import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Component({
    selector:'ap-loading',
    templateUrl:'./loading.component.html',
    styleUrls:['./loading.component.css']
})
export class LoadingComponent implements OnInit{

    //O Observable que é do tipo string que é utilizado na ngClass, fazendo o async pipe e obtendo o valor deste observable
    loading$:Observable<String>;


    constructor(private loadingService:LoadingService){}


    ngOnInit(): void {

        //Aqui a variável loading recebe o valor do método getLoading, que retorna um observable, porém fazemos um map e através do valueof, obtemos o valor que está contido no observable.
        this.loading$ = this.loadingService.getLoading()
        .pipe(map(loadingType => loadingType.valueOf()));
    }
}