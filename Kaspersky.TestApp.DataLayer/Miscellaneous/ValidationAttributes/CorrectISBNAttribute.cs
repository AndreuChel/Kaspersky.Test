using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.Miscellaneous.ValidationAttributes
{
	 /// <summary>
	 /// Атрибут валидации. Проверка валидности кода ISBN
	 /// </summary>
    internal class CorrectISBNAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null) return false;

            var isbn = value.ToString().Replace("-", "").Trim().ToUpper();
            var nums = isbn.Select(ch => (ch != 'X') ? (int)Char.GetNumericValue(ch) : 10).ToList();

            return nums.Count == 10 &&
                   nums[9] == 11 - nums.Take(9).Select((item, index) => (nums.Count - index) * item).Sum() % 11;
        }
    }
}
