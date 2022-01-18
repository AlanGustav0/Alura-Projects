import { Component, Input, OnInit } from "@angular/core";
import { switchMap, tap} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

import { PhotoComment } from "../../photo/photo-comment";
import { PhotoService } from "../../photo/photo.service";

@Component({
    selector:'ap-photo-comments ',
    templateUrl:'./photo-comments.component.html',
    styleUrls:['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit{
    
    @Input() photoId: number;
    commentForm: FormGroup;
    comments$: Observable<PhotoComment[]>;

    constructor(private photoService: PhotoService,private formBuilder:FormBuilder){}

    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment:['',Validators.maxLength(300)]
        })
    }

    /*
    No método de salvar o comentário, seguimos os sequintes passos:

    1º - Obter o comentário do textarea com commentForm.get()
    2º - Jogamos o comentário no observable "comments$" através do serviço photoService e acessando o método
    "addComment" passando o photoId e o comment por parâmetro
    3º Utilizamos o "pipe" para realizar um pipeline de ações, dentro dele usamos o "switchMap" para mapear a operação que é realizada em seguida, realizando uma mudança no fluxo, no caso o "photoService.getComments" para obter o comentário da API
    4º Com o comentário obtido, usamos o pipe em consjunto com o "tap" para podermos realizar o efeito que esta ação terá antes de retornar a resposta, neste caso resetar o fomrulário e mostrar a mensagem ao usuário.
    */
    saveComment(){
        const comment = this.commentForm.get('comment').value;
        this.comments$ = this.photoService.addComment(this.photoId,comment)
        .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
        .pipe(tap(() => {
            this.commentForm.reset();
        }))
    }
}