var http = require('http');

http.createServer(require('./config/express')).listen(3000,function(){
    console.log('Servidor escutando na porta: ' + this.address().port)
});



