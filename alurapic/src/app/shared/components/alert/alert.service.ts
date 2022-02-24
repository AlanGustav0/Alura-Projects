import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Alert, AlertType } from "./alert";

@Injectable({providedIn:'root'})
export class AlertService{

    //Este elemento irá emitir o alerta para todos os componentes escritos nele
    alertSubject:Subject<Alert> = new Subject<Alert>();


    success(message:string){
        this.alert(AlertType.SUCCESS,message);
    }

    warning(message:string){
        this.alert(AlertType.WARNING,message);
    }

    danger(message:string){
        this.alert(AlertType.DANGER,message);
    }

    info(message:string){
        this.alert(AlertType.INFO,message);
    }

    //Os componentes que quiserem emitir uma mensagem, terão que chamar o método alert()
    private alert(alertType:AlertType,message:string){
        this.alertSubject.next(new Alert(alertType,message));
    }

    /*
    O componente que quiser receber a notificação e ser atualizado, chamará o método getAlert e ficará "ouvindo"
    */
    getAlert(){
        return this.alertSubject.asObservable();
    }
}