using System;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.ServiceProcess;

namespace ServiceTracker.Controllers
{
    public class ServProcIgnitionController : Controller
    {
        #region Telegraf start/kill
        [Route("/ignition/kill/[action]/{loggedIn?}")]
        [HttpPost]
        public IActionResult killTelegraf(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                foreach (var process in Process.GetProcessesByName("telegraf"))
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
                //Process.Start("C:\\Users\\vm305\\AppData\\Roaming\\Spotify\\Spotify.exe");
                //Process.Start("C:\\Program Files\\telegraf\\telegraf.exe");
                var proc = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = @"C:\Program Files\telegraf\telegraf.exe",
                        UseShellExecute = false,
                        RedirectStandardOutput = true,
                        CreateNoWindow = false
                    }
                };
                proc.Start();
                return Json(new { status = "Started" });
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }
        #endregion 

        #region Plex start/kill
        [Route("/ignition/kill/[action]/{loggedIn?}")]
        [HttpPost]
        public IActionResult killPlex(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                foreach (var process in Process.GetProcessesByName("Plex Media Server"))
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
        public IActionResult startPlex(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                Process.Start("C:\\Program Files (x86)\\Plex\\Plex Media Server\\Plex Media Server.exe");
                return Json(new { status = "Started" });
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }
        #endregion

        #region Mail start/kill
        [Route("/ignition/kill/[action]/{loggedIn?}")]
        [HttpPost]
        public IActionResult killMail(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                ServiceController sc = new ServiceController("SMTPSVC", "ESXi-WinMail");
                sc.Stop();
                return Json(new { status = "Killed" });
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }

        [Route("/ignition/start/[action]/{loggedIn?}")]
        [HttpPost]
        public IActionResult startMail(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                ServiceController sc = new ServiceController("SMTPSVC", "ESXi-WinMail");
                sc.Start();
                return Json(new { status = "Started" });
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }
        #endregion
    }
}