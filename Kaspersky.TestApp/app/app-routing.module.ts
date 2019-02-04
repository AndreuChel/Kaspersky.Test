import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookEditorComponent } from "./components/book-editor/book-editor.component";

const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "books" },
    { path: "books", component: BookListComponent },
    { path: "books/add", component: BookEditorComponent },
    { path: "books/edit/:id", component: BookEditorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
