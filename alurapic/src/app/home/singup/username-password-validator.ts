import { FormGroup, ValidatorFn } from "@angular/forms";

/*
    Aqui a constante criado do tipo ValidatorGFn recebe uma função que recebe um formGroup e verifica se o username é igual ao passaword, caso seja, retirna null, caso contrário, retorna true;
*/
export const userNamePassword: ValidatorFn = (formGroup:FormGroup) => {

    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;
    
    if(userName.trim() + password.trim()){
        return userName != password ? null : {userNamePassword: true}
    }

    return null;
    
}