import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Photo } from "./photo";
import { PhotoComment } from './photo-comment';

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });
    }


    upload(description: string, allowComments: boolean, file: File) {
        //Quando há envio de arquivos temos que enviar os dados através de um formData
        const formData = new FormData();
        const reader = new FileReader();

        //Os dados abaixo de description, allowComments e imageFile estes formatos de nome são definidos no backend
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(API + '/photos/upload', formData);
    }

    //Método que obtem a foto atraves do ID como parâmetro
    findById(photoId: number) {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }


    //Método para obter os comentários do backend
    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

    //Método para adicionar um comentário na página
    addComment(photoId: number, commentText: string) {
        return this.http.post(API + '/photos/' + photoId + '/comments', { commentText });
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    /*Método para realizar o like da foto, onde mapeamos a resposta como true, ou false, porém na API ela retorna true
    ou o false que seria um erro 304, e para poder capturar este erro, utilizamos o catchError retornando um observable de false
    com o "of" ou então apenas deixamos qualquer outro erro ser lançado

    */
    like(photoId: number) {
        return this.http.post(API + '/photos/' + photoId + '/like', {}, { observe: 'response' }
        ).pipe(map(response => true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }
}
