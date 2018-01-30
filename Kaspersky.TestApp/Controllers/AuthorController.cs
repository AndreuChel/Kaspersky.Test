using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Kaspersky.TestApp.Infrastructure.Injection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using rep = Kaspersky.TestApp.DataLayer.BookDb.Entities;

namespace Kaspersky.TestApp.Controllers
{
    public class AuthorController :  ApiController
    {
        // GET: api/Book
        public IEnumerable<rep.Author> Get()
        {
            return NinjectResolver.Get<IAuthorRepository>().GetAll();
        }

        // GET: api/Book/5
        //[ResponseType(typeof(rep.Author))]
        public HttpResponseMessage Get(int id)
        {
            var result = new HttpResponseMessage(HttpStatusCode.BadRequest);
            try
            {
                var elem = NinjectResolver.Get<IAuthorRepository>().Get(id);
                if (elem != null) result = Request.CreateResponse(HttpStatusCode.OK, elem);
            }
            catch (Exception ex) { result = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); }

            return result;
        }

        // POST: api/Book
        [ResponseType(typeof(int))]
        public HttpResponseMessage Post(rep.Author value)
        {
            var result = new HttpResponseMessage(HttpStatusCode.BadRequest);
            try
            {
                var newId = NinjectResolver.Get<IAuthorRepository>().Create(value);
                result = Request.CreateResponse(HttpStatusCode.OK, newId);
            }
            catch (Exception ex) { result = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); }

            return result;
        }
    }
}
