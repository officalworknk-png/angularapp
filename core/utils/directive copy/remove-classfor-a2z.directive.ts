import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { MasterObjectService } from '../../services/master-object.service';

@Directive({
  selector: '[removeStyleFora2z]'
})
export class RemoveClassforA2zDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2,public object: MasterObjectService) {
    if(this.object.getLoginInstance().project.a2zbet && this.object.isAdminLogin()){
      this.elementRef.nativeElement.style.setProperty('text-decoration', 'none', 'important');
      this.elementRef.nativeElement.style.setProperty('cursor', 'default', 'important');
    }
    else{
      this.elementRef.nativeElement.style.setProperty('text-decoration', 'underline');
    }
    // this.renderer.setAttribute(this.elementRef.nativeElement, 'class', 'unstyle');
  }

}
