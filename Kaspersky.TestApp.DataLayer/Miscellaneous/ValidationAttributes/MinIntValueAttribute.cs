using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.Miscellaneous.ValidationAttributes
{
    internal class MinIntValueAttribute : ValidationAttribute
    {
        public int MinValue { get; private set; }

        public MinIntValueAttribute(int val) { MinValue = val; }

        public override bool IsValid(object value)
        {
            int val = 0;
            return int.TryParse(value.ToString(), out val) && val >= MinValue;
        }
    }
}
