import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
    selector: '[hidecolumnlist]'
})
export class HideColumnOptionDirective {

    counter = 0;
    constructor(private _el: ElementRef) { }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        const clickedInside = this._el.nativeElement.contains(targetElement);
        if (clickedInside == false) {
            var checkboxes = document.getElementById("checkBoxes");
            checkboxes.style.display = "none";
            this.counter=0;
            //   this.object.getDOMInstance().closeProfileMenu('arrow_box_admin', 'active-box');
        } else {
            this.counter++;
            var checkboxes = document.getElementById("checkBoxes");
            checkboxes.style.display = "block";
        }
        if (this.counter == 2) {
            var checkboxes = document.getElementById("checkBoxes");
            checkboxes.style.display = "none";
            this.counter = 0;
        }

    }


}