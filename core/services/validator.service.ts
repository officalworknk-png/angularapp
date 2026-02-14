import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, FormGroupName } from '@angular/forms';


/**
 * Description:class use for form validation or validation massage
 */
@Injectable({
    providedIn: 'root'
})

export class ValidatorService {

    static validationMessage = [];

    constructor() {

    }

    /**
     * Funtion use for show validation massage in validation form
     * @param {string} key 
     * @param {string} validatorName 
     * @param {any} validatorValue 
     * 
     * @returns funtion return string type validation massage
     */
    static getValidatorErrorMessage(key: string, validatorName: string, validatorValue?: any) {
        let config = {
            'required': `${key} is mandatory`,
            'invalidEmailAddress': 'Invalid Email',
            'invalidNumber': 'Invalid Phone Number',
            'invalidOTP': 'Invalid OTP',
            'invalidAlphanumeric': `Only alphanumeric allowed `,
            'invalidURL': `Invalid URL `,
            'invalidVideoURL': `Invalid URL `,
            'invalidPrice': `Invalid price.`,
            'invalidExposure': `Only Numeric Value`,
            'minCHBalance': `Only Numeric Value and greater than 10`,
            'minCUBalance': `Only Numeric Value and greater than 100`,
            'invalidBalance': `Only numeric value is accepted.`,
            'invalidName': `Invalid Name`,
            'invalidNameValidation': `The name should contain only a single space.No special symbols, and numbers are allowed.`,
            'invalidMatch': `Password not Matched`,
            'invalidNewPass': `New Password should be diffrent from Old password`,
            'validMatch': `Password Matched`,
            'invalidRole': `RoleName is Required`,
            'invalidField': `Field is required`,
            'invalidAlias': `Only Capital Letters`,
            'invalidBetAmout': `Must Be 10 or greater than 10`,
            'invalidPassword': 'Invalid password. password must be between 6 to 20 characters, and contain [0-9],[a-z],[A-Z] .',
            'minlength': `must be at least ${validatorValue.requiredLength} characters long.`,
            'maxlength': `Max. ${validatorValue.requiredLength} characters are allowed.`,
            'noError': null,
            'invalidRuns': `Enter Valid Runs`,
            'invalidNumbervalue': `Enter valid value`,
            'invalidodds':`Enter valid`,
            'percentage' : `Value must be between 1 and 100`,
            'invalidRange':'enter valid range',
            'ifsc':'Enter valid IFSC ',
            'invalidAmount':'value must grater than 0',
            'shortName':'short name should be 3 character long',
            'minphoneDigit':`${key} must be at least 10 digit`,
            'minAccDigit':`${key} must be at least 9 digit`,
            'maxAccDigit':`${key} must be less than 18 digit`

        };

        if (config[validatorName] == undefined) {
            let messageObj: any = ValidatorService.validationMessage.find(e => e.field == validatorName);
            return messageObj.message;
        }

        return config[validatorName];
    }


    /**
     * Function used for alpha Numeric validation
     * @param {any} control 
     * 
     * @returns function returns invalidAlphanumeric if condition didn't match
     */
    static alphaNumbericValidation(control:any) {

        if (control.value.match(/^[A-Za-z0-9_]+$/)) {
            return null
        } else {
            return { 'invalidAlphanumeric': true }
        }
    }

    static alphaNumbericValidationOption(control:any) {

        if (control.value.match(/^[A-Za-z0-9_]+$/)) {
            return null
        } 
        if(control.value==''){
            return null
        }else {
            return { 'invalidAlphanumeric': true }
        }
    }

    /**
     * Funtion used for phone number validation
     * @param {any} control 
     * 
     * @returns function returns true/null 
     */
    static phoneNumberValidator(control:any) {
     
        if (control.value.match(/^[0-9]{0,}$/)) {
            return null
        }
        else if(control.value == ''){
            return null
        }
        else {
            return { 'invalidNumber': true }
        }
    }

