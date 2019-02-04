

using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Kaspersky.TestApp.UnitTest.DataLayer
{
	[TestClass]
	public class TestModelValidators
	{
		private Book _testBook = new Book {
			Id = 0, Title = "C# 4.0. Полное руководство",
			Authors = new[] {new Author {Id = 0, FirstName = "Герберт", LastName = "Шилдт"}},
			PageCount = 111, Publisher = "Вильямс", PublicYear = "1978", Isbn = "032157351X",
			ImagePath = "./assets/images/b1.jpg"

		};

		private static bool TestModel<T>(T model)
		{
			var context = new ValidationContext(model, null, null);
			var results = new List<ValidationResult>();
			TypeDescriptor.AddProviderTransparent(new AssociatedMetadataTypeTypeDescriptionProvider(typeof(T), typeof(T)), typeof(T));

			return Validator.TryValidateObject(model, context, results, true);
		}

		[TestMethod]
		public void ValidateBook()
		{
			Assert.IsTrue(TestModel(_testBook));
		}
		
		[TestMethod]
		public void ValidateBook_PageCountError()
		{
			_testBook.PageCount = 99999;
			Assert.IsFalse(TestModel(_testBook));
		}

		[TestMethod]
		public void ValidateBook_PublicYearMin1800()
		{
			_testBook.PublicYear = "1700";
			Assert.IsFalse(TestModel(_testBook));
		}

		[TestMethod]
		public void ValidateBook_PublicYearLessCurrentYear()
		{
			_testBook.PublicYear = "2222";
			Assert.IsFalse(TestModel(_testBook));
		}

		[TestMethod]
		public void ValidateBook_PublisherNameBig()
		{
			_testBook.Publisher = string.Join("", Enumerable.Range(0, 31).Select(v=>"a"));
			Assert.IsFalse(TestModel(_testBook));
		}

		[TestMethod]
		public void ValidateBook_AuthorsListIsEmpty()
		{
			var invalidBook = new Book {
				Id = 0, Title = "C# 4.0. Полное руководство",
				PageCount = 111, Publisher = "Вильямс", PublicYear = "1978", Isbn = "032157351X",
				ImagePath = "./assets/images/b1.jpg"
			};			
			Assert.IsFalse(TestModel(invalidBook));
		}

		[TestMethod]
		public void ValidateAuthor()
		{
			var author = new Author {Id = 0, FirstName = "Герберт", LastName = "Шилдт"};
			Assert.IsTrue(TestModel(author));
		}

		[TestMethod]
		public void ValidateAuthor_BigFirstName()
		{
			var author = new Author {
				Id = 0, LastName = "Шилдт",
				FirstName = string.Join("", Enumerable.Range(0, 21).Select(v => "a"))
			};
			Assert.IsFalse(TestModel(author));
		}

		[TestMethod]
		public void ValidateAuthor_BigLatName()
		{
			var author = new Author {
				Id = 0, FirstName = "Герберт",
				LastName = string.Join("", Enumerable.Range(0, 21).Select(v => "a"))
			};

			Assert.IsFalse(TestModel(author));
		}
	}
}
