//routes
import authRoutes from './Routes/AuthRoute.js'; 
import characterRoutes from './Routes/CharacterRoute.js';
import reasonRoutes from './Routes/ReasonRoute.js';
import imageRoutes from './Routes/ImageRoutes.js';
import tagRoutes from './Routes/TagsRoutes.js';  
import chatRoutes from './Routes/ChatRoutes.js';
import personaRoutes from './Routes/PersonaRoutes.js';
import idRoutes from './Routes/id.js';
dotenv.config();


const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'Public')));
app.use(cors());
app.options('*', cors());

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again later.',
});

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/auth', authRoutes);
app.use('/api', characterRoutes);
app.use('/Reason', reasonRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/persona', personaRoutes);
app.use('/api/id', idRoutes);

cron.schedule('*/5 * * * *', async () => {
    try {
        await axios.get(`http://localhost:${PORT}/ping`);
        console.log('server has started again');
    } catch (error) {
        console.log('Error pinging server:', error);
    }
});

app.get('/ping', (req, res) => {
    console.log('Ping received');
    res.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
});
