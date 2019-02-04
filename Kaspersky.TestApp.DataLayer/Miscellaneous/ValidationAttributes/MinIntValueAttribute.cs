using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.Miscellaneous.ValidationAttributes
{
	 /// <summary>
	 /// Атрибут валидации. Элемент должен быть не меньше определенного значения
	 /// </summary>
    internal class MinIntValueAttribute : ValidationAttribute
    {
        public int MinValue { get; }

        public MinIntValueAttribute(int val) { MinValue = val; }

        public override bool IsValid(object value)
        {
	        return int.TryParse(value.ToString(), out var val) && val >= MinValue;
        }
    }
}
