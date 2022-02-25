import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({ providedIn: 'root' })
export class AlertService {

    //Este elemento irá emitir o alerta para todos os componentes escritos nele
    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange: boolean = false;

    //Aqui no construtor utilizamos o router para obter a rota que esta sendo navegada, se é uma rota de início
    //Caso seja, e a variável keepAfterRouteChange seja true, então voltamos ela para false apenas, caso contrário,
    //chamamos o método clear que apaga o objeto de alert passando um valor nulo, com isso teremos a mensagem de alert apenas no componente que estão sendo utilizado.
    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        })
    }

    success(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    //Os componentes que quiserem emitir uma mensagem, terão que chamar o método alert()
    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject.next(new Alert(alertType, message));
    }

    /*
    O componente que quiser receber a notificação e ser atualizado, chamará o método getAlert e ficará "ouvindo"
    */
    getAlert() {
        return this.alertSubject.asObservable();
    }

    clear() {
        this.alertSubject.next(null);
    }
}