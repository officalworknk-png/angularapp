import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {
  @Input() threshold: number = 600; // Distance from the bottom of the page to trigger loading more items
  @Output() scrolled = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  @HostListener('scroll', ['$event'])
  onScroll(event: any): void {
    const element = event.target;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + this.threshold;
    if (atBottom) {
      this.scrolled.emit();
    }
  }
}
