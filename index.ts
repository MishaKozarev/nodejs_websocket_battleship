import { httpServer } from './src/http_server/index';
import dotenv from 'dotenv';

export const HTTP_PORT = parseInt(process.env.PORT || '8181');

dotenv.config();

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
