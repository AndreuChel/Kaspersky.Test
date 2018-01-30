using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kaspersky.TestApp.DataLayer.Miscellaneous.ValidationAttributes
{
    internal class MustHaveOneElementAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
            => (value as IList)?.Count > 0 || false;
    }
}
