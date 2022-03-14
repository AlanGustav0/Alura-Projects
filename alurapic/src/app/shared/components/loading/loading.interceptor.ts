import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LoadingService } from "./loading.service";

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    /*
    Aqui temos um interceptor que fica atento a todos os eventos de Http, caso seja uma resposta, ele chama o serviço stoped e não apresenta o loading, caso seja uma requisição ao backend, então ele chamará o serviço start e inicia o loading.
    */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(tap(event => {
                if (event instanceof HttpResponse) {
                    this.loadingService.stoped();
                } else {
                    this.loadingService.start();
                }
            }));
    }
}