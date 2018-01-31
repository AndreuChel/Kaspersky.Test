
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
    public class BookController : BaseApiController
    {
        // GET: api/Book
        public IEnumerable<rep.Book> Get()
        {
            return NinjectResolver.Get<IBookRepository>().GetAll();
        }

        // GET: api/Book/5
        [ResponseType(typeof(rep.Book))]
        public HttpResponseMessage Get(int id)
        {
            var result = new HttpResponseMessage(HttpStatusCode.BadRequest);
            try {
                var elem = NinjectResolver.Get<IBookRepository>().Get(id);
                if (elem != null) result = Request.CreateResponse(HttpStatusCode.OK, elem);
            }
            catch { /*ignore*/ }

            return result;
        }

        // POST: api/Book
        [ResponseType(typeof(int))]
        public HttpResponseMessage Post([FromBody]rep.Book value)
        {
            var result = new HttpResponseMessage(HttpStatusCode.BadRequest);

            try {
                if (ModelState.IsValid) {
                    var newId = NinjectResolver.Get<IBookRepository>().Create(value);
                    result = Request.CreateResponse(HttpStatusCode.OK, newId);
                }
                else
                    result = Request.CreateResponse(HttpStatusCode.BadRequest, GetValidationErrorString(ModelState));
                
            }
            catch { /*ignore*/ };

            return result;
        }

        // PUT: api/Book/5
        [ResponseType(typeof(bool))]
        public HttpResponseMessage Put(int id, [FromBody] rep.Book value)
        {
            var result = new HttpResponseMessage(HttpStatusCode.BadRequest);
            try
            {
                if (ModelState.IsValid) {
                    var r = NinjectResolver.Get<IBookRepository>().Update(id, value);
                    result = Request.CreateResponse(HttpStatusCode.OK, r);
                }
                else
                    result = Request.CreateResponse(HttpStatusCode.BadRequest, GetValidationErrorString(ModelState));
            }
            catch { /*ignore*/ };

            return result;
        }

        // DELETE: api/Book/5
        [ResponseType(typeof(bool))]
        public HttpResponseMessage Delete(int id)
        {
            var result = new HttpResponseMessage(HttpStatusCode.BadRequest);
            try
            {
                var r = NinjectResolver.Get<IBookRepository>().Delete(id);
                result = Request.CreateResponse(HttpStatusCode.OK, r);
            }
            catch { /*ignore*/ };

            return result;
        }
    }
}
