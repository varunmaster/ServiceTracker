using System;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.ServiceProcess;
using System.Net.NetworkInformation;

namespace ServiceTracker.Controllers
{
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

        //[ApiController]
        [Route("/services/telegraf")]
        [HttpPost]
        //if you set a param inside Telegraf then we can use it as params
        //ex. if url is /services/telegraf?name=plex then we can say 'public IActionResult Telegraf(string name)'
        //the 'name' in the URL and 'name' as param have to be the same 
        public String Telegraf()
        {
            Process[] tele = Process.GetProcessesByName("telegraf");
            Console.WriteLine(tele);
            //Process.Start("C:\Program Files\telegraf\telegraf.exe");
            //foreach (var process in tele)
            //{
            //    process.Kill();
            //}
            if (tele.Length > 0)
            {
                _teleStatus = "running";
                return _teleStatus;
            }
            else
            {
                _teleStatus = "stopped/other";
                return _teleStatus;
            }
        }

        [Route("/services/plex")]
        [HttpPost]
        public String Plex()
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
                return _plexStatus;
            }
            else
            {
                _plexStatus = "stopped/other";
                return _plexStatus;
            }
        }

        [Route("/services/mail")]
        [HttpPost]
        public String Mail()
        {
            ServiceController sc = new ServiceController("SMTPSVC", "ESXi-WinMail");
            switch (sc.Status)
            {
                case ServiceControllerStatus.Running:
                    _mailStatus = "Running";
                    return _mailStatus;
                case ServiceControllerStatus.Stopped:
                    _mailStatus =  "Stopped";
                    return _mailStatus;
                case ServiceControllerStatus.Paused:
                    _mailStatus = "Paused";
                    return _mailStatus;
                case ServiceControllerStatus.StopPending:
                    _mailStatus = "Stop Pending";
                    return _mailStatus;
                case ServiceControllerStatus.StartPending:
                    _mailStatus = "Start Pending";
                    return _mailStatus;
                default:
                    _mailStatus = "idk what's going on";
                    return _mailStatus;
            }
        }

        [Route("/services/pihole")]
        [HttpPost]
        public String piHole()
        {
            Ping ping = new Ping();
            PingReply pr = ping.Send("192.168.1.166");
            if (pr.Status.ToString() == "Success")
            {
                _piHoleStatus = "running";
                return _piHoleStatus;
            }
            else
            {
                _piHoleStatus = pr.Status.ToString();
                return _piHoleStatus;
            }
        }
    }
}
