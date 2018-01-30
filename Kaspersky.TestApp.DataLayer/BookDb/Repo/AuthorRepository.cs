using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Repo
{
    public interface IAuthorRepository : IRepository<Author> { };

    public class AuthorRepository : RepositoryBase<Author>, IAuthorRepository
    {
        private static List<Author> data = new List<Author>();

        static AuthorRepository () {
            data = new BookRepository()
                   .Data.SelectMany(b => b.authors)
                   .GroupBy(a => a.id)
                   .Select(g => g.First()).ToList();
        }

        public override List<Author> Data { get { return data ?? (data = new List<Author>()); } }

        public override int Create(Author src)
        {
            if (Data.Any(d => d.FirstName.ToUpper().Trim() == src.FirstName.ToUpper().Trim() &&
                              d.LastName.ToUpper().Trim() == src.LastName.ToUpper().Trim()))
                throw new ArgumentException("Такой автор уже есть!");
            return base.Create(src);
        }
    }
}
