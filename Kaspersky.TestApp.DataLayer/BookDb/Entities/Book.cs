using Kaspersky.TestApp.DataLayer.Miscellaneous.ValidationAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.BookDb.Entities
{
    
    public class Book : EntityBase
    {
        [Required]
        [MaxLength(30, ErrorMessage = "Book Title: The length of the field should not exceed 30 characters ")]
        public string title { get; set; }

        [MustHaveOneElement(ErrorMessage = "Book: At least a author is required")]
        public virtual ICollection<Author> authors { get; set; }

        [Required]
        [Range(1, 10000, ErrorMessage = "Book PageCount: must be greater than 0 and less than 10000")]
        public int pCount { get; set; }

        [MaxLength(30, ErrorMessage = "Book Title: The length of the field should not exceed 30 characters ")]
        public string publisher { get; set; }

        [MinIntValue(1800, ErrorMessage = "Book: The \"Year\" parameter must be greater than 1800")]
        [LessCurrentYear]
        public string publicYear { get; set; }
        
        [CorrectISBN]
        public string ISBN { get; set; }

        public string imagePath { get; set; }

        public Book() {
            authors = new List<Author>();
        }
    }
}
