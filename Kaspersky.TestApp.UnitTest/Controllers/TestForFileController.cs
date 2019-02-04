using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Results;
using System.Web.Routing;
using Kaspersky.TestApp.Controllers;
using Kaspersky.TestApp.Miscellaneous.Uploader;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;

namespace Kaspersky.TestApp.UnitTest.Controllers
{
	[TestClass]
	public class TestForFileController
	{
		[TestMethod]
		public async Task FileController_UploadSuccess()
		{
			var mock = new Mock<IUploadHelper>();
			mock.Setup(m => m.UploadFileAsync(null, It.IsAny<string>())).ReturnsAsync("test.txt");

			var fileController = new FileController(mock.Object);

			var result = await fileController.Upload();
			Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<string>));
			Assert.AreEqual((result as OkNegotiatedContentResult<string>)?.Content, "./assets/images/test.txt");
		}

		[TestMethod]
		public async Task FileController_Upload_ThrowException()
		{
			var mock = new Mock<IUploadHelper>();
			mock.Setup(m => m.UploadFileAsync(null, It.IsAny<string>())).ThrowsAsync(new Exception());

			var fileController = new FileController(mock.Object);

			var result = await fileController.Upload();
			Assert.IsInstanceOfType(result, typeof(ExceptionResult));
		}
	}
}
