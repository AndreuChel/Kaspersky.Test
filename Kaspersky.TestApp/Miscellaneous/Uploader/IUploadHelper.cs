using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace Kaspersky.TestApp.Miscellaneous.Uploader
{
	public interface IUploadHelper
	{
		string MapPath(string subFolder);
		
		Task<string> UploadFileAsync(HttpRequestMessage request, string serverPath);
	}
}