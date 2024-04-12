export const fastifyJwtOptions = {
    secret: process.env.JWT_SECRET?.toString() || 'default',
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: process.env.TOKEN_EXPIRES?.toString() || '1d',
    },
};