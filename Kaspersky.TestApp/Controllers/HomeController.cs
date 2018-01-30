using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Kaspersky.TestApp.Infrastructure.Injection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kaspersky.TestApp.Controllers
{
    public class HomeController : Controller
    {
        static HomeController()
        {
            NinjectResolver.Bind<IBookRepository>().To<BookRepository>().InSingletonScope(); 
            NinjectResolver.Bind<IAuthorRepository>().To<AuthorRepository>().InSingletonScope();
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}