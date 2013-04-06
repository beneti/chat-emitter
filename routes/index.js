var amqp = require('amqp');
var url = process.env.CLOUDAMQP_URL || "amqp://localhost";
var conn = amqp.createConnection({url: url}, {defaultExchangeName: "amq.topic"});

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.talk = function(req, res){
  setTimeout(function(){
    conn.on('ready', function(){
      var exchange = conn.exchange('');
      var queue = conn.queue('queue1', {}, function() {
        exchange.publish(queue.name, {body: req.body['message']}, function(){
          res.write('ok');
          res.end();
        });
      });
    })
  }, 5000);
};
