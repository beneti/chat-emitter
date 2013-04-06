var amqp = require('amqp');
var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var conn = amqp.createConnection({url: url});
var rtg   = require("url").parse(process.env.REDISTOGO_URL);
var redis = require("redis").createClient(rtg.port, rtg.hostname);
redis.auth(rtg.auth.split(":")[1]);
conn.on('ready', function(){console.log("connected to " + conn.serverProperties.product)});

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.talk = function(req, res){
  var exchange = conn.exchange('');
  var queue = conn.queue('queue2', {}, function() {
    exchange.publish(queue.name, {body: req.body['message']});
    redis.lrange('chat', 0, 9, function(err, messages){
      res.write(messages);
      res.end();
    });
  });

};
