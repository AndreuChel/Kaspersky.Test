import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BookService } from "./services/book.service";
import { AuthorService } from "./services/author.service"
import { NumberOnlyDirective } from "./directives/number-only.directive";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookEditorComponent } from "./components/book-editor/book-editor.component";

@NgModule({
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpModule],
    declarations: [AppComponent, NumberOnlyDirective, BookListComponent, BookEditorComponent],
    providers: [BookService, AuthorService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
