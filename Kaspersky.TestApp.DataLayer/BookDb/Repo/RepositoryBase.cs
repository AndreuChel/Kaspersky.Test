using Kaspersky.TestApp.DataLayer.BookDb.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Repo
{
    public interface IRepository<T> where T: EntityBase
    {
        IEnumerable<T> GetAll();
        T Get(int id);
        int Create(T src);
        bool Update(int id, T src);
        bool Delete(int id);
    }

    public abstract class RepositoryBase<T> : IRepository<T>
        where T : EntityBase
    {
        public abstract List<T> Data { get; }

        public IEnumerable<T> GetAll() => Data;

        public T Get(int id) => Data.SingleOrDefault(a => a.id == id);

        public virtual int Create(T src)
        {
            src.id = Data.Any() ? Data.Select(el => el.id).Max() + 1 : 0;
            Data.Add(src);
            return src.id;
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
