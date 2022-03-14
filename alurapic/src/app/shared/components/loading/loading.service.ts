import { Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from './loading-type';


@Injectable({providedIn:'root'})
export class LoadingService{

    //Aqui temos um subject que é resposnável por receber e enviar as alterações e emitir para outros componentes essas alterações
    loadingSubject = new Subject<LoadingType>();

    //Aqui criamos o método que obtem o loading, por padrão ele inicia em stoped
    getLoading() {
        return this.loadingSubject.asObservable()
        .pipe(startWith(LoadingType.STOPPED));
    }

    //aqui o método que inicia o loading, passando a enum "loading"
    start(){
        this.loadingSubject.next(LoadingType.LOADING);
    }

    //aqui o método que inicia o loading, passando a enum "stopped"
    stoped(){
        this.loadingSubject.next(LoadingType.STOPPED);
    }
 }


