using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Entities
{
    public class Author : EntityBase
    {
        [Required]
        [MaxLength(20, ErrorMessage = "FirstName: The length of the field should not exceed 20 characters ")]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(20, ErrorMessage = "LastName: The length of the field should not exceed 20 characters ")]
        public string LastName { get; set; }

        public virtual ICollection<Book> Books { get; set; }
    }
}
