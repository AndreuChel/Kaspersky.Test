import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service'
import { Book } from '../../models/book'
import { Author } from '../../models/author'
import { AuthorService } from '../../services/author.service'
import { MyValidator } from '../../Miscellaneous/my-validator'
import { Global } from '../../global'
declare var $: any;
//declare var isbnValidator: any;

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';

@Component({
    selector: 'book-editor',
    templateUrl: './book-editor.component.html',
    styleUrls: ['./book-editor.component.css']
})
export class BookEditorComponent implements OnInit {
    public book: Book = new Book(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    public bookPhoto: string;
    
    isNew: boolean = true;
    BookEditForm: FormGroup;

    constructor(private currentRoute: ActivatedRoute,
        private fb: FormBuilder,
        private bookService: BookService,
        private authorService: AuthorService,
        private router: Router) { }

    ngOnInit() {
        var bookId = this.currentRoute.snapshot.params["id"];
        this.isNew = bookId == undefined;

        this.BookEditForm = this.fb.group({
            title: new FormControl("", [Validators.required, MyValidator.maxLength30Validator]),
            pCount: new FormControl("", [Validators.required, MyValidator.minInt0Validator, MyValidator.maxInt10000Validator]),
            publisher: new FormControl("", [MyValidator.maxLength30Validator]),
            publicYear: new FormControl("", [Validators.required, MyValidator.minYear1800Validator, MyValidator.maxCurrentYearValidator]),
            isbn: new FormControl("", [Validators.required, MyValidator.isbnValidator]),
            photo: new FormControl(""),
        });

        var _form = this.BookEditForm.controls;
        if (bookId) {
            this.bookService.GetData(bookId).subscribe(bs => {
                this.book = bs;
                _form["title"].patchValue(this.book.title); _form["pCount"].patchValue(this.book.pCount);
                _form["publisher"].patchValue(this.book.publisher); _form["publicYear"].patchValue(this.book.publicYear);
                _form["isbn"].patchValue(this.book.ISBN);

                this.bookPhoto = this.book.imagePath;
                this.updateAuthorControl(this.book.authors);

            }, () => console.error("error"));
        }
        else this.updateAuthorControl(undefined);
        
        $('#multiselect').multiselect({ keepRenderingSort: true });
    }

    updateAuthorControl(data: Author[] | undefined) {
        var leftAutors: Author[] = data ? data: [];
        this.authorService.GetAllData().subscribe(a => {
            var rightAutors: Author[] = a.filter(r => !leftAutors.find(l => l.id == r.id))
            leftAutors.forEach(a => {
                $('#multiselect_to').append($("<option></option>")
                                    .attr("value", a.id).text(a.FirstName + ' ' + a.LastName));
            });
            rightAutors.forEach(a => {
                $('#multiselect').append($("<option></option>")
                                 .attr("value", a.id).text(a.FirstName + ' ' + a.LastName));
            });
        });
    }
    
    isControlInvalid(controlName: string): boolean {
        const control = this.BookEditForm.controls[controlName];
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
    LoadImage() {
        $("#photo").click();
    }
    ClearImage() { this.bookPhoto = ""; }

    get AutorCount(): boolean {
        return $("#multiselect_to option").length;
    }

    AddAuthor(firstName: string, lastName: string) {
        if (!(firstName && lastName && firstName.length < 20 && lastName.length < 20)) {
            alert("Ошибка добавления автора. Имя и фамилия должны быть не пустыми и их максимальное количество знаков должно быть меньше 20!");
            return;
        }

        this.authorService.Add(firstName, lastName).subscribe(a => {
            $('#multiselect').append($("<option></option>").attr("value", a.id).text(a.FirstName + ' ' + a.LastName));
        }, e => alert(e));
    }

    CancelClick() {
        this.router.navigate(["books"]);
    }

    SaveClick() {
        var _form = this.BookEditForm.value;
        var newBook: Book = new Book(
            this.book.id, _form.title, [], _form.pCount, _form.publisher,
            _form.publicYear, _form.isbn, this.bookPhoto
        );

        this.authorService.GetAllData().subscribe(a => {
            $("#multiselect_to option").each(function () {
                a.filter(el => el.id == $(this).val())
                    .forEach(function (el) { newBook.authors.push(el); })
            });
            var _service = this.isNew ? this.bookService.create(newBook) : this.bookService.update(newBook);
            _service.subscribe(b => this.router.navigate(["books"]), e => alert(e));
        });
    }
}