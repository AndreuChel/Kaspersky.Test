using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Kaspersky.TestApp.Miscellaneous.Uploader;

namespace Kaspersky.TestApp.Controllers
{
	 /// <summary>
	 /// Контроллер для загрузки файлов на сервер
	 /// </summary>
    public class FileController : BaseApiController
	 {
		 private IUploadHelper Uploader { get; }

		 public FileController(IUploadHelper uploader)
		 {
			 Uploader = uploader;
		 }

		 [ActionName("Upload")]
		 [HttpPost]
		 public async Task<IHttpActionResult> Upload()
		 {
			 try
			 {
				 const string uploadFolder = "/assets/images/";
				 var filename = await Uploader.UploadFileAsync(Request, Uploader.MapPath($"~{uploadFolder}"));

				 return Ok($".{uploadFolder}{filename}");
			 }
			 catch (Exception ex)
			 {
				 return InternalServerError(ex);
			 }
		 }
    }
}
