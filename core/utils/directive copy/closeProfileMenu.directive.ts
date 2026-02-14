import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { MasterObjectService } from '../../services/index.service';

@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef, public object: MasterObjectService) {
    }

    @Output()
    public clickOutside = new EventEmitter();

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        } else {
            // this.object.getDOMInstance().closeProfileMenu('arrow_box', 'active-box');
        }
    }
}

