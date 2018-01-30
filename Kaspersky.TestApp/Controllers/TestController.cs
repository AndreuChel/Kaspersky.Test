using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Kaspersky.TestApp.Controllers
{
    public class TestController : BaseApiController
    {
        public HttpResponseMessage Get()
        {
            var testString = "aaaabbbbcccc";
            return ToJson(testString);
        }
    }
}