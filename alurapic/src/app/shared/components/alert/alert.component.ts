import { Component, Input } from "@angular/core";
import { Alert, AlertType } from "./alert";
import { AlertService } from "./alert.service";

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html',
})
export class AlertComponent {

    @Input() timeout = 3000;
    alerts: Alert[] = [];

    //No construtor utilizamos o serviço que foi criado para obter o alerta, caso não haja nenhum,
    //retorna a ação. Caso haja, inserimos no array de alertas que foi criado. 
    //Posteriormente este alerta será removido da lista e há um timeout de 3 segundos para que esta ção aconteça
    constructor(private alertService: AlertService) {
        this.alertService.getAlert()
            .subscribe(alert => {
                if (!alert) {
                    this.alerts = [];
                    return;
                }
                this.alerts.push(alert);
                setTimeout(() => this.removeAlert(alert), this.timeout);
            });
    }

    //método para remover os alertas
    removeAlert(alertToRemove: Alert) {
        this.alerts = this.alerts.filter(alert => alert != alertToRemove);
    }


    //Método para obter a class do alerta
    getAlertClass(alert: Alert) {
        if (!alert) return;

        switch (alert.alertType) {
            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
            case AlertType.WARNING:
                return 'alert alert-warning';
            case AlertType.SUCCESS:
                return 'alert alert-success';
        }
    }
}

