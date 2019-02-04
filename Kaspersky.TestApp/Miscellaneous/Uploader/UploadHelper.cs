using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace Kaspersky.TestApp.Miscellaneous.Uploader
{
	public class UploadHelper : IUploadHelper
	{
		public string MapPath(string subFolder)
		{
			return HttpContext.Current == null
				? Path.Combine(Directory.GetCurrentDirectory(), subFolder)
				: HttpContext.Current.Server.MapPath(subFolder);
		}

		public async Task<string> UploadFileAsync(HttpRequestMessage request, string serverPath)
		{
			if (!request.Content.IsMimeMultipartContent())
				throw new InvalidOperationException();

			var provider = new MultipartMemoryStreamProvider();
            
			await request.Content.ReadAsMultipartAsync(provider);

			string filename = "";
			foreach (var file in provider.Contents)
			{
				if (!string.IsNullOrEmpty(file.Headers.ContentDisposition.FileName))
				{
					var f = file.Headers.ContentDisposition.FileName.Trim('\"');
					filename = $"{Path.GetFileNameWithoutExtension(f)}.{Math.Abs(DateTime.Now.GetHashCode())}{Path.GetExtension(f)}";
					byte[] fileArray = await file.ReadAsByteArrayAsync();

					using (FileStream fs = new FileStream(serverPath + filename, FileMode.Create))
					{
						await fs.WriteAsync(fileArray, 0, fileArray.Length);
					}
				}
			}
			return filename;
		}
	}
}