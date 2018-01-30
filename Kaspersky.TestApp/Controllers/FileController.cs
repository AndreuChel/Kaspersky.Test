using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Kaspersky.TestApp.Controllers
{
    public class FileController : BaseApiController
    {
        [ActionName("Upload")]
        [HttpPost]
        public async Task<IHttpActionResult> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent()) return BadRequest();

            IHttpActionResult result = Ok();

            var provider = new MultipartMemoryStreamProvider();
            
            string root = System.Web.HttpContext.Current.Server.MapPath("~/assets/images/");
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                string filename = "";
                foreach (var file in provider.Contents)
                {
                    if (!string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName))
                    {
                        var f = file.Headers.ContentDisposition.FileName.Trim('\"');
                        filename = $"{Path.GetFileNameWithoutExtension(f)}.{Math.Abs(DateTime.Now.GetHashCode())}{Path.GetExtension(f)}";
                        byte[] fileArray = await file.ReadAsByteArrayAsync();

                        using (FileStream fs = new FileStream(root + filename, FileMode.Create))
                        {
                            await fs.WriteAsync(fileArray, 0, fileArray.Length);
                        }
                    }
                }
                result = Ok($"./assets/images/{filename}");
            }
            catch (Exception exception) { result = BadRequest(exception.Message); }

            return result;
        }
    }
}
