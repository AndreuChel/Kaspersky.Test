using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Repo
{
	 /// <summary>
	 /// Базовый класс репозитория
	 /// </summary>
	 /// <typeparam name="T"></typeparam>
    public abstract class RepositoryBase<T> : IRepository<T>
        where T : EntityBase
    {
        public abstract List<T> Data { get; }

        public IEnumerable<T> GetAll()
        {
	        return Data;
        }

	     public T Get(int id) => Data.SingleOrDefault(a => a.Id == id);

        public virtual int Create(T src)
        {
            src.Id = Data.Any() ? Data.Select(el => el.Id).Max() + 1 : 0;
            Data.Add(src);
            return src.Id;
        }

        public virtual bool Delete(int id)
        {
            var element = Get(id);
            return element != null && Data.Remove(element);
        }

        public virtual bool Update(int id, T src)
        {
            var result = false;

            var element = Get(id);
            if (element != null)
            {
                var tId = Data.IndexOf(element);
                Data.Remove(element); Data.Insert(tId, src);
                result = true;
            }

            return result;
        }
    }
}
