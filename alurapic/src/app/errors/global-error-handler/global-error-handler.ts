import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { C } from "@angular/core/src/render3";
import { Router } from "@angular/router";
import { UserService } from "src/app/core/user/user.service";
import { environment } from "src/environments/environment";
import * as Stacktrace from 'stacktrace-js';
import { ServerLogService } from "./server-log.service";

/*
    Criamos um global error handler para documentar todos os erros da aplicação em um único local e posteriormente tratá-los da melhor forma. Ou seja, quando o navegador lançar um error, ele será direcionado aqui para o nosso Global handler para serem gerados logs desses erros.
*/
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) { }

    handleError(error: any): void {
        /*
        Não é interessante injetarmos artefatos no constructor do nosso Global Errorhandler, pois o angular primeiro criará instâncias dessas dependências para depois injetá-las e, se algum erro acontecer durante a injeção nosso ErrorHandler não será capaz de tratá-lo. Nesse sentido, o ideal é injetar os artefatos no método.
        */
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        //Porém a única implementação  que nos interessa é a do 'PathLocationStrategy', por este motivo fazemos esta verificação, fazemos isso para obter a rota que foi acessada no momento do erro
        const url = location instanceof PathLocationStrategy
            ? location.path()
            : '';

        //Obtendo a mensagem do erro
        const message = error.message ? error.message : error.toString();

        if(environment.production) router.navigate(['/error']);

        Stacktrace.fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames.map(sf => sf.toString()).join('\n');

                //Enviando os dados do log para o servidor
                serverLogService.log({
                    message, url, userName: userService.getUserName(),
                    stack: stackAsString
                }
                ).subscribe(
                    () => {
                        console.log('Error logged on server');
                    },
                    err => {
                        console.log(err)
                        console.log('Fail to send error log to server');
                    }
                )
            })
    }
}