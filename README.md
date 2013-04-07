chat-emitter
============

Proof of Concept

- visit [chat-worker](https://github.com/beneti/chat-worker) and follow the steps. It's two apps working together!

Steps:

1) Check 2 configs from chat-worker, with the command heroku config --app chat-worker. Get CLOUDAMQP_URL and REDISTOGO_URL.

- create heroku app
- add CLOUDAMQP_URL config -> heroku config:add CLOUDAMQP_URL=(value from step 1) --app chat-emitter
- add REDISTOGO_URL config -> heroku config:add REDISTOGO_URL=(value from step 1) --app chat-emitter
- push to heroku

What is happen?

Simple, chat-emitter (producer) will publish a message in the RabbitMQ from chat-worker. Then chat-worker (consumer) will get the message and save to the Redis. Then chat-emitter will get some messages from Redis.
