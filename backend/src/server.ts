import Fastify from 'fastify';

import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
// import fastifyMailer from 'fastify-mailer'
import { fastifyCors } from '@fastify/cors'


// import { contactsRoutes } from './routes/contact.routes';
import { userRoutes } from './routes/user.routes';
import { groupRoutes } from './routes/group.routes';
import { groupMemberRoutes } from './routes/groupMember.routes';
import { verifyJWT } from './middlewares/verifyJwt.middleware';
import { authRoutes } from './routes/auth.routes';

import { swaggerOptions, swaggerUiOptions } from './config/swaggerOptions'
import { fastifyJwtOptions } from './config/fastifyJwt'
// import { mailerConfig } from './plugins/mailer';
const app = Fastify();



// define CORS
app.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(swagger, swaggerOptions);
app.register(swaggerUi, swaggerUiOptions);
app.register(fastifyJwt, fastifyJwtOptions);

app.register(fastifyCookie)

app.register(authRoutes, {
  prefix: '/auth',
  onRequest: verifyJWT,
});

app.register(userRoutes, {
  prefix: '/users',
  onRequest: verifyJWT,
});

app.register(groupRoutes, {
  prefix: '/groups',
  onRequest: verifyJWT,
});

app.register(groupMemberRoutes, {
  prefix: '/group-members',
  onRequest: verifyJWT,
});

app.listen({ port: 3100 }, () => {
  console.log('Server listening on port 3100');
});
