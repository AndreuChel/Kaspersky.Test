using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Kaspersky.TestApp.Miscellaneous.Filters;

namespace Kaspersky.TestApp.Controllers
{
    public class BookController : BaseApiController
    {
        private IBookRepository BookRepository { get; set; }
        public BookController(IBookRepository _br) { BookRepository = _br; }

        // GET: api/Book
        public HttpResponseMessage Get()
        {
            try {
                var result = BookRepository.GetAll();
                return  Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)  {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        // GET: api/Book/5
        public HttpResponseMessage Get(int id)
        {
            try {
                var result = BookRepository.Get(id);
                
                if (result == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, $"Element '{id} not found!'");

                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        // POST: api/Book
        [ValidateModel]
        public HttpResponseMessage Post([FromBody]Book value)
        {
            try {
                var newId = BookRepository.Create(value);
                return Request.CreateResponse(HttpStatusCode.OK, newId);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            };
        }

        // PUT: api/Book/5
        [ValidateModel]
        public HttpResponseMessage Put(int id, [FromBody] Book value)
        {
            try {
                var r = BookRepository.Update(id, value);
                return Request.CreateResponse(HttpStatusCode.OK, r);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            };
        }

        // DELETE: api/Book/5
        public HttpResponseMessage Delete(int id)
        {
            try {
                var r = BookRepository.Delete(id);
                return Request.CreateResponse(HttpStatusCode.OK, r);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            };
        }
    }
}
