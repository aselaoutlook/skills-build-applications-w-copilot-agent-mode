import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/database';
import activitiesRouter from './routes/activities';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker backend API',
    endpoints: ['/api/health', '/api/activities']
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'OctoFit Tracker backend is running' });
});

app.use('/api/activities', activitiesRouter);

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
