import { Directive, ElementRef, Input, OnInit, Renderer } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";

/*
Esta diretiva é responsável por exibir o ícone de lixeira somente se o usuário for o dono da foto, caso contrário
*/

@Directive({
    selector: '[showIfLogged]'
})
export class ShowInfLoggedDirect implements OnInit {

    currentDisplay: string;

    constructor(private element: ElementRef<any>, private renderer: Renderer, private userService: UserService) { }

    ngOnInit(): void {
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.userService.getUser().subscribe(user => {
            if (user) {
                this.renderer.setElementStyle(this.element.nativeElement, 'display', this.currentDisplay);
            } else {
                this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
                this.renderer.setElementStyle(this.element.nativeElement, 'display', 'none');
            }
        });
    }
}