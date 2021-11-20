const jspack = require("jspack");
const Salsa20 = require("js-salsa20");
const zlib = require("zlib");

function _unescape_entities(text) {
	// unescape offending tags < > " &
	// TODO fix for byte?
	text = text.replace('&lt;', '<');
	text = text.replace('&gt;', '>');
	text = text.replace('&quot;', '"');
	text = text.replace('&amp;', '&');
	return text
}

function _fast_decrypt(data, key) {
	var b = new Uint8Array.from(data);
	var key = new Uint8Array.from(key);
	var previous = 0x36;
	for (let index = 0; index < b.length; index++) {
		let t = (b[i] >> 4 | b[i] << 4) & 0xff;
		t = t ^ previous ^ (i & 0xff) ^ key[i % key.length];
		previous = b[i];
		b[i] = t;
	}
	return ArrayBuffer(b);
}

function _mdx_decrypt(comp_block) {
	var key = ripemd128(comp_block.slice(4,9) + pack('<L', 0x3695));
	return comp_block.slice(0,9) + _fast_decrypt(comp_block.slice(8), key);
}

function _salsa_decrypt(ciphertext, encrypt_key) {
	s20 = Salsa20(key=encrypt_key, IV=Uint8Array("\x00"*8));
	// s20.encrypt_key()
	// TODO we need a nonce value?
}

class MDict(object) => {
	// Base class which reads in header and key block.
	// It has no public methods and serves only as code sharing base class.
	constructor(self, fname, encoding='', passcode=null) {
		
	}
}