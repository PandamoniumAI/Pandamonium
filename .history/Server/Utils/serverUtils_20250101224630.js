// Dependencies
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { fileURLToPath } from 'url';
import sanitize from 'sanitize-html';
import bcrypt from 'bcrypt';
import rateLimit from 'express-rate-limit';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import * as cheerio from 'cheerio';
import bodyParser from 'body-parser';
import {SUPABASE_KEY, SUPABASE_URL } 

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Routes
import authRoutes from '../Routes/AuthRoute.js';
import characterRoutes from '../Routes/CharacterRoute.js';
import reasonRoutes from '../Routes/ReasonRoute.js';
import imageRoutes from '../Routes/ImageRoutes.js';
import tagRoutes from '../Routes/TagsRoutes.js';  
import chatRoutes from '../Routes/ChatRoutes.js';
import personaRoutes from '../Routes/PersonaRoutes.js';
import idRoutes from '../Routes/id.js';

// Exporting both routes and dependencies
export {
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
};
