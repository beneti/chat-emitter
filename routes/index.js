var amqp = require('amqp');
var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var conn = amqp.createConnection({url: url}, {defaultExchangeName: "amq.topic"});

/*
 * GET home page.
 */

exports.index = function(req, res){
  conn.on('ready', function(){
    console.log('Connected')
    res.render('index', { title: 'Express' });
  });
};

exports.talk = function(req, res){
  var exchange = conn.exchange('amq.topic');
  var queue = conn.queue('queue1', {}, function() {
    exchange.publish(queue.name, {body: req.body['message']}, function(){
      res.write('ok');
      res.end();
    });
  });
};
