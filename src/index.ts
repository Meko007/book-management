import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { connectDB } from './config/db';
import bookRoutes from './routes/bookRoute';
import userRoutes from './routes/userRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use('/api/v1', bookRoutes);
app.use('/api/v1', userRoutes);
app.use(cors({
	credentials: true,
}));

const port = process.env.PORT ?? 3000;

app.get('/', (req, res) => {
	res.send('Ndeewo');
});

app.listen(port, () => {
	console.log(`server is listening on port ${port}`);
	connectDB();
});

export default app