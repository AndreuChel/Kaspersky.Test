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
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
var global_1 = require("../global");
var core_1 = require("@angular/core");
var author_1 = require("../models/author");
var AuthorService = /** @class */ (function () {
    function AuthorService(_http) {
        this._http = _http;
    }
    AuthorService.prototype.GetAllData = function () {
        var _this = this;
        return this._http.get(global_1.Global.BASE_AUTHOR_ENDPOINT)
            .map(function (response) { return response.json(); })
            .catch(function (response) { return _this.handleError(response); });
    };
    AuthorService.prototype.GetData = function (id) {
        var _this = this;
        var params = { params: { id: id } };
        return this._http.get(global_1.Global.BASE_AUTHOR_ENDPOINT, params)
            .map(function (response) { return response.json(); })
            .catch(function (response) { return _this.handleError(response); });
    };
    AuthorService.prototype.Add = function (fName, lName) {
        var _this = this;
        var newAuthor = new author_1.Author(undefined, fName, lName);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(global_1.Global.BASE_AUTHOR_ENDPOINT, JSON.stringify(newAuthor), options)
            .map(function (response) {
            var newId = response.json();
            newAuthor.id = newId;
            return newAuthor;
        })
            .catch(function (response) { return _this.handleError(response); });
    };
    AuthorService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json() || 'Server error');
    };
    AuthorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], AuthorService);
    return AuthorService;
}());
exports.AuthorService = AuthorService;
//# sourceMappingURL=author.service.js.map