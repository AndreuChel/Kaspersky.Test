using System;
using System.Collections.Generic;
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
	public class TestForAuthorController
	{
		private readonly Author _testAuthor = new Author {
			Id = 0, FirstName="Александр", LastName = "Пушкин"
		};

		[TestMethod]
		public void AuthorController_GetAll()
		{
			var mock = new Mock<IAuthorRepository>();
			mock.Setup(m => m.GetAll()).Returns(new List<Author> {_testAuthor});

			var authorController = new AuthorController(mock.Object);

			var result = authorController.Get() as OkNegotiatedContentResult<IEnumerable<Author>>;
			
			Assert.IsNotNull(result);
			mock.Verify(m => m.GetAll());
			Assert.AreEqual(result.Content.Count(), 1);
			Assert.AreEqual(result.Content.ElementAt(0).FirstName, "Александр");
		}

		[TestMethod]
		public void AuthorController_GetAll_RepositoryException()
		{
			var mock = new Mock<IAuthorRepository>();
			mock.Setup(m => m.GetAll()).Throws(new Exception());

			var authorController = new AuthorController(mock.Object);

			var result = authorController.Get();
			Assert.IsInstanceOfType(result, typeof(ExceptionResult));
		}

		[TestMethod]
		public void AuthorController_GetOne()
		{
			var mock = new Mock<IAuthorRepository>();
			mock.Setup(m => m.Get(It.IsAny<int>())).Returns(_testAuthor);

			var authorController = new AuthorController(mock.Object);
			var result = authorController.Get(0) as OkNegotiatedContentResult<Author>;
			
			Assert.IsNotNull(result);
			mock.Verify(m => m.Get(It.IsAny<int>()));
			Assert.AreEqual(result.Content.FirstName, "Александр");
		}

		[TestMethod]
		public void AuthorController_GetOne_NotFound()
		{
			var mock = new Mock<IAuthorRepository>();
			mock.Setup(m => m.Get(It.IsAny<int>())).Returns(default(Author));

			var authorController = new AuthorController(mock.Object);
			var result = authorController.Get(999);

			Assert.IsInstanceOfType(result, typeof(NotFoundResult));
		}

		[TestMethod]
		public void AuthorController_Post()
		{
			var mock = new Mock<IAuthorRepository>();
			mock.Setup(m => m.Create(It.IsAny<Author>())).Returns(1);

			var authorController = new AuthorController(mock.Object);
			var result = authorController.Post(_testAuthor) as OkNegotiatedContentResult<int>;
			
			Assert.IsNotNull(result);
			mock.Verify(m => m.Create(It.IsAny<Author>()));
			Assert.AreEqual(result.Content, 1);
		}
	}
}