    static minNumLength(control:any){
        if (control.value.match(/^([0-9]!*){10,}$/)) {
            return null
        }
        else if(control.value == ''){
            return null
        }
        else {
            return { 'minphoneDigit': true }
        }
    }

    static minAccLength(control:any){
        if (control.value.match(/^([0-9]!*){9,}$/)) {
            return null
        }
        else if(control.value == ''){
            return null
        }
        else {
            return { 'minAccDigit': true }
        }
    }

    static maxAccLength(control:any){
        if (control.value.match(/^([0-9]!*){9,18}$/)) {
            return null
        }
        else if(control.value == ''){
            return null
        }
        else {
            return { 'maxAccDigit': true }
        }
    }



    /**
     * Funtion used for phone number validation
     * @param {any} control 
     * 
     * @returns function returns true/null 
     */
    static otpValidator(control:any) {
     
        if (control.value.match(/^[0-9]{0,}$/)) {
            return null
        }
        else if(control.value == ''){
            return null
        }
        else {
            return { 'invalidOTP': true }
        }
    }

    /**
     * Funtion used for Email validation
     * @param {any} control 
     * 
     * @returns function returns true/null
     */
    static emailValidator(control:any) {
       
        if (control.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        // if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)) {
            return null
        } 
        else if(control.value == ''){
            return null
        }
        else {
            return { 'invalidEmailAddress': true }
        }

    }

    /**
     * Funtion used for Password validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static passwordValidator(control:any) {
        if (control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,20}$)/)) {
            return null
        } else {
            return { 'invalidPassword': true }
        }
    }

    /**
     * Funtion used for fancy runs validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static runsValidator(control:any) {

        if (control.value.match(/^[0-9]\d*\.?[0-9]\d{0,3}$/)) {
            return true
        }
        else if (control.value.match(/^[0-9]\d*\+?[0-9]\d{0,4}$/)) {
            return true
        }
        else if (control.value.match(/^[0-9]\d*\+\+?[0-9]\d{0,4}$/)) {
            return true
        }
        else if (control.value.match(/^[0-9]\d*\*?[0-9]\d{0,2}\.?[0-9]\d{0,2}$/)) {
            return true
        }
        else if (control.value.match(/^\d*$/)) {
        }
        else if (control.value.match(/^\+$/)) {
        }
       
        else {
            return { 'invalidRuns': true }
        }
    }

    // static backOddValidator(control) {
    //     if (control.value.match(/^[1-9]$/)) {
    //         return true
    //     }
    //     else {
    //         return { 'invalidodds': true }
    //     }
    // }

    /**
     * Funtion used for number validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static numberValidator(control:any) {
        if (control.value.match(/^[1-9]\d*(\.\d+)?$/)) {
            return null

        } else {
            return { 'invalidNumbervalue': true }
        }

    }

    static ifscValidator(control:any) {
        control.value=control.value.toUpperCase()
        // if (control.value.match(/^[A-Z]{4}0[a-zA-Z0-9]{6}$/)) { //ifsc validation
        //     return null
        // }
        if (control.value.match(/^[a-zA-Z0-9]+$/i) && control.value.match(/^((?!\s{2}).)*$/)) { // no special char allow
            return null
        }
        if(control.value==''){
            return null
        }
         else {
            return { 'ifsc': true }
        }

    }


    /**
     * Funtion used for exposer validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static exposureValidator(control:any) {

        if (control.value.match(/^[0-9]*$/)) {
            return null
        } else {
            return { 'invalidExposure': true }
        }
    }

     /**
     * Funtion used for balance validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static balanceValidator(control:any) {
        let currency = window.localStorage.getItem('currency')
        if (currency == 'CI') {
            // && control.value >= 1000
            if (control.value.match(/^[0-9]*$/)) {
                return null
            } else {
                return { 'invalidBalance': true }
            }

        }

        if (currency == 'CH') {
            // && control.value >= 10
            if (control.value.match(/^[0-9]*$/)) {
                return null
            } else {
                return { 'invalidBalance': true }
            }
        }
        if (currency == 'CU') {
            // && control.value >= 100
            if (control.value.match(/^[0-9]*$/)) {
                return null
            } else {
                return { 'invalidBalance': true }
            }
        }


    }

    /**
     * Funtion used for name validation only single space or alpha char
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static alphaValidators(control:any) {
        if (control.value.match(/^[a-z ]+$/i) && control.value.match(/^((?!\s{2}).)*$/)) {
            return null
        }
        if(control.value==''){
            return null
        }
        else {
            return { 'invalidNameValidation': true }
        }
    }

    static alphaNumValidators(control:any) {
        if (control.value.match(/^[a-z0-9 ]+$/i) && control.value.match(/^((?!\s{2}).)*$/)) {
            return null
        }
        if(control.value==''){
            return null
        }
        else {
            return { 'invalidNameValidation': true }
        }
    }

    /**
     * Funtion used for password match validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    matchPassword(control: FormGroup) {
        if (control.controls['cPassword'].value) {
            if (control.controls['password'].value !== control.controls['cPassword'].value) {
                return { 'invalidMatch': true }
            }
            return null
        }


    }

    /**
     * Funtion used for role dropdown validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static dropDownValidator(control:any) {
        if (!control.value) {
            return { 'invalidRole': true }
        }
        return null
    }

    /**
     * Funtion used for matchChangePassword validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    matchChangePassword(control: FormGroup) {
        if (control.controls['confirmPass'].value) {
            if (control.controls['newPwd'].value !== control.controls['confirmPass'].value) {
                return { 'invalidMatch': true }
            }
            return null
        }
    }

    /**
     * Funtion used for loginValidation validation
     * 
     * @param {any} control 
     * @returns function returns true/null
     */
    static loginValidation(control) {
        if (control.value == "") {
            return { 'invalidField': true }
        }
        return null
    }

