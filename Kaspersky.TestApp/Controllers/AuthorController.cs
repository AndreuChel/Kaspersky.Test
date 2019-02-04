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
	 /// <summary>
	 /// Контроллер для работы с авторами книг (получения списка, редактирование, удаление, ...)
	 /// </summary>
	 
    public class AuthorController : BaseApiController
    {
	    private IAuthorRepository AuthorRepository { get; }
	    public AuthorController(IAuthorRepository authorRepository) { AuthorRepository = authorRepository; }

        public IHttpActionResult Get()
        {
	        try {
		        return Ok(AuthorRepository.GetAll());
	        }
	        catch (Exception ex) {
		        return InternalServerError(ex);
	        }
        }

        public IHttpActionResult Get(int id)
        {
            try {
	            var result = AuthorRepository.Get(id);
	            return result != null ? (IHttpActionResult) Ok(result) : NotFound();
            }
            catch (Exception ex) {
	            return InternalServerError(ex);
            }
        }

        [ValidateModel]
        public IHttpActionResult Post(Author value)
        {
            try {
	            return Ok(AuthorRepository.Create(value));
            }
            catch (Exception ex) {
	            return InternalServerError(ex);
            }
        }
    }
}
