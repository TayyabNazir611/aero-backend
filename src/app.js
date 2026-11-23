
import express from 'express';
import cors from 'cors';
import supabase from "./config/supabase.js"
import profileRoutes from './modules/profiles/profiles.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Fitness API is running!',
  });
});

app.get('/api/health', async (req, res) => {
  const { error } = await supabase
    .from('profiles')
    .select('id')
    .limit(1);

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json({
    success: true,
    message: 'Supabase database connected!',
  });
});

app.use('/api/profiles', profileRoutes);


export default app;
