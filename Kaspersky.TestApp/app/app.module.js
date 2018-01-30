"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var book_service_1 = require("./services/book.service");
var author_service_1 = require("./services/author.service");
var number_only_directive_1 = require("./directives/number-only.directive");
var book_list_component_1 = require("./components/book-list/book-list.component");
var book_editor_component_1 = require("./components/book-editor/book-editor.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, app_routing_module_1.AppRoutingModule, forms_1.ReactiveFormsModule, http_1.HttpModule],
            declarations: [app_component_1.AppComponent, number_only_directive_1.NumberOnlyDirective, book_list_component_1.BookListComponent, book_editor_component_1.BookEditorComponent],
            providers: [book_service_1.BookService, author_service_1.AuthorService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map