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
        public string Title { get; set; }

        [MustHaveOneElement(ErrorMessage = "Book: At least a author is required")]
        public virtual ICollection<Author> Authors { get; set; } = new List<Author>();

        [Required]
        [Range(1, 10000, ErrorMessage = "Book PageCount: must be greater than 0 and less than 10000")]
        public int PageCount { get; set; }

        [MaxLength(30, ErrorMessage = "Book Title: The length of the field should not exceed 30 characters ")]
        public string Publisher { get; set; }

        [MinIntValue(1800, ErrorMessage = "Book: The \"Year\" parameter must be greater than 1800")]
        [LessCurrentYear]
        public string PublicYear { get; set; }
        
        [CorrectISBN]
        public string Isbn { get; set; }

        public string ImagePath { get; set; }
    }
}
