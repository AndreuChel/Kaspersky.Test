using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Repo
{
    public interface IAuthorRepository : IRepository<Author> { }

	 /// <summary>
	 ///  Репозиторий для хранения авторов книг (фейковые данные берутся из репозитория с книгами)
	 /// </summary>
    public class AuthorRepository : RepositoryBase<Author>, IAuthorRepository
    {
        private static List<Author> _data;

        static AuthorRepository () {
            _data = new BookRepository()
                   .Data.SelectMany(b => b.Authors)
                   .GroupBy(a => a.Id)
                   .Select(g => g.First()).ToList();
        }

        public override List<Author> Data => _data ?? (_data = new List<Author>());

	     public override int Create(Author src)
        {
            if (Data.Any(d => d.FirstName.ToUpper().Trim() == src.FirstName.ToUpper().Trim() &&
                              d.LastName.ToUpper().Trim() == src.LastName.ToUpper().Trim()))
                throw new ArgumentException("Такой автор уже есть!");
            return base.Create(src);
        }
    }
}
