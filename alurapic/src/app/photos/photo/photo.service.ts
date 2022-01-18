import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { PhotoComment } from './photo-comment';

const API = 'http://localhost:3000';

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
}
