using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.Miscellaneous.ValidationAttributes
{
	/// <summary>
	/// Атрибут валидации. Указанный год не может быть больше текущего
	/// </summary>
	internal class LessCurrentYearAttribute : ValidationAttribute
   {
        public override bool IsValid(object value)
        {
	        return int.TryParse(value.ToString(), out var val) && val <= DateTime.Now.Year;
        }
   }
}
