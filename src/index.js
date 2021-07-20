import { config } from 'dotenv';
// import logger from './helpers/logger.helper';
import app from './app';

config();

// This enables dotenv configulations
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('info', `Magic runs  on http://localhost:${port}`));
// socketio(server);

export default app;
