
using Ninject;
using Ninject.Web.WebApi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Ninject.Web.WebApi.Filter;
using System.Web.Http.Validation;
using Kaspersky.TestApp.DataLayer;
using Kaspersky.TestApp.Miscellaneous.Uploader;

namespace Kaspersky.TestApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Внедрение зависимостей
            var kernel = new StandardKernel(new DataLayerNinjectModule());
	         kernel.Bind<IUploadHelper>().To<UploadHelper>();

	         config.DependencyResolver = new NinjectDependencyResolver(kernel);

            // Маршруты веб-API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
