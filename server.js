var http = require("http");
var fs = require("fs");
const file = 'zad.html';

var database = [{ name: "name",amount:"amount",price:"price" }];

http.createServer(function (request, response) 
{
   

    if (request.method == 'POST') 
    {
        var body = ''
        request.on('data', function(data) {
          body += data;
          let name = (body.split(":\"")[1]).split("\"")[0];
            let amount = (Number)((body.split(":\"")[2]).split("\"")[0]);
            let price = (Number)((body.split(":\"")[3]).split("\"")[0]);
            if(amount==0 && price==0)
            {
                database= database.filter(function(elem){return elem.name!=name})
            }
            else if(amount==0|| price==0)
            {

            }
            else
            {
                let ind = database.findIndex(elem=>elem.name==name)
                if(ind!=-1)
                {
                    database[ind].amount=amount;
                    database[ind].price=price;
                }
                else
                {
                    database.push({ name: name,amount:amount,price:price })
                }
               
            }
           
        })
        
        
        request.on('end', function() {
          response.writeHead(200, {'Content-Type': 'application/json'})
          response.end( JSON.stringify(database))
        })
    } 
    else 
    {
        fs.readFile(file, function (err, data) { // Read it content
        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        response.write(data);   // Send the content to the web browser
        response.end();
        });
    }
}).listen(8080);
  console.log("The server was started on port 8080");
  console.log("To stop the server, press 'CTRL + C'");

