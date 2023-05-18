const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'aurora-sls.cluster-c4mop4508f8c.ap-southeast-1.rds.amazonaws.com',
      user : 'test',
      password : 'test123123',
      database : 'onexlab'
    }
  });