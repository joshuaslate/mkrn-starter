/**
 * Created by highlander on 9/28/17.
 */
const bitcoinjs = require('bitcoinjs-lib');

const getDeposit = async (userIndex) => {
  try {
    const config = require('../config');
    console.log('userIndex: ', userIndex);
    console.log('config.pubkey: ', config.pubkey);
    const accountNum = 0;
    const m = bitcoinjs.HDNode.fromBase58(config.pubkey, bitcoinjs.networks.bitcoin);
    const derived1 = m.derive(accountNum); // account
    const derived2 = derived1.derive(userIndex); // index
    const childPubKey = derived2.getAddress();
    return childPubKey;

    // return '1K3orBHZi3Vj1fVp6kWcqj3Kko27bKEoPm';
  } catch (err) {
    console.error(err);
    throw Error(err);
  }
};


// getDeposit(2)
//   .then((resp) => {
//     console.log(resp);
//   });
/*
    TODO: Validate payment
 */
module.exports = {
  getDeposit,
};

