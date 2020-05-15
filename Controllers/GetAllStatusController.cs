using System;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.ServiceProcess;
using System.Net.NetworkInformation;

namespace ServiceTracker.Controllers
{
    [Route("/services/status/[action]/{loggedIn?}")] //the [action] will automatically look at the action method names, dont have to specifiy individually 
                                                     //e.g. if url is '/services/status/pihole' in js, it will go to the pihole action method at bottom
    public class GetAllStatusController : Controller
    {
        private String _plexStatus { get; set; }
        private String _piHoleStatus { get; set; }
        private String _mailStatus { get; set; }
        private String _teleStatus { get; set; }

        public void setAllStatus(String Plex, String PiHole, String Mail, String Tele)
        {
            _plexStatus = Plex;
            _piHoleStatus = PiHole;
            _mailStatus = Mail;
            _teleStatus = Tele;
        }

        //[Route("/status/telegraf")]
        [HttpPost]
        //if you set a param inside Telegraf then we can use it as params
        //ex. if url is /services/telegraf?name=plex then we can say 'public IActionResult Telegraf(string name)'
        //the 'name' in the URL and 'name' as param have to be the same 
        public IActionResult Telegraf(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                Process[] tele = Process.GetProcessesByName("spotify");
                //Process.Start("C:\Program Files\telegraf\telegraf.exe");
                //foreach (var process in tele)
                //{
                //    process.Kill();
                //}
                if (tele.Length > 0)
                {
                    _teleStatus = "running";
                    return Json(new { status = _teleStatus });
                }
                else
                {
                    _teleStatus = "stopped/other";
                    return Json(new { status = _teleStatus });
                }
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }

        //[Route("/status/plex")]
        [HttpPost]
        public IActionResult Plex(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                Process[] plex = Process.GetProcessesByName("Plex Media Server");
                Console.WriteLine(plex);
                //Process.Start("C:\Program Files (x86)\Plex\Plex Media Server\Plex Media Server.exe");
                //foreach (var process in plex)
                //{
                //    process.Kill();
                //}

                if (plex.Length > 0)
                {
                    _plexStatus = "running";
                    return Json(new { status = _plexStatus });
                }
                else
                {
                    _plexStatus = "stopped/other";
                    return Json(new { status = _plexStatus });
                }
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }

        //[Route("/status/mail")]
        [HttpPost]
        public IActionResult Mail(int? loggedIn = 0)
        {
            if (loggedIn == 1)
            {
                ServiceController sc = new ServiceController("SMTPSVC", "ESXi-WinMail");
                switch (sc.Status)
                {
                    case ServiceControllerStatus.Running:
                        _mailStatus = "Running";
                        return Json(new { status = _mailStatus });
                    case ServiceControllerStatus.Stopped:
                        _mailStatus = "Stopped";
                        return Json(new { status = _mailStatus });
                    case ServiceControllerStatus.Paused:
                        _mailStatus = "Paused";
                        return Json(new { status = _mailStatus });
                    case ServiceControllerStatus.StopPending:
                        _mailStatus = "Stop Pending";
                        return Json(new { status = _mailStatus });
                    case ServiceControllerStatus.StartPending:
                        _mailStatus = "Start Pending";
                        return Json(new { status = _mailStatus });
                    default:
                        _mailStatus = "idk what's going on";
                        return Json(new { status = _mailStatus });
                }
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }

        //[Route("{loggedIn?}")]
        [HttpPost]
        public IActionResult piHole(int? loggedIn = 0)
        {
            //System.Diagnostics.Debug.WriteLine("logged in {0}", loggedIn);
            if (loggedIn == 1)
            {
                Ping ping = new Ping();
                PingReply pr = ping.Send("192.168.1.166");
                if (pr.Status.ToString() == "Success")
                {
                    _piHoleStatus = "running";
                    return Json(new { status = _piHoleStatus });
                }
                else
                {
                    _piHoleStatus = pr.Status.ToString();
                    return Json(new { status = _piHoleStatus });
                }
            }
            else
            {
                return Json(new { status = "Not logged in" });
            }
        }
    }
}
