const jspack = require("jspack");
const Salsa20 = require("js-salsa20");
const zlib = require("zlib");

function _unescape_entities(text) {
	// unescape offending tags < > " &
	text = text.replace('&lt;', '<');
	text = text.replace('&gt;', '>');
	text = text.replace('&quot;', '"');
	text = text.replace('&amp;', '&');
	return text
}

function _fast_decrypt(data, key) {
	var b = new Uint8Array(data);
	var key = new Uint8Array(key);
	var previous = 0x36;
	for (let index = 0; index < b.length; index++) {
		let t = (b[i] >> 4 | b[i] << 4) & 0xff;
		t = t ^ previous ^ (i & 0xff) ^ key[i % len(key)];
		previous = b[i];
		b[i] = t;
	}
	return ArrayBuffer(b);
}

function _mdx_decrypt(comp_block) {
	var key = ripemd128(comp_block[4:8] + pack('<L', 0x3695));
	return comp_block[0:8] + _fast_decrypt(comp_block[8:], key);
	// TODO
}

function _salsa_decrypt(ciphertext, encrypt_key) {
	
}