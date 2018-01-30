using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Repo
{
    public interface IBookRepository : IRepository<Book> { };

    public class BookRepository : RepositoryBase<Book>, IBookRepository
    {
        private static List<Book> data = new List<Book>
        {
            new Book() {
                    id = 0, title="C# 4.0. Полное руководство",
                    authors =new Author[] {
                        new Author() { id = 0, FirstName="Герберт", LastName = "Шилдт" },
                    },
                    pCount=946, publisher ="Вильямс", publicYear="2015", ISBN="032157351X",
                    imagePath ="./assets/images/b1.jpg"
                },
                new Book()
                {
                    id = 1, title="Unity в действии",
                    authors =new Author[] {
                        new Author() { id = 1, FirstName="Джозеф", LastName = "Хокинг" },
                    },
                    pCount=336, publisher ="Питер", publicYear="2016", ISBN="0262033844",
                    imagePath ="./assets/images/b2.jpg"
                },
                new Book()
                {
                    id = 2, title="C# 6.0. Справочник",
                    authors =new Author[] {
                        new Author() { id = 2, FirstName="Джозеф", LastName = "Албахари" },
                        new Author() { id = 3, FirstName="Бен", LastName = "Албахари" },
                    },
                    pCount=737, publisher ="Вильямс", publicYear="2017", ISBN="193-6-493934",
                    imagePath ="./assets/images/b3.jpg"
                }

        };

        public override List<Book> Data { get { return data ?? (data = new List<Book>()); } }
    }
}
