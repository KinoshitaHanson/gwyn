
import Core from 'crypto-js/core';

/**
 * Abstract base block cipher mode template.
 */
let BlockCipherMode = Core.lib.Base.extend({
    /**
   * Creates this mode for encryption.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @static
   *
   * @example
   *
   *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
   * @return {*}
   */
    createEncryptor: function (cipher, iv) {
        return this.Encryptor.create(cipher, iv);
    },

    /**
   * Creates this mode for decryption.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @static
   *
   * @example
   *
   *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
   * @return {object}
   */
    createDecryptor: function (cipher, iv) {
        return this.Decryptor.create(cipher, iv);
    },

    /**
   * Initializes a newly created mode.
   *
   * @param {Cipher} cipher A block cipher instance.
   * @param {Array} iv The IV words.
   *
   * @example
   *
   *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
   */
    init: function (cipher, iv) {
        this._cipher = cipher;
        this._iv = iv;
    }
});

/**
 * Abstract base CBC mode.
 */
let CBC = BlockCipherMode.extend();

/**
 * CBC encryptor.
 */
CBC.Encryptor = CBC.extend({
    /**
   * Processes the data block at offset.
   *
   * @param {Array} words The data words to operate on.
   * @param {number} offset The offset where the block starts.
   *
   * @example
   *
   *     mode.processBlock(data.words, offset);
   */
    processBlock: function (words, offset) {
    // Shortcuts
        let cipher = this._cipher;
        let blockSize = cipher.blockSize;

        // XOR and encrypt
        xorBlock.call(this, words, offset, blockSize);
        cipher.encryptBlock(words, offset);

        // Remember this block to use with next block
        this._prevBlock = words.slice(offset, offset + blockSize);
    }
});

/**
 * CBC decryptor.
 */
CBC.Decryptor = CBC.extend({
    /**
   * Processes the data block at offset.
   *
   * @param {Array} words The data words to operate on.
   * @param {number} offset The offset where the block starts.
   *
   * @example
   *
   *     mode.processBlock(data.words, offset);
   */
    processBlock: function (words, offset) {
    // Shortcuts
        let cipher = this._cipher;
        let blockSize = cipher.blockSize;

        // Remember this block to use with next block
        let thisBlock = words.slice(offset, offset + blockSize);

        // Decrypt and XOR
        cipher.decryptBlock(words, offset);
        xorBlock.call(this, words, offset, blockSize);

        // This block becomes the previous block
        this._prevBlock = thisBlock;
    }
});

function xorBlock(words, offset, blockSize) {
    // Shortcut
    let iv = this._iv;
    let block = null;

    // Choose mixing block
    if (iv) {
        block = iv;

        // Remove IV for subsequent blocks
        this._iv = undefined;
    } else {
        block = this._prevBlock;
    }

    // XOR blocks
    for (let i = 0; i < blockSize; i++) {
        words[offset + i] ^= block[i];
    }
}

export default CBC;
