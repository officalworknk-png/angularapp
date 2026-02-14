import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2
} from "@angular/core";

@Directive({
  selector: "img[appLazyLoad]"
})
export class LazyImgDirective implements AfterViewInit {
  @HostBinding("attr.src") srcAttr = null;
  @Input() src: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    renderer.addClass(el.nativeElement, "image"); //added
  }
  ngAfterViewInit() {

    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
    // this.loadImage();
  }
  

  private canLazyLoad() {
    return window && "IntersectionObserver" in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          // console.log("==>",entries,this.el.nativeElement)
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.src;
    this.renderer.addClass(this.el.nativeElement, "is-loaded"); //added
  }
}
