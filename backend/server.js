import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.js';

const app = express();
app.use(cors()); // Add this line
app.use(express.json());

app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});