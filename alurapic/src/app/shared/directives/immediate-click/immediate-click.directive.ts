import { Directive, ElementRef, OnInit } from "@angular/core";
import { element } from "protractor";
import { PlatformDetectorService } from "src/app/core/plataform-detector/platform-detector.service";

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(private elementRef: ElementRef<any>, private platformDetector: PlatformDetectorService) { }

    ngOnInit(): void {
        this.platformDetector.isPlatformBrowser &&
            this.elementRef.nativeElement.click();
    }
}