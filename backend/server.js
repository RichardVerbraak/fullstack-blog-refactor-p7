const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const testRoutes = require('./routes/testRoutes');

const errorHandler = require('./middleware/errorMiddleware');
const tokenExtractor = require('./middleware/tokenMiddleware');

const app = express();

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());

app.use(tokenExtractor);

if (process.env.NODE_ENV === 'test') {
	app.use('/api/test', testRoutes);
}

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3003;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

module.exports = server;
