using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using Kaspersky.TestApp.DataLayer.BookDb.Repo;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Kaspersky.TestApp.UnitTest.DataLayer
{
	public class TestRepository : RepositoryBase<Book>
	{
		private static List<Book> _data = new List<Book>();
		public override List<Book> Data => _data ?? (_data = new List<Book>());

		public TestRepository(IEnumerable<Book> data)
		{
			_data = data != null ? new List<Book>(data) : new List<Book>();
		}
	}

	[TestClass]
	public class TestRepositories
	{
		[TestMethod]
		public void RepositoryBase_GetAll()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}});
			Assert.AreEqual(repo.GetAll().Count(), 1);
			Assert.AreEqual(repo.GetAll().ElementAt(0).Id, 999);
		}

		[TestMethod]
		public void RepositoryBase_GetOne()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999, Title="Test"}});
			Assert.AreEqual(repo.Get(999)?.Title, "Test");
		}

		[TestMethod]
		public void RepositoryBase_GetOne_NegativeId()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}});
			Assert.AreEqual(repo.Get(-1), null);
		}

		[TestMethod]
		public void RepositoryBase_GetOne_NotFound()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}});
			Assert.AreEqual(repo.Get(1), null);
		}

		[TestMethod]
		public void RepositoryBase_Create()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}});
			var result = repo.Create(new Book {Title = "Test"});

			Assert.AreEqual(result, 1000);
			Assert.AreEqual(repo.Data.Count, 2);
			Assert.AreEqual(repo.Data.Last().Title, "Test");
			Assert.AreEqual(repo.Data.Last().Id, 1000);
		}

		[TestMethod]
		public void RepositoryBase_Update()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}});
			var result = repo.Update(999, new Book {Id = 999, Title = "Test"});

			Assert.IsTrue(result);
			Assert.AreEqual(repo.Data.Count, 1);
			Assert.AreEqual(repo.Data.First().Title, "Test");
			Assert.AreEqual(repo.Data.First().Id, 999);
		}
		[TestMethod]
		public void RepositoryBase_Update_InvalidId()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}});
			var result = repo.Update(1, new Book {Id = 999, Title = "Test"});

			Assert.IsFalse(result);
			Assert.AreNotEqual(repo.Data.First().Title, "Test");
			Assert.AreEqual(repo.Data.First().Id, 999);
		}

		[TestMethod]
		public void RepositoryBase_Delete()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}, new Book {Id = 1111}});
			var result = repo.Delete(999);

			Assert.IsTrue(result);
			Assert.AreEqual(repo.Data.Count, 1);
			Assert.AreEqual(repo.Data.First().Id, 1111);
		}

		[TestMethod]
		public void RepositoryBase_Delete_InvalidId()
		{
			var repo = new TestRepository(new []{ new Book {Id = 999}, new Book {Id = 1111}});
			var result = repo.Delete(1);

			Assert.IsFalse(result);
			Assert.AreEqual(repo.Data.Count, 2);
		}
	}
}
