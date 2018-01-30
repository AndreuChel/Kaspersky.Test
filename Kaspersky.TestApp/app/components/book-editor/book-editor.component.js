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
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var book_service_1 = require("../../services/book.service");
var book_1 = require("../../models/book");
var author_service_1 = require("../../services/author.service");
var my_validator_1 = require("../../Miscellaneous/my-validator");
//declare var isbnValidator: any;
var forms_1 = require("@angular/forms");
var BookEditorComponent = /** @class */ (function () {
    function BookEditorComponent(currentRoute, fb, bookService, authorService, router) {
        this.currentRoute = currentRoute;
        this.fb = fb;
        this.bookService = bookService;
        this.authorService = authorService;
        this.router = router;
        this.book = new book_1.Book(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
        this.isNew = true;
    }
    BookEditorComponent.prototype.ngOnInit = function () {
        var _this = this;
        var bookId = this.currentRoute.snapshot.params["id"];
        this.isNew = bookId == undefined;
        this.BookEditForm = this.fb.group({
            title: new forms_1.FormControl("", [forms_1.Validators.required, my_validator_1.MyValidator.maxLength30Validator]),
            pCount: new forms_1.FormControl("", [forms_1.Validators.required, my_validator_1.MyValidator.minInt0Validator, my_validator_1.MyValidator.maxInt10000Validator]),
            publisher: new forms_1.FormControl("", [my_validator_1.MyValidator.maxLength30Validator]),
            publicYear: new forms_1.FormControl("", [forms_1.Validators.required, my_validator_1.MyValidator.minYear1800Validator, my_validator_1.MyValidator.maxCurrentYearValidator]),
            isbn: new forms_1.FormControl("", [forms_1.Validators.required, my_validator_1.MyValidator.isbnValidator]),
            photo: new forms_1.FormControl(""),
        });
        var _form = this.BookEditForm.controls;
        if (bookId) {
            this.bookService.GetData(bookId).subscribe(function (bs) {
                _this.book = bs;
                _form["title"].patchValue(_this.book.title);
                _form["pCount"].patchValue(_this.book.pCount);
                _form["publisher"].patchValue(_this.book.publisher);
                _form["publicYear"].patchValue(_this.book.publicYear);
                _form["isbn"].patchValue(_this.book.ISBN);
                _this.bookPhoto = _this.book.imagePath;
                _this.updateAuthorControl(_this.book.authors);
            }, function () { return console.error("error"); });
        }
        else
            this.updateAuthorControl(undefined);
        $('#multiselect').multiselect({ keepRenderingSort: true });
    };
    BookEditorComponent.prototype.updateAuthorControl = function (data) {
        var leftAutors = data ? data : [];
        this.authorService.GetAllData().subscribe(function (a) {
            var rightAutors = a.filter(function (r) { return !leftAutors.find(function (l) { return l.id == r.id; }); });
            leftAutors.forEach(function (a) {
                $('#multiselect_to').append($("<option></option>")
                    .attr("value", a.id).text(a.FirstName + ' ' + a.LastName));
            });
            rightAutors.forEach(function (a) {
                $('#multiselect').append($("<option></option>")
                    .attr("value", a.id).text(a.FirstName + ' ' + a.LastName));
            });
        });
    };
    BookEditorComponent.prototype.isControlInvalid = function (controlName) {
        var control = this.BookEditForm.controls[controlName];
        return control.invalid && control.touched;
    };
    BookEditorComponent.prototype.fileChanged = function (e) {
        var _this = this;
        var target = e.target;
        for (var i = 0; i < target.files.length; i++) {
            this.bookService.upload(target.files[i]).subscribe(function (a) {
                _this.bookPhoto = a;
            }, function (e) { return alert(e); });
        }
    };
    BookEditorComponent.prototype.LoadImage = function () {
        $("#photo").click();
    };
    BookEditorComponent.prototype.ClearImage = function () { this.bookPhoto = ""; };
    Object.defineProperty(BookEditorComponent.prototype, "AutorCount", {
        get: function () {
            return $("#multiselect_to option").length;
        },
        enumerable: true,
        configurable: true
    });
    BookEditorComponent.prototype.AddAuthor = function (firstName, lastName) {
        if (!(firstName && lastName && firstName.length < 20 && lastName.length < 20)) {
            alert("Ошибка добавления автора. Имя и фамилия должны быть не пустыми и их максимальное количество знаков должно быть меньше 20!");
            return;
        }
        this.authorService.Add(firstName, lastName).subscribe(function (a) {
            $('#multiselect').append($("<option></option>").attr("value", a.id).text(a.FirstName + ' ' + a.LastName));
        }, function (e) { return alert(e); });
    };
    BookEditorComponent.prototype.CancelClick = function () {
        this.router.navigate(["books"]);
    };
    BookEditorComponent.prototype.SaveClick = function () {
        var _this = this;
        var _form = this.BookEditForm.value;
        var newBook = new book_1.Book(this.book.id, _form.title, [], _form.pCount, _form.publisher, _form.publicYear, _form.isbn, this.bookPhoto);
        this.authorService.GetAllData().subscribe(function (a) {
            $("#multiselect_to option").each(function () {
                var _this = this;
                a.filter(function (el) { return el.id == $(_this).val(); })
                    .forEach(function (el) { newBook.authors.push(el); });
            });
            var _service = _this.isNew ? _this.bookService.create(newBook) : _this.bookService.update(newBook);
            _service.subscribe(function (b) { return _this.router.navigate(["books"]); }, function (e) { return alert(e); });
        });
    };
    BookEditorComponent = __decorate([
        core_1.Component({
            selector: 'book-editor',
            templateUrl: './book-editor.component.html',
            styleUrls: ['./book-editor.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            forms_1.FormBuilder,
            book_service_1.BookService,
            author_service_1.AuthorService,
            router_2.Router])
    ], BookEditorComponent);
    return BookEditorComponent;
}());
exports.BookEditorComponent = BookEditorComponent;
//# sourceMappingURL=book-editor.component.js.map