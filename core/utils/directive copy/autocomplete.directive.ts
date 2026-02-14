import { Directive, ElementRef, OnInit, Renderer2, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[autocompleteOff]'
})
/**
 * Alterates autocomplete="off" atribute on chrome because it's ignoring it in case of credentials, address or credit card data type.
 */
export class AutocompleteDirective implements OnInit,AfterViewInit {
    
    constructor(private readonly el: ElementRef, private readonly renderer: Renderer2) { }
        ngOnInit()
        {
          
        }
     
    ngAfterViewInit() {
      const randomString = Math.random().toString(36).slice(-6);
      this.renderer.setAttribute(this.el.nativeElement, 'name', randomString);
      this.renderer.setAttribute(this.el.nativeElement, 'autocomplete', randomString);
    }
}