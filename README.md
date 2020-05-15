# ServiceTracker

ServiceTracker is a web application (ASP.Net Core) that monitors the status of Plex, SMTP service, Telegraf service (for Grafana), and PiHole service. This web application allows you to see the current status and Start/Stop the service (some of which are installed on a remote machine).

## Installation to IIS

1. Open cmd.exe and go the project folder and run the command

```bash
dotnet publish -c Release
```

2. Then go to project folder and go to "bin -> Release -> netcoreapp3.1 -> publish" and copy it and paste it inside of a new folder in the C:\inetpub\wwwroot directory on the hosting server
3. Go to IIS manager and right-click on "Sites" -> Add Website -> Give it a name and change the port number to any that is not currently being used. Change the physical path to the folder location where you copied the folder to in step 2. Then click Ok.
4. Now go to Application Pools -> right-click on the new pool that was created (should have the same name as you put in step 3) -> Basic Settings -> Set ".NET CLR Version" to No Managed Code -> Save
5. Now you can browse the site from the "Sites section" :-)

If there are any changes or questions/comments, please email me and I will be happy to answer.

##Usage
This app is designed specifically for my home network. I do not (and did not) want to install a SQL database or datastore as I will have sole access to this application. Therefore, I added a login feature that checks for the username/password combination that is stored in the local file. This is NOT a secure way to handle authentication but I did it this way for my home network setup. 

The API endpoints are located in the Controllers folder. 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.