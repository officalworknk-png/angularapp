import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from './validation-message.component';
import { ValidatorService } from 'core/services/validator.service';



@NgModule({
  declarations: [ValidationMessageComponent],
  providers: [ValidatorService],
  imports: [
    CommonModule
  ],
  exports :[ValidationMessageComponent]
})
export class ValidationMessageModule { }
