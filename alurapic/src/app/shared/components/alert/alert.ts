export class Alert {
    constructor(public readonly alertType: AlertType, public readonly _message: string) { }

    get message() {
        return this._message;
    }
}
export enum AlertType {
    SUCCESS,
    WARNING,
    DANGER,
    INFO
}