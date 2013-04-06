var amqp = require('amqp');
var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var conn = amqp.createConnection({url: url});
conn.on('ready', function(){console.log("connected to " + conn.serverProperties.product)});

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.talk = function(req, res){
  var exchange = conn.exchange('');
  var queue = conn.queue('queue2', {}, function() {
    exchange.publish(queue.name, {body: 'hi'});
    exchange.publish(queue.name, {body: req.body['message']}, function(){
      res.write('ok');
      res.end();
    });
  });

};
