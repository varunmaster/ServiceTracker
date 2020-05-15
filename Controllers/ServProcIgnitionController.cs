using System;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.ServiceProcess;

namespace ServiceTracker.Controllers
{
    public class ServProcIgnitionController : Controller
    {
        [Route("/ignition/kill/[action]/{loggedIn?}")]
        [HttpPost]
        public IActionResult killTelegraf(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                foreach (var process in Process.GetProcessesByName("spotify"))
                {
                    process.Kill();
                    return Json(new { status = "Killed" });
                }
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }

            return null;
        }

        [Route("/ignition/start/[action]/{loggedIn?}")]
        [HttpPost]
        public IActionResult startTelegraf(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                Process.Start("C:\\Users\\vm305\\AppData\\Roaming\\Spotify\\Spotify.exe");
                //Process.Start("C:\\Program Files\\telegraf\\telegraf.exe");
                return Json(new { status = "started" });
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }
    }
}