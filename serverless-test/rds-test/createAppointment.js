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
    let item = JSON.parse(event.body).Item;
    const query = knex('sch_appt')
                    .where('sch_appt_id', item.sch_appt_id)
                    .update({
                    appt_status: 'CONFIRMED',
                    slot_status: 'OCCUPIED',
                    person_id: item.person_id
                    });
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