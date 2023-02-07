
 

const http = require('http');
const express = require('express');
const axios = require('axios');
import { Observable, of,from } from "rxjs"; 

const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static("express"));
// default URL for website
app.get('/', function(req:any,res:any){
    res.sendFile(path.join(__dirname+'/src/index.html'));
     //__dirname : It will resolve to your project folder.
  });
  app.get('/user/:user', function(req:any,res:any){
    const user = req.params["user"]
    const emitter : Observable<any> = from(getUser(user));
    emitter.subscribe((response: any) => {
      console.log(response.data);
      console.log("==============================================");
      console.log(JSON.stringify(response.data));
      console.log("==============================================");
      res.send(JSON.stringify(response.data));
    })
  });




 
  function getUser(user:string) {
      const options = {
          method: 'GET',
          url: `https://api.github.com/users/${user}/repos`,
          headers: {
              'X-RapidAPI-Key': 'your-rapidapi-key',
              'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
          },
      };
      return axios.request(options);
    }

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);