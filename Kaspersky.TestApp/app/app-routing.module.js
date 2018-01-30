"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var book_list_component_1 = require("./components/book-list/book-list.component");
var book_editor_component_1 = require("./components/book-editor/book-editor.component");
var routes = [
    { path: "", pathMatch: "full", redirectTo: "books" },
    { path: "books", component: book_list_component_1.BookListComponent },
    { path: "books/add", component: book_editor_component_1.BookEditorComponent },
    { path: "books/edit/:id", component: book_editor_component_1.BookEditorComponent }
];
// const routes: Routes = [
//   { path: "", component: BookListComponent  },
//   { path: "add", component: BookEditorComponent  },
//   { path: "edit/:id", component: BookEditorComponent  }
// ];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map