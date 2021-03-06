﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Text;
using System.Web.Http.ModelBinding;

namespace Kaspersky.TestApp.Controllers
{
	 /// <summary>
	 /// Базовый класс для контроллеров
	 /// </summary>
    public class BaseApiController : ApiController
    {
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
        protected string GetValidationErrorString(ModelStateDictionary state)
        {
            return "Ошибки при серверной валидации:\r\n" +
                    string.Join("\r\n - ", ModelState.Values.SelectMany(m => m.Errors).Select(e => e.ErrorMessage));
        }
    }
}
