import { 
    express,
    supabase,
    cors,
    path,
    axios,
    fs,
    dotenv,
    cron,
    fileURLToPath,
    sanitize,
    bcrypt,
    rateLimit,
    Joi,
    jwt,
    cheerio,
    bodyParser,
    authRoutes,
    characterRoutes,
    reasonRoutes,
    imageRoutes,
    tagRoutes,
    chatRoutes,
    personaRoutes,
    idRoutes
  } from '../Utils/serverUtils.js';
  
  const generateUrl = 'https://serger.onrender.com/generate';
  
  export const generateText = async (message, prompt) => {
      const text = message || prompt;
      
      try {
          new URL(generateUrl);
      } catch (e) {
          throw new Error('Invalid URL');
      }
  
      try {
          const response = await axios.post(generateUrl, { prompt: text }, {
              headers: { 'Content-Type': 'application/json' }
          });
  
          return response.data;
      } catch (error) {
          throw new Error('Error connecting to the generate service: ' + (error.response?.data?.error || error.message));
      }
  };
  
  export const getPersonaData = () => {
      return new Promise((resolve, reject) => {
          const jsonFilePath = path.join(__dirname, 'JSONS', 'personaData.json');
          
          fs.readFile(jsonFilePath, 'utf8', (error, data) => {
              if (error) {
                  if (error.code === 'ENOENT') {
                      return resolve({}); 
                  }
                  return reject('Error reading persona data: ' + error.message);
              }
  
              const personaData = JSON.parse(data);
              if (!personaData) {
                  return reject('No persona data found');
              }
  
              resolve(personaData);
          });
      });
  };
  
  export const savePersonaData = (personaData) => {
      return new Promise((resolve, reject) => {
          const jsonFilePath = path.join(__dirname, 'JSONS', 'personaData.json');
          
          fs.mkdir(path.dirname(jsonFilePath), { recursive: true }, (err) => {
              if (err) {
                  return reject('Error creating directory: ' + err.message);
              }
  
              fs.writeFile(jsonFilePath, JSON.stringify(personaData, null, 2), (err) => {
                  if (err) {
                      return reject('Error saving persona data to file: ' + err.message);
                  }
                  resolve('Persona data saved successfully');
              });
          });
      });
  };
  
  export const setFirstMessage = (firstMessage, app) => {
      app.locals.firstMessageData = { firstMessage };
      return 'First message overridden successfully';
  };
  
  export const getFirstMessage = (app) => {
      const personaData = app.locals.firstMessageData;
      if (!personaData) {
          throw new Error('No first message data found');
      }
      return personaData.firstMessage || 'First message not set';
  };
  