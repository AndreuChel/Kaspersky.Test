"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global = /** @class */ (function () {
    function Global() {
    }
    Global.BASE_IMGUPLOAD_ENDPOINT = 'api/file/';
    Global.BASE_BOOK_ENDPOINT = 'api/book/';
    Global.BASE_AUTHOR_ENDPOINT = 'api/author/';
    Global.FakeBookArray = [
        {
            id: 0, title: 'book1',
            authors: [{ id: 0, FirstName: "Лев", LastName: "Толстой" }, { id: 1, FirstName: "Александр", LastName: "Пушкин" }],
            pCount: 100, publisher: "publisher1",
            publicYear: "1988", ISBN: "032157351X", imagePath: ""
        },
        {
            id: 1, title: 'book2',
            authors: [{ id: 1, FirstName: "Александр", LastName: "Пушкин" }, { id: 2, FirstName: "Михаил", LastName: "Лермонтов" }],
            pCount: 222, publisher: "publisher2",
            publicYear: "2018", ISBN: "0262033844", imagePath: ""
        },
        {
            id: 2, title: 'book3',
            authors: [{ id: 1, FirstName: "Александр", LastName: "Пушкин" }, { id: 3, FirstName: "Федор", LastName: "Достоевский" }],
            pCount: 152, publisher: "publisher1",
            publicYear: "1955", ISBN: "193-6-493934", imagePath: ""
        }
    ];
    Global.FakeAuthorArray = [
        { id: 0, FirstName: "Лев", LastName: "Толстой" }, { id: 1, FirstName: "Александр", LastName: "Пушкин" },
        { id: 2, FirstName: "Михаил", LastName: "Лермонтов" }, { id: 3, FirstName: "Федор", LastName: "Достоевский" }
    ];
    return Global;
}());
exports.Global = Global;
//# sourceMappingURL=global.js.map