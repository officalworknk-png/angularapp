import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appearView]'
})
export class AppearViewDirective implements OnInit {
  private hasAppeared = false;
  @Input() value:string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {

    // console.log("Callll--->",this.value)
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !this.hasAppeared) {
        this.renderer.addClass(this.elementRef.nativeElement, this.value);
        this.hasAppeared = true;
        observer.unobserve(this.elementRef.nativeElement);
      }
    });
  });

  observer.observe(this.elementRef.nativeElement);
}

}
