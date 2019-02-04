import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { BookService } from "../../services/book.service"
import { Book } from "../../models/book"
import { Author } from "../../models/author"
import { AuthorService } from "../../services/author.service"
import { ValidateHelper } from "../../Miscellaneous/ValidateHelper"
declare var $: any;

/* Компонент. Карточка редактирования книги */

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
    selector: "book-editor",
    templateUrl: "./book-editor.component.html",
    styleUrls: ["./book-editor.component.css"]
})

export class BookEditorComponent implements OnInit {
    public book: Book = new Book(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    public bookPhoto: string;
    
    isNew: boolean = true;
    bookEditForm: FormGroup;

    constructor(private currentRoute: ActivatedRoute,
        private fb: FormBuilder,
        private bookService: BookService,
        private authorService: AuthorService,
        private router: Router) { }

    ngOnInit() {
        var bookId = this.currentRoute.snapshot.params["id"];
        this.isNew = bookId == undefined;

        this.bookEditForm = this.fb.group({
            title: new FormControl("", [Validators.required, ValidateHelper.maxLength30Validator]),
            pCount: new FormControl("", [Validators.required, ValidateHelper.minInt0Validator, ValidateHelper.maxInt10000Validator]),
            publisher: new FormControl("", [ValidateHelper.maxLength30Validator]),
            publicYear: new FormControl("", [Validators.required, ValidateHelper.minYear1800Validator, ValidateHelper.maxCurrentYearValidator]),
            isbn: new FormControl("", [Validators.required, ValidateHelper.isbnValidator]),
            photo: new FormControl(""),
        });

        var bookForm = this.bookEditForm.controls;
        if (bookId) {
            this.bookService.getData(bookId).subscribe(bs => {
                this.book = bs;
                bookForm["title"].patchValue(this.book.Title); bookForm["pCount"].patchValue(this.book.PageCount);
                bookForm["publisher"].patchValue(this.book.Publisher); bookForm["publicYear"].patchValue(this.book.PublicYear);
                bookForm["isbn"].patchValue(this.book.Isbn);

                this.bookPhoto = this.book.ImagePath;
                this.updateAuthorControl(this.book.Authors);

            }, () => console.error("error"));
        }
        else this.updateAuthorControl(undefined);
        
        $("#multiselect").multiselect({ keepRenderingSort: true });
    }

    updateAuthorControl(data: Author[] | undefined) {
        var leftAutors: Author[] = data ? data: [];
        this.authorService.getAllData().subscribe(a => {
			  var rightAutors: Author[] = a.filter(r => !leftAutors.find(l => l.Id == r.Id));
	        leftAutors.forEach(a => {
                $("#multiselect_to").append($("<option></option>")
                                    .attr("value", a.Id).text(a.FirstName + ' ' + a.LastName));
           });
           rightAutors.forEach(a => {
                $("#multiselect").append($("<option></option>")
                                 .attr("value", a.Id).text(a.FirstName + ' ' + a.LastName));
           });
        });
    }
    
    isControlInvalid(controlName: string): boolean {
        const control = this.bookEditForm.controls[controlName];
        return control.invalid && control.touched;
    }

    fileChanged(e: Event) {
        var target: HTMLInputElement = e.target as HTMLInputElement;
        for (var i = 0; i < target.files.length; i++) {
            this.bookService.upload(target.files[i]).subscribe(a => {
                this.bookPhoto = a;
            }, e => alert(e) );
        }
    }

	 loadImage() {
        $("#photo").click();
	 }

    clearImage() { this.bookPhoto = ""; }

    get autorCount(): boolean {
        return $("#multiselect_to option").length;
    }

    addAuthor(firstName: string, lastName: string) {
        if (!(firstName && lastName && firstName.length < 20 && lastName.length < 20)) {
            alert("Ошибка добавления автора. Имя и фамилия должны быть не пустыми и их максимальное количество знаков должно быть меньше 20!");
            return;
        }

        this.authorService.add(firstName, lastName).subscribe(a => {
            $("#multiselect").append($("<option></option>").attr("value", a.Id).text(a.FirstName + ' ' + a.LastName));
        }, e => alert(e));
    }

    cancelClick() {
        this.router.navigate(["books"]);
    }

    saveClick() {
        var bookForm = this.bookEditForm.value;
        var newBook: Book = new Book(
            this.book.Id, bookForm.title, [], bookForm.pCount, bookForm.publisher,
            bookForm.publicYear, bookForm.isbn, this.bookPhoto
        );

        this.authorService.getAllData().subscribe(a => {
            $("#multiselect_to option").each(function () {
				// ReSharper disable once SuspiciousThisUsage
	            a.filter(el => el.Id == $(this).val()).forEach(el => { newBook.Authors.push(el); });
				});

            var bookService = this.isNew ? this.bookService.create(newBook) : this.bookService.update(newBook);
            bookService.subscribe(() => this.router.navigate(["books"]), e => alert(e));
        });
    }
}