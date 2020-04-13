export function get_date() {
   var months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ];
   let d = new Date();
   let month = parseInt(d.getMonth());
   month = months[month];
   month = month[0] + month[1] + month[2];
   month = month.toUpperCase();

   let tdate =
      month +
      '' +
      d.getDate() +
      '_' +
      d.getFullYear() +
      '_' +
      d.getHours() +
      '_' +
      d.getMinutes();
   return tdate;
}

export function get_date2() {
   let d = new Date();
   let month = parseInt(d.getMonth());
   month += 1;
   let tdate =
      d.getDate() +
      '_' +
      month +
      '_' +
      d.getFullYear() +
      '_' +
      d.getHours() +
      d.getMinutes() +
      d.getSeconds();
   return tdate;
}

export function get_date3() {
   let d = new Date();
   let month = parseInt(d.getMonth());
   month += 1;
   let tdate =
      d.getDate() +
      ' ' +
      month +
      ' ' +
      d.getFullYear() +
      ' ' +
      d.getHours() +
      ':' +
      d.getMinutes();
   return tdate;
}

// this functuon serves two purposes
// 1: cuu up and display next msg
// return the updated object so that the state can be updated
export const cubeMsgNext = (msg, alertColor, msgArr) => {
   let num = msgArr.findIndex((el) => el.current === true);
   let tempArr = msgArr;
   tempArr[num].current = false;

   num = num + 1 < 4 ? num + 1 : 0;
   tempArr[num].current = true;
   tempArr[num].msg = msg;
   tempArr[num].alertColor = alertColor;

   return tempArr;
};

export const cl = (msg) => {
   console.log('*' + msg);
};

export const obj = [
   {
      msg: 'Ready For use',
      alertColor: 'success',
      current: true,
      anim: 'aroll1',
   },
   {
      msg: '[1] (0-3)',
      alertColor: 'info',
      current: false,
      anim: 'aroll2',
   },
   {
      msg: '[2] (0-3)',
      alertColor: 'info',
      current: false,
      anim: 'aroll3',
   },
   {
      msg: '[3] (0-3)',
      alertColor: 'info',
      current: false,
      anim: 'aroll4',
   },
];
