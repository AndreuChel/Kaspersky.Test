using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Ninject.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer
{
    public class DataLayerNinjectModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IBookRepository>().To<BookRepository>().InSingletonScope();
            Bind<IAuthorRepository>().To<AuthorRepository>().InSingletonScope();
        }
    }

}
