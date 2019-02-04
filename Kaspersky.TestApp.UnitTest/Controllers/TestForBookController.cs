using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Kaspersky.TestApp.Controllers;
using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Kaspersky.TestApp.UnitTest.Controllers
{
	[TestClass]
	public class TestForBookController
	{
		private readonly Book _testBook = new Book
		{
			Id = 0, Title = "C# 4.0. Полное руководство",
			Authors = new[] {new Author {Id = 0, FirstName = "Герберт", LastName = "Шилдт"}},
			PageCount = 946, Publisher = "Вильямс", PublicYear = "2015", Isbn = "032157351X",
			ImagePath = "./assets/images/b1.jpg"
		};

		[TestMethod]
		public void BookController_GetAll()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.GetAll()).Returns(new List<Book> {_testBook});

			var bookController = new BookController(mock.Object);

			var result = bookController.Get() as OkNegotiatedContentResult<IEnumerable<Book>>;
			
			Assert.IsNotNull(result);
			mock.Verify(m => m.GetAll());
			Assert.AreEqual(result.Content.Count(), 1);
			Assert.AreEqual(result.Content.ElementAt(0).Isbn, "032157351X");
		}

		[TestMethod]
		public void BookController_GetAll_ThrowException()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.GetAll()).Throws(new InvalidOperationException());

			var bookController = new BookController(mock.Object);

			var result = bookController.Get();

			Assert.IsInstanceOfType(result, typeof(ExceptionResult));
		}

		[TestMethod]
		public void BookController_GetOne()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Get(It.IsAny<int>())).Returns(_testBook);

			var bookController = new BookController(mock.Object);

			var result = bookController.Get(111) as OkNegotiatedContentResult<Book>;
			
			Assert.IsNotNull(result);
			mock.Verify(m => m.Get(It.IsAny<int>()));
			
			Assert.AreEqual(result.Content.Isbn, "032157351X");
		}

		[TestMethod]
		public void BookController_GetOne_NotFound()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Get(It.IsAny<int>())).Returns(default(Book));

			var bookController = new BookController(mock.Object);

			var result = bookController.Get(111);

			Assert.IsInstanceOfType(result, typeof(NotFoundResult));
		}


		[TestMethod]
		public void BookController_GetOne_ThrowException()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Get(It.IsAny<int>())).Throws(new InvalidOperationException());

			var bookController = new BookController(mock.Object);

			var result = bookController.Get(111);

			Assert.IsInstanceOfType(result, typeof(ExceptionResult));
		}

		[TestMethod]
		public void BookController_Post()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Create(It.IsAny<Book>())).Returns(1);

			var bookController = new BookController(mock.Object);

			var result = bookController.Post(_testBook) as OkNegotiatedContentResult<int>;
			
			Assert.IsNotNull(result);
			mock.Verify(m => m.Create(It.IsAny<Book>()));
			Assert.AreEqual(result.Content, 1);
		}

		[TestMethod]
		public void BookController_Post_ThrowException()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Create(It.IsAny<Book>())).Throws(new Exception());

			var bookController = new BookController(mock.Object);

			var result = bookController.Post(_testBook);
			Assert.IsInstanceOfType(result, typeof(ExceptionResult));
		}

		[TestMethod]
		public void BookController_Put()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Update(It.IsAny<int>(), It.IsAny<Book>())).Returns(true);

			var bookController = new BookController(mock.Object);
			
			var result = bookController.Put(999, _testBook);

			Assert.IsInstanceOfType(result, typeof(OkResult));
			mock.Verify(m => m.Update(It.IsAny<int>(), It.IsAny<Book>()));
		}

		[TestMethod]
		public void BookController_Put_IncorrectId()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Update(It.IsAny<int>(), It.IsAny<Book>())).Returns(false);

			var bookController = new BookController(mock.Object);
			
			var result = bookController.Put(999, _testBook);

			Assert.IsInstanceOfType(result, typeof(NotFoundResult));
		}

		[TestMethod]
		public void BookController_Delete()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Delete(It.IsAny<int>())).Returns(true);

			var bookController = new BookController(mock.Object);
			
			var result = bookController.Delete(999);

			Assert.IsInstanceOfType(result, typeof(OkResult));
		}

		[TestMethod]
		public void BookController_Delete_IncorrectId()
		{
			var mock = new Mock<IBookRepository>();
			mock.Setup(m => m.Delete(It.IsAny<int>())).Returns(false);

			var bookController = new BookController(mock.Object);
			
			var result = bookController.Delete(999);

			Assert.IsInstanceOfType(result, typeof(NotFoundResult));
		}
	}
}