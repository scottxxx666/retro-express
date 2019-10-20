import jwt from 'express-jwt';

export default jwt({ secret: 'secret-key', requestProperty: 'auth' });