    /**
     * 
     * @param form 
     * Global Validation on submit button or programtically valid form
     * 
     */
    static validationForm(form: FormGroup) {
        Object.keys(form.controls).forEach(field => { // {1}
            const control = form.get(field);            // {2}
            control.markAsTouched({ onlySelf: true });       // {3}
        });

        return form;
    }

    /**
     * Funtion used for alias validation
     * @param control 
     * 
     * @returns function returns true/null
     */
    static aliasValidator(control:any) {
        if (!control.value) {
            return null;
        }
        return { 'invalidAlias': true }
    }

    /**
     * Funtion used for percentage validation
     * @param control 
     * 
     * @returns function returns true/null
     */
    static validPercentage(control){
        if(control.value==''){
            return null
        }
        if (control.value<=100 && control.value>=1) {
            return null
        } 
        else {
            return { 'percentage': true }
        }
    }

        /**
     * Funtion used for percentage validation
     * @param control 
     * 
     * @returns function returns true/null
     */
    static positiveValue(control){
        if(control.value==''){
            return null
        }
        if (control.value>0) {
            return null
        } 
        else {
            return { 'invalidAmount': true }
        }
    }

    static userRangeFrom(control){
        if(control.value==''){
            return null
        }
        if (control.value.match(/^[0-9]*$/)) {
            return null
        } 
        else {
            return { 'invalidExposure': true }
        }
    }

    checkuserRange(control: FormGroup) {
        if (control.controls['userRangeTo'].value) {
            // if (control.controls['userRangeTo'].value - control.controls['userRangeFrom'].value > 14 || control.controls['userRangeTo'].value - control.controls['userRangeFrom'].value <= 0) {
            //     return { 'invalidRange': true }
            // }
            if(control.controls['userRangeTo'].value<2 || control.controls['userRangeTo'].value>15){
                return { 'invalidRange': true }
            }
            return null
        }


    }
}