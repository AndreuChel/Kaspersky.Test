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
	 /// <summary>
	 /// Контроллер для работы с книгами (получения списка, редактирование, удаление, ...)
	 /// </summary>
    public class BookController : BaseApiController
    {
        private IBookRepository BookRepository { get; }
        public BookController(IBookRepository bookRepository) { BookRepository = bookRepository; }

        //GET: api/Book
        public IHttpActionResult Get() {
	        try {
		        return Ok(BookRepository.GetAll());
	        }
	        catch (Exception ex) {
		        return InternalServerError(ex);
	        }
        }

        // GET: api/Book/5
        public IHttpActionResult Get(int id)
        {
	        try {
		        var result = BookRepository.Get(id);
		        return result != null ? (IHttpActionResult) Ok(result) : NotFound();
	        }
	        catch (Exception ex) {
		        return InternalServerError(ex);
	        }
        }

        // POST: api/Book
        [ValidateModel]
        public IHttpActionResult Post([FromBody]Book value) 
		  {
			  try {
				  return Ok(BookRepository.Create(value));
			  }
			  catch (Exception ex) {
				  return InternalServerError(ex);
			  }
		  }

        // PUT: api/Book/5
        [ValidateModel]
        public IHttpActionResult Put(int id, [FromBody] Book value) 
	        => BookRepository.Update(id, value) ? (IHttpActionResult) Ok() : NotFound();

        // DELETE: api/Book/5
        public IHttpActionResult Delete(int id) 
	        => BookRepository.Delete(id) ? (IHttpActionResult) Ok() : NotFound(); 
        
    }
}
