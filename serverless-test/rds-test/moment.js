const moment = require('moment');

let beg_dt = moment("2023-05-20T10:00:00.000Z").format("YYYY-MM-DD");
console.log(beg_dt);
let end_dt = moment(beg_dt).add(1,'days').format("YYYY-MM-DD");
console.log(end_dt);

//.whereBetween('beg_dt_tm',[beg_dt,end_dt]);
