"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MyValidator = /** @class */ (function () {
    function MyValidator() {
    }
    MyValidator.maxLength30Validator = function (control) {
        if (control.value.length > 30)
            return { ValidMaxLength: true };
        return null;
    };
    MyValidator.minInt0Validator = function (control) {
        if (parseInt(control.value) <= 0)
            return { ValidMinValue: true };
        return null;
    };
    MyValidator.maxInt10000Validator = function (control) {
        if (parseInt(control.value) > 10000)
            return { ValidMaxValue: true };
        return null;
    };
    MyValidator.minYear1800Validator = function (control) {
        if (parseInt(control.value) < 1800)
            return { ValidMinYearValue: true };
        return null;
    };
    MyValidator.maxCurrentYearValidator = function (control) {
        var currentYear = (new Date()).getFullYear();
        if (parseInt(control.value) > currentYear)
            return { ValidMaxYearValue: true };
        return null;
    };
    MyValidator.isbnValidator = function (control) {
        if (!isbnValidator(control.value))
            return { ValidISBNValue: true };
        return null;
    };
    return MyValidator;
}());
exports.MyValidator = MyValidator;
//# sourceMappingURL=my-validator.js.map