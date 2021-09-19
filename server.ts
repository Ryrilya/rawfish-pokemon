import fastify from 'fastify';
import fastifyStatic from 'fastify-static';

const app = fastify();
app.register(fastifyStatic);

const port = 8080;
app.listen(port);