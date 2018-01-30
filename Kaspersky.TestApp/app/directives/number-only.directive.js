"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NumberOnlyDirective = /** @class */ (function () {
    function NumberOnlyDirective(el) {
        this.el = el;
        this.regex = new RegExp(/^-?[0-9]+$/g);
        this.specialKeys = ['Backspace', 'Tab', 'End', 'Home', '-'];
    }
    NumberOnlyDirective.prototype.onKeyDown = function (event) {
        if (this.specialKeys.indexOf(event.key) !== -1) {
            return;
        }
        var current = this.el.nativeElement.value;
        var next = current.concat(event.key);
        if (next && !String(next).match(this.regex))
            event.preventDefault();
    };
    __decorate([
        core_1.HostListener('keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], NumberOnlyDirective.prototype, "onKeyDown", null);
    NumberOnlyDirective = __decorate([
        core_1.Directive({
            selector: '[IntNumberOnly]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], NumberOnlyDirective);
    return NumberOnlyDirective;
}());
exports.NumberOnlyDirective = NumberOnlyDirective;
//# sourceMappingURL=number-only.directive.js.map