import { Author } from './author';

export class Book {
    constructor(
        public id: number,
        public title: string,
        public authors: Author[],
        public pCount: number,
        public publisher: string,
        public publicYear: string,
        public ISBN: string,
        public imagePath: string
    ) { }
}
