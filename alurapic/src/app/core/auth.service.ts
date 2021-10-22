import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Construtor de serviço http - ng g s core/auth
  constructor(private http: HttpClient) { }


  //Método de autenticação
  authenticate(userName: string, password:string) {

    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    })
    
    let usuario = JSON.stringify({"email":userName,"password":password});

    console.info(usuario)

    return this.http.post(API_URL + '/auth', usuario,{headers:headers}).subscribe(data => {
      console.info(JSON.parse(JSON.stringify(data)))
    });

    
  }
}
