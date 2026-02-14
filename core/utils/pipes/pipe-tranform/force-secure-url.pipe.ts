import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forceSecureUrl'
})
export class ForceSecureUrlPipe implements PipeTransform {

  transform(value: any, fallback: string, forceHttps: boolean = true): any {
    let image = "";
    if (value) {
      image = value;
    } else {
      image = fallback;
    }

    if (forceHttps) {
      if (image.indexOf("https") == -1) {
        image = image.replace("http", "https");
      }
    }

    return image;
  }

}
