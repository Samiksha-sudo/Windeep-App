import { Sequelize, QueryTypes, DataTypes } from 'sequelize';
const environment = process.env.DEPLOYMENT;
const prodEnvironmentList = ["prod", "master", "production"];
const CURRENT_LAMBDA_FUNCTION_TIMEOUT = 60;
const Op = Sequelize.Op;
const operatorsAliases = {
  $or   : Op.or,
  $eq   : Op.eq,
  $lt   : Op.lt,
  $gt   : Op.gt,
  $lte  : Op.lte,
  $gte  : Op.gte,
  $ne   : Op.ne,
  $like : Op.like,
  $not  : Op.not,
  $in   : Op.in,
  $nin  : Op.nin
}


let host= 'localhost'
let user= 'root'
let password= 'Admin@123' 
let database= 'windeep_finance' 
let port= 3306

let params = {
  host: host,
  dialect: 'mysql',  
  port: port,
  define: {
    timestamps: false
  },
  define: {
    freezeTableName: true,
    timestamps: false, // true by default
  },
  pool: {
      max: 10,
      min: 0,
      idle: 0,
      acquire: 10000,
      evict: CURRENT_LAMBDA_FUNCTION_TIMEOUT
  },
  operatorsAliases : operatorsAliases,
  logging : prodEnvironmentList.includes(environment) ? false : console.log
} 

console.log(JSON.stringify({ file: 'SequelizeWriteConnection.js', line: 55, environment, database, user, password, host,params}));
// Option 3: Passing parameters separately (other dialects)
let sequelize = new Sequelize( database, user, password, params);

export {
    sequelize,
    QueryTypes,
    Sequelize,
    DataTypes
  };