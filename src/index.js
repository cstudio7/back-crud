import { config } from 'dotenv';
import app from './app';
import { socketio } from './helpers/socket.helper';

config();

// This enables dotenv configulations
const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log('info', `Magic runs  on http://localhost:${port}`));
socketio(server);

export default app;
