'use strict';
const moment = require('moment');
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'aurora-sls.cluster-c4mop4508f8c.ap-southeast-1.rds.amazonaws.com',
    user : 'test',
    password : 'test123123',
    database : 'onexlab'
  }
});
module.exports.handler = async (event) => {
  try{
    let person_id = decodeURIComponent(event.pathParameters.person_id);
    console.log( person_id);
    const query = knex('sch_appt')
                  .select('*')
                  .where('person_id', person_id)
                  .orderBy('beg_dt_tm');
    const result = await query;
    console.log(result);
    const response = {
      statusCode: 200,
      body: JSON.stringify(result)
    }
    return response;
  }
    catch(e)
    {
      console.log(e);
      const response = {
        statusCode: 500,
        body: JSON.stringify(e)
      }
      return response;
    }
  
  
};