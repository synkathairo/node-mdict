const jspack = require("jspack");
const Salsa20 = require("js-salsa20");
const zlib = require("zlib");
const structjs = require("@aksel/structjs");
try {
	const lzo = require("lzo");
} catch (error) {
	
}

function _unescape_entities(text) {
	// unescape offending tags < > " &
	// TODO fix for byte?
	text = text.replace('&lt;', '<');
	text = text.replace('&gt;', '>');
	text = text.replace('&quot;', '"');
	text = text.replace('&amp;', '&');
	return text;
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

class MDict {
	// Base class which reads in header and key block.
	// It has no public methods and serves only as code sharing base class.
	constructor(fname, encoding='', passcode=null) {
		this._fname = fname;
		this._encoding = encoding.upper();
		this._passcode = passcode;

		this.header = this._read_header();
		try {
			this._key_list = this._read_keys();
		} catch (error) {
			console.log("Try Brutal Force on Encrypted Key Blocks");
			this._key_list = this._read_keys_brutal();
		}
	}

	__len__() {
		return this._num_entries;
	}
	
	__iter__() {
		return this.keys();
	}
	
	// keys() {
	// 	// Return an iterator over dictionary keys.
	// 	for (const key_value in object) {
	// 		if (Object.hasOwnProperty.call(object, key_value)) {
	// 			const element = object[key_value];
				
	// 		}
	// 	}
	// }

	_read_number(f) {
		return structjs.unpack(this._number_format, f.read(this._number_width))[0];
	}
}