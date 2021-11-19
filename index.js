const jspack = require("jspack");
const Salsa20 = require("js-salsa20");

const encryptor1 = new Salsa20({doubleRounds:10});