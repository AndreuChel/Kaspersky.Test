using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.Miscellaneous.ValidationAttributes
{
    internal class LessCurrentYearAttribute : ValidationAttribute
    {

        public LessCurrentYearAttribute() {  }

        public override bool IsValid(object value)
        {
            int val = 0;
            return int.TryParse(value.ToString(), out val) && val <= DateTime.Now.Year;
        }
    }
}
