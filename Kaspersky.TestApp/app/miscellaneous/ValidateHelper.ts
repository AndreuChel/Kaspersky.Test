import { FormControl } from "@angular/forms";
declare var isbnValidator: any;

/* Валидаторы для полей */

export class ValidateHelper {
    static maxLength30Validator(control: FormControl): { [s: string]: boolean } {
        if (control.value.length > 30) return { ValidMaxLength: true };
        return null;
    }
    static minInt0Validator(control: FormControl): { [s: string]: boolean } {
        if (parseInt(control.value) <= 0) return { ValidMinValue: true };
        return null;
    }
    static maxInt10000Validator(control: FormControl): { [s: string]: boolean } {
        if (parseInt(control.value) > 10000) return { ValidMaxValue: true };
        return null;
    }
    static minYear1800Validator(control: FormControl): { [s: string]: boolean } {
        if (parseInt(control.value) < 1800) return { ValidMinYearValue: true };
        return null;
    }
    static maxCurrentYearValidator(control: FormControl): { [s: string]: boolean } {
		 const currentYear = (new Date()).getFullYear();
		 if (parseInt(control.value) > currentYear) return { ValidMaxYearValue: true };
	    return null;
    }
    static isbnValidator(control: FormControl): { [s: string]: boolean } {
        if (!isbnValidator(control.value)) return { ValidISBNValue: true };
        return null;
    }
}