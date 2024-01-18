import dotenv from 'dotenv';
import { Command } from 'commander';
import { __dirname } from './utils.js';

const program = new Command();

program.option('-p <port>','Elegir puerto para deploy',8080)
program.option('--env <env>','Elegir un enviroment, dev o prod','dev')
program.parse();

const enviroment = program.getOptionValue('env')

dotenv.config({path:`${__dirname}/.env`});

const configs = {
    mongoUrl: process.env.MONGO_DB,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
};

console.log(enviroment)

export { configs, enviroment};

