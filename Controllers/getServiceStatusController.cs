using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;

namespace ServiceTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class getServiceStatusController : ControllerBase
    {
        [HttpGet]
        public Process[] Index() //getTelegrafStatus
        {
            Process[] tele = Process.GetProcessesByName("spotify");
            Console.WriteLine(tele);
            //if (tele.Length > 0)
            //{
                return tele;
            //} 
            //Process.Start("C:\Program Files\telegraf\telegraf.exe");
            //foreach (var process in tele)
            //{
            //    process.Kill();
            //}
        }

        //private JsonResult Json(Process[] tele)
        //{
        //    throw new NotImplementedException();
        //}

        //private JsonResult Json(int x)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
