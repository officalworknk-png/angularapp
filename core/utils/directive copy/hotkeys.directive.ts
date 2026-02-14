import { Directive, HostListener, ElementRef, Input, Renderer, HostBinding } from "@angular/core";
import { MasterObjectService } from '../../services/index.service';

@Directive({
    selector: '[hotkeyOnly]'
})

export class HotkeyDirective {
    @Input() focus: string;

    constructor(private el: ElementRef, private renderer: Renderer, public object: MasterObjectService) {
    }

    ngAfterViewInit() {
        this.object.focusSource.subscribe(res => {
            this.setFocus(res);
        });
    }
    setFocus(item: string) {
               if (this.focus === item) { // 'id' === 'id'
            this.el.nativeElement.focus();

        }
    }
    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (event.altKey) {
            let key = event.key;
            for (let i = 1; i < 10; i++) {
                if (Number(key) == i) {

                    event.preventDefault();
                    this.object.focus(key);
                }
            }
        }

    }


}