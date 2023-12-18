import dotenv from 'dotenv';
import { Command } from 'commander';
import { __dirname } from './utils.js';

const program = new Command();

program.option('-p <port>','Elegir puerto para deploy',8080)
program.parse();

dotenv.config({path:`${__dirname}/.env`});

const configs = {
    mongoUrl: process.env.MONGO_DB,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET

};

console.log(process.env.MONGO_DB)

export default configs;

