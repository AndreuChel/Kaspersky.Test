using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Kaspersky.TestApp.Miscellaneous.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Kaspersky.TestApp.Controllers
{
    public class AuthorController : BaseApiController
    {
        private IAuthorRepository AuthorRepository { get; set; }
        public AuthorController(IAuthorRepository _ar) { AuthorRepository = _ar; }

        public HttpResponseMessage Get()
        {
            try {
                var result = AuthorRepository.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        public HttpResponseMessage Get(int id)
        {
            try {
                var result = AuthorRepository.Get(id);
                if (result == null)
                    return Request.CreateResponse(HttpStatusCode.NotFound, $"Element '{id} not found!'");
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [ValidateModel]
        public HttpResponseMessage Post(Author value)
        {
            try {
                var result = AuthorRepository.Create(value);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex) {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
