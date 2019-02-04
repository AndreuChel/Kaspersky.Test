using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Repo
{
    public interface IBookRepository : IRepository<Book> { };

	 /// <summary>
	 ///  Репозиторий для хранения книг (с фейковыми данными)
	 /// </summary>
    public class BookRepository : RepositoryBase<Book>, IBookRepository
    {
        private static List<Book> _data = new List<Book>
        {
            new Book {
                    Id = 0, Title="C# 4.0. Полное руководство",
                    Authors =new [] { new Author { Id = 0, FirstName="Герберт", LastName = "Шилдт" } },
                    PageCount=946, Publisher ="Вильямс", PublicYear="2015", Isbn="032157351X",
                    ImagePath ="./assets/images/b1.jpg"
                },
	         new Book {
                    Id = 1, Title="Unity в действии",
                    Authors =new [] { new Author { Id = 1, FirstName="Джозеф", LastName = "Хокинг" } },
                    PageCount=336, Publisher ="Питер", PublicYear="2016", Isbn="0262033844",
                    ImagePath ="./assets/images/b2.jpg"
            },
	         new Book {
                    Id = 2, Title="C# 6.0. Справочник",
                    Authors =new [] {
                        new Author { Id = 2, FirstName="Джозеф", LastName = "Албахари" },
                        new Author { Id = 3, FirstName="Бен", LastName = "Албахари" }
                    },
                    PageCount=737, Publisher ="Вильямс", PublicYear="2017", Isbn="193-6-493934",
                    ImagePath ="./assets/images/b3.jpg"
            }
        };

        public override List<Book> Data => _data ?? (_data = new List<Book>());
    }
}
