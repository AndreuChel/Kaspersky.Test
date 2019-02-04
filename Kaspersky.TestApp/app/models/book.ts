import { Author } from "./author";

export class Book {
    constructor(
        public Id: number,
        public Title: string,
        public Authors: Author[],
        public PageCount: number,
        public Publisher: string,
        public PublicYear: string,
        public Isbn: string,
        public ImagePath: string
    ) { }
}
