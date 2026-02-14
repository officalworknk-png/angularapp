import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidatorService } from 'core/services/validator.service';


@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent {
  @Input() control: FormControl;
  @Input() key: string = '';
  constructor(public validation: ValidatorService
  ) { }


  get validationMessage() {
    // console.log("==>",this.control.errors)
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && (this.control.dirty || this.control.touched)){
        let configMsg = ValidatorService.getValidatorErrorMessage(this.key, propertyName, this.control.errors[propertyName]);
        return configMsg;
      }
    }

    return null;
  }

}
