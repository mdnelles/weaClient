export function get_date() {
   var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];
   let d = new Date();
   let month = parseInt(d.getMonth());
   month = months[month];
   month = month[0] + month[1] + month[2];
   month = month.toUpperCase();

   let tdate =
      month +
      "" +
      d.getDate() +
      "_" +
      d.getFullYear() +
      "_" +
      d.getHours() +
      "_" +
      d.getMinutes();
   return tdate;
}

export function get_date2() {
   let d = new Date();
   let month = parseInt(d.getMonth());
   month += 1;
   let tdate =
      d.getDate() +
      "_" +
      month +
      "_" +
      d.getFullYear() +
      "_" +
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
      " " +
      month +
      " " +
      d.getFullYear() +
      " " +
      d.getHours() +
      ":" +
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
   console.log("*" + msg);
};

export const obj = [
   {
      msg: "Ready For use",
      alertColor: "success",
      current: true,
      anim: "aroll1",
   },
   {
      msg: "[1] (0-3)",
      alertColor: "info",
      current: false,
      anim: "aroll2",
   },
   {
      msg: "[2] (0-3)",
      alertColor: "info",
      current: false,
      anim: "aroll3",
   },
   {
      msg: "[3] (0-3)",
      alertColor: "info",
      current: false,
      anim: "aroll4",
   },
];

export const countryISO = [
   { cou: "Afghanistan", iso: "AF" },
   { cou: "Albania", iso: "AL" },
   { cou: "Algeria", iso: "DZ" },
   { cou: "American Samoa", iso: "AS" },
   { cou: "Andorra", iso: "AD" },
   { cou: "Angola", iso: "AO" },
   { cou: "Antigua And Barbuda", iso: "AG" },
   { cou: "Azerbaijan", iso: "AZ" },
   { cou: "Argentina", iso: "AR" },
   { cou: "Australia", iso: "AU" },
   { cou: "Austria", iso: "AT" },
   { cou: "Bahamas, The", iso: "BS" },
   { cou: "Bahrain", iso: "BH" },
   { cou: "Bangladesh", iso: "BD" },
   { cou: "Armenia", iso: "AM" },
   { cou: "Barbados", iso: "BB" },
   { cou: "Belgium", iso: "BE" },
   { cou: "Bermuda", iso: "BM" },
   { cou: "Bhutan", iso: "BT" },
   { cou: "Bolivia", iso: "BO" },
   { cou: "Bosnia And Herzegovina", iso: "BA" },
   { cou: "Botswana", iso: "BW" },
   { cou: "Brazil", iso: "BR" },
   { cou: "Belize", iso: "BZ" },
   { cou: "Solomon Islands", iso: "SB" },
   { cou: "Brunei", iso: "BN" },
   { cou: "Bulgaria", iso: "BG" },
   { cou: "Burma", iso: "MM" },
   { cou: "Burundi", iso: "BI" },
   { cou: "Belarus", iso: "BY" },
   { cou: "Cambodia", iso: "KH" },
   { cou: "Cameroon", iso: "CM" },
   { cou: "Canada", iso: "CA" },
   { cou: "Cabo Verde", iso: "CV" },
   { cou: "Cayman Islands", iso: "KY" },
   { cou: "Central African Republic", iso: "CF" },
   { cou: "Sri Lanka", iso: "LK" },
   { cou: "Chad", iso: "TD" },
   { cou: "Chile", iso: "CL" },
   { cou: "China", iso: "CN" },
   { cou: "Taiwan", iso: "TW" },
   { cou: "Colombia", iso: "CO" },
   { cou: "Comoros", iso: "KM" },
   { cou: "Mayotte", iso: "YT" },
   { cou: "Congo (Brazzaville)", iso: "CG" },
   { cou: "Congo (Kinshasa)", iso: "CD" },
   { cou: "Cook Islands", iso: "CK" },
   { cou: "Costa Rica", iso: "CR" },
   { cou: "Croatia", iso: "HR" },
   { cou: "Cuba", iso: "CU" },
   { cou: "Cyprus", iso: "CY" },
   { cou: "Czechia", iso: "CZ" },
   { cou: "Benin", iso: "BJ" },
   { cou: "Denmark", iso: "DK" },
   { cou: "Dominica", iso: "DM" },
   { cou: "Dominican Republic", iso: "DO" },
   { cou: "Ecuador", iso: "EC" },
   { cou: "El Salvador", iso: "SV" },
   { cou: "Equatorial Guinea", iso: "GQ" },
   { cou: "Ethiopia", iso: "ET" },
   { cou: "Eritrea", iso: "ER" },
   { cou: "Estonia", iso: "EE" },
   { cou: "Faroe Islands", iso: "FO" },
   { cou: "Falkland Islands (Islas Malvinas)", iso: "FK" },
   { cou: "South Georgia And South Sandwich Islands", iso: "GS" },
   { cou: "Fiji", iso: "FJ" },
   { cou: "Finland", iso: "FI" },
   { cou: "France", iso: "FR" },
   { cou: "French Guiana", iso: "GF" },
   { cou: "French Polynesia", iso: "PF" },
   { cou: "Djibouti", iso: "DJ" },
   { cou: "Gabon", iso: "GA" },
   { cou: "Georgia", iso: "GE" },
   { cou: "Gambia, The", iso: "GM" },
   { cou: "Germany", iso: "DE" },
   { cou: "Ghana", iso: "GH" },
   { cou: "Gibraltar", iso: "GI" },
   { cou: "Kiribati", iso: "KI" },
   { cou: "Greece", iso: "GR" },
   { cou: "Greenland", iso: "GL" },
   { cou: "Grenada", iso: "GD" },
   { cou: "Guadeloupe", iso: "GP" },
   { cou: "Guam", iso: "GU" },
   { cou: "Guatemala", iso: "GT" },
   { cou: "Guinea", iso: "GN" },
   { cou: "Guyana", iso: "GY" },
   { cou: "Haiti", iso: "HT" },
   { cou: "Honduras", iso: "HN" },
   { cou: "Hong Kong", iso: "HK" },
   { cou: "Hungary", iso: "HU" },
   { cou: "Iceland", iso: "IS" },
   { cou: "India", iso: "IN" },
   { cou: "Indonesia", iso: "ID" },
   { cou: "Iran", iso: "IR" },
   { cou: "Iraq", iso: "IQ" },
   { cou: "Ireland", iso: "IE" },
   { cou: "Israel", iso: "IL" },
   { cou: "Italy", iso: "IT" },
   { cou: "Côte D’Ivoire", iso: "CI" },
   { cou: "Jamaica", iso: "JM" },
   { cou: "Japan", iso: "JP" },
   { cou: "Kazakhstan", iso: "KZ" },
   { cou: "Jordan", iso: "JO" },
   { cou: "Kenya", iso: "KE" },
   { cou: "Korea, North", iso: "KP" },
   { cou: "Korea, South", iso: "KR" },
   { cou: "Kuwait", iso: "KW" },
   { cou: "Kyrgyzstan", iso: "KG" },
   { cou: "Laos", iso: "LA" },
   { cou: "Lebanon", iso: "LB" },
   { cou: "Lesotho", iso: "LS" },
   { cou: "Latvia", iso: "LV" },
   { cou: "Liberia", iso: "LR" },
   { cou: "Libya", iso: "LY" },
   { cou: "Liechtenstein", iso: "LI" },
   { cou: "Lithuania", iso: "LT" },
   { cou: "Luxembourg", iso: "LU" },
   { cou: "Macau", iso: "MO" },
   { cou: "Madagascar", iso: "MG" },
   { cou: "Malawi", iso: "MW" },
   { cou: "Malaysia", iso: "MY" },
   { cou: "Maldives", iso: "MV" },
   { cou: "Mali", iso: "ML" },
   { cou: "Malta", iso: "MT" },
   { cou: "Martinique", iso: "MQ" },
   { cou: "Mauritania", iso: "MR" },
   { cou: "Mauritius", iso: "MU" },
   { cou: "Mexico", iso: "MX" },
   { cou: "Monaco", iso: "MC" },
   { cou: "Mongolia", iso: "MN" },
   { cou: "Moldova", iso: "MD" },
   { cou: "Montenegro", iso: "ME" },
   { cou: "Morocco", iso: "MA" },
   { cou: "Mozambique", iso: "MZ" },
   { cou: "Oman", iso: "OM" },
   { cou: "Namibia", iso: "NA" },
   { cou: "Nepal", iso: "NP" },
   { cou: "Netherlands", iso: "NL" },
   { cou: "Curaçao", iso: "CW" },
   { cou: "Aruba", iso: "AW" },
   { cou: "Sint Maarten", iso: "SX" },
   { cou: "New Caledonia", iso: "NC" },
   { cou: "Vanuatu", iso: "VU" },
   { cou: "New Zealand", iso: "NZ" },
   { cou: "Nicaragua", iso: "NI" },
   { cou: "Niger", iso: "NE" },
   { cou: "Nigeria", iso: "NG" },
   { cou: "Norway", iso: "NO" },
   { cou: "Northern Mariana Islands", iso: "MP" },
   { cou: "Micronesia, Federated States Of", iso: "FM" },
   { cou: "Marshall Islands", iso: "MH" },
   { cou: "Palau", iso: "PW" },
   { cou: "Pakistan", iso: "PK" },
   { cou: "Panama", iso: "PA" },
   { cou: "Papua New Guinea", iso: "PG" },
   { cou: "Paraguay", iso: "PY" },
   { cou: "Peru", iso: "PE" },
   { cou: "Philippines", iso: "PH" },
   { cou: "Poland", iso: "PL" },
   { cou: "Portugal", iso: "PT" },
   { cou: "Guinea-Bissau", iso: "GW" },
   { cou: "Timor-Leste", iso: "TL" },
   { cou: "Puerto Rico", iso: "PR" },
   { cou: "Qatar", iso: "QA" },
   { cou: "Reunion", iso: "RE" },
   { cou: "Romania", iso: "RO" },
   { cou: "Russia", iso: "RU" },
   { cou: "Rwanda", iso: "RW" },
   { cou: "Saint Helena, Ascension, And Tristan Da Cunha", iso: "SH" },
   { cou: "Saint Kitts And Nevis", iso: "KN" },
   { cou: "Saint Lucia", iso: "LC" },
   { cou: "Saint Vincent And The Grenadines", iso: "VC" },
   { cou: "San Marino", iso: "SM" },
   { cou: "Sao Tome And Principe", iso: "ST" },
   { cou: "Saudi Arabia", iso: "SA" },
   { cou: "Senegal", iso: "SN" },
   { cou: "Serbia", iso: "RS" },
   { cou: "Seychelles", iso: "SC" },
   { cou: "Sierra Leone", iso: "SL" },
   { cou: "Singapore", iso: "SG" },
   { cou: "Slovakia", iso: "SK" },
   { cou: "Vietnam", iso: "VN" },
   { cou: "Slovenia", iso: "SI" },
   { cou: "Somalia", iso: "SO" },
   { cou: "South Africa", iso: "ZA" },
   { cou: "Zimbabwe", iso: "ZW" },
   { cou: "Spain", iso: "ES" },
   { cou: "South Sudan", iso: "SS" },
   { cou: "Sudan", iso: "SD" },
   { cou: "Suriname", iso: "SR" },
   { cou: "Swaziland", iso: "SZ" },
   { cou: "Sweden", iso: "SE" },
   { cou: "Switzerland", iso: "CH" },
   { cou: "Syria", iso: "SY" },
   { cou: "Tajikistan", iso: "TJ" },
   { cou: "Thailand", iso: "TH" },
   { cou: "Togo", iso: "TG" },
   { cou: "Tonga", iso: "TO" },
   { cou: "Trinidad And Tobago", iso: "TT" },
   { cou: "United Arab Emirates", iso: "AE" },
   { cou: "Tunisia", iso: "TN" },
   { cou: "Turkey", iso: "TR" },
   { cou: "Turkmenistan", iso: "TM" },
   { cou: "Turks And Caicos Islands", iso: "TC" },
   { cou: "Tuvalu", iso: "TV" },
   { cou: "Uganda", iso: "UG" },
   { cou: "Ukraine", iso: "UA" },
   { cou: "Macedonia", iso: "MK" },
   { cou: "Egypt", iso: "EG" },
   { cou: "United Kingdom", iso: "GB" },
   { cou: "Isle Of Man", iso: "IM" },
   { cou: "Tanzania", iso: "TZ" },
   { cou: "United States", iso: "US" },
   { cou: "Burkina Faso", iso: "BF" },
   { cou: "Uruguay", iso: "UY" },
   { cou: "Uzbekistan", iso: "UZ" },
   { cou: "Venezuela", iso: "VE" },
   { cou: "Wallis And Futuna", iso: "WF" },
   { cou: "Samoa", iso: "WS" },
   { cou: "Yemen", iso: "YE" },
   { cou: "Zambia", iso: "ZM" },
   { cou: "Kosovo", iso: "XK" },
   { cou: "West Bank", iso: "XW" },
   { cou: "na", iso: "na" },
   { cou: "country", iso: "iso2" },
];
