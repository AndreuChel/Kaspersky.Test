using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Kaspersky.TestApp.Miscellaneous.Filters
{
	 /// <summary>
	 /// Фильтр для методов web api контроллеров. Проверка валидности переданной модели
	 /// </summary>
    [AttributeUsage(AttributeTargets.Method)]
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ModelState.IsValid == false)
            {
                var content = "Ошибки при серверной валидации:\r\n - " +
                    string.Join("\r\n - ", actionContext.ModelState.Values
                                                        .Where(m=>m.Errors.Any())
                                                        .Select(m => m.Errors[0].ErrorMessage));
	            
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.BadRequest, content);
            }
        }
    }
}