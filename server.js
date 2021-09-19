"use strict";
exports.__esModule = true;
var fastify_1 = require("fastify");
var fastify_static_1 = require("fastify-static");
var app = fastify_1["default"]();
app.register(fastify_static_1["default"]);
var port = 8080;
app.listen(port);
