import { Directive, ElementRef, Input, OnInit, Renderer } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
import { Photo } from "../../photo/photo";

/*
Esta diretiva é responsável por exibir o ícone de lixeira somente se o usuário for o dono da foto, caso contrário
*/

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input()
    ownedPhoto: Photo;

    constructor(private element: ElementRef<any>, private renderer: Renderer, private userService: UserService) { }

    //Obtemos o usuário, fazermos um sobscribe e verificamos se o id de ownedPhoto é igual ao do usuário logado, se for, usamos o 'renderer' para manipular o DOM e retirar a visualização.
    ngOnInit(): void {
        this.userService.getUser()
        .subscribe(user => {
            if(!user || user.id != this.ownedPhoto.id){
                this.renderer.setElementStyle(this.element.nativeElement,'display','none');
            }
        });
    }
}