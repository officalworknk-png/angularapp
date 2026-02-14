import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'link'})

export class LinkUrlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }
    transform(url) {
        let value=this.sanitizer.bypassSecurityTrustResourceUrl(url);
        return value
      }
}