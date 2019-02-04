using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Kaspersky.TestApp.DataLayer.BookDb.Entities;

namespace Kaspersky.TestApp.DataLayer.BookDb.Repo
{
	/// <summary>
	/// Обобщенный интерфейс для репозитория
	/// </summary>
	/// <typeparam name="T"></typeparam>
	public interface IRepository<T> where T: EntityBase
	{
		IEnumerable<T> GetAll();
		T Get(int id);
		int Create(T src);
		bool Update(int id, T src);
		bool Delete(int id);
	}

}
