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
    let resource = decodeURIComponent(event.pathParameters.resource);
    let booking_dt = event.queryStringParameters.booking_dt;
    console.log(booking_dt);
    let beg_dt = moment(booking_dt).format("YYYY-MM-DD");
    let end_dt = moment(beg_dt).add(1,'days').format("YYYY-MM-DD");
    console.log(resource);
    console.log(beg_dt);
    console.log(end_dt);
    const query = knex('sch_appt')
                  .select('*')
                  .where('resource', resource)
                  .where('slot_status', 'ACTIVE')
                  .whereBetween('beg_dt_tm', [beg_dt, end_dt])
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