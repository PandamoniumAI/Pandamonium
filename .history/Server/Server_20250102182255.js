import { 
    express,
    cors,
    path,
    axios,
    dotenv,
    cron,
    fileURLToPath,
    bodyParser,
    authRoutes,
    characterRoutes,
    reasonRoutes,
    imageRoutes,
    tagRoutes,
    chatRoutes,
    personaRoutes,
    idRoutes
} from './Utils/serverUtils.js';

dotenv.config();

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'Public')));
app.use(cors());
app.options('*', cors());
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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'Components', '', 'homepage.jsx'));
});

cron.schedule('*/5 * * * *', async () => {
    try {
        await axios.get(`http://localhost:${PORT}/ping`);
        console.log('Server has started again');
    } catch (error) {
        console.log('Error pinging server:', error);
    }
});

app.get('/ping', (req, res) => {
    res.send('Pong');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
});
