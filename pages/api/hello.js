// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import DexGuru, { ChainsListModel } from "dexguru-sdk";

export default async function handler(req, res) {
  var _apiKey = process.env.NEXT_PUBLIC_DEXGURU_API_KEY;
  const { wallet, token, chain } = req.query;

  const sdk = new DexGuru(_apiKey, "https://api.dev.dex.guru");

  var amm = "all";

  // var chain = "43114";
  // var wallet = "";
  console.log("wallet:", wallet);

  const response = await sdk.getWalletSwaps(
    chain,
    wallet,
    amm,
    "timestamp",
    "desc",
    100
  );

  var _total = response.total;
  console.log("total responses", _total.length);
  var _pages = Math.ceil(_total / 100) - 1;
  var _offset = 100;
  // total of 6 api calls max, ie: 600 recent txns from dexguru wallet swaps
  var _api_call_limit = 5;

  while (_pages != 0 && _api_call_limit != 0) {
    // _pages -= 1;
    console.log("if over 100 txns");
    const next_response = await sdk.getWalletSwaps(
      chain,
      wallet,
      amm,
      "timestamp",
      "desc",
      100,
      _offset
    );

    next_response.data.map((tx) => {
      response.data.push(tx);
    });

    _pages -= 1;
    _api_call_limit -= 1;
    _offset += 100;
  }
  console.log("total swaps fetched:", response.data.length);

  const buy_txns = response.data.filter(
    (t) => t.tokens_out[0].address.toLowerCase() == token
  );

  const sell_txns = response.data.filter(
    (t) => t.tokens_in[0].address.toLowerCase() == token
  );

  const all_txns = response.data.filter(
    (t) =>
      t.tokens_out[0].address.toLowerCase() == token ||
      t.tokens_in[0].address.toLowerCase() == token
  );

  var tokens_json = {};

  buy_txns.map((txn) => {
    if (tokens_json[txn.tokens_out[0].address] === undefined) {
      // initialize token jsons
      tokens_json[txn.tokens_out[0].address] = {
        total_buy_worth: 0,
        total_buy_amount: 0,
        total_buy_value: 0,
        total_sell_worth: 0,
        total_sell_amount: 0,
        total_sell_value: 0,
        total_buys: 0,
        total_sells: 0,
        timestamp: 0,
        symbol: "",
        buys: [],
        sells: [],
      };
      // tokens_json[txn.tokens_out[0].address] = { total_buys: 0 };

      tokens_json[txn.tokens_out[0].address]["total_buy_worth"] +=
        txn.tokens_out[0].price_usd;
      tokens_json[txn.tokens_out[0].address]["total_buys"] += 1;
      tokens_json[txn.tokens_out[0].address]["total_buy_amount"] +=
        txn.tokens_out[0].price_usd;

      tokens_json[txn.tokens_out[0].address]["total_buy_value"] +=
        txn.amount_usd;

      tokens_json[txn.tokens_out[0].address]["timestamp"] = txn.timestamp;
      tokens_json[txn.tokens_out[0].address]["symbol"] =
        txn.tokens_out[0].symbol;
      tokens_json[txn.tokens_out[0].address]["buys"].push(txn);
    } else {
      tokens_json[txn.tokens_out[0].address]["total_buy_worth"] +=
        txn.tokens_out[0].price_usd;
      tokens_json[txn.tokens_out[0].address]["total_buys"] += 1;
      tokens_json[txn.tokens_out[0].address]["total_buy_amount"] +=
        txn.tokens_out[0].amount;
      tokens_json[txn.tokens_out[0].address]["total_buy_value"] +=
        txn.amount_usd;

      tokens_json[txn.tokens_out[0].address]["timestamp"] = txn.timestamp;
      tokens_json[txn.tokens_out[0].address]["symbol"] =
        txn.tokens_out[0].symbol;
      tokens_json[txn.tokens_out[0].address]["buys"].push(txn);
    }
  });

  sell_txns.map((txn) => {
    if (tokens_json[txn.tokens_in[0].address] === undefined) {
      // initialize token jsons
      tokens_json[txn.tokens_in[0].address] = {
        total_buy_worth: 0,
        total_buy_amount: 0,
        total_buy_value: 0,
        total_sell_worth: 0,
        total_sell_amount: 0,
        total_sell_value: 0,
        total_buys: 0,
        total_sells: 0,
        timestamp: 0,
        symbol: "",
        buys: [],
        sells: [],
      };
      // tokens_json[txn.tokens_out[0].address] = { total_buys: 0 };

      tokens_json[txn.tokens_in[0].address]["total_sell_worth"] +=
        txn.tokens_in[0].price_usd;
      tokens_json[txn.tokens_in[0].address]["total_sells"] += 1;
      tokens_json[txn.tokens_in[0].address]["total_sell_amount"] +=
        txn.tokens_in[0].amount;

      tokens_json[txn.tokens_in[0].address]["total_sell_value"] +=
        txn.amount_usd;

      tokens_json[txn.tokens_in[0].address]["timestamp"] = txn.timestamp;
      tokens_json[txn.tokens_in[0].address]["symbol"] = txn.tokens_in[0].symbol;
      tokens_json[txn.tokens_in[0].address]["sells"].push(txn);
    } else {
      tokens_json[txn.tokens_in[0].address]["total_sell_worth"] +=
        txn.tokens_in[0].price_usd;
      tokens_json[txn.tokens_in[0].address]["total_sells"] += 1;
      tokens_json[txn.tokens_in[0].address]["total_sell_amount"] +=
        txn.tokens_in[0].amount;
      tokens_json[txn.tokens_in[0].address]["total_sell_value"] +=
        txn.amount_usd;

      tokens_json[txn.tokens_in[0].address]["timestamp"] = txn.timestamp;
      tokens_json[txn.tokens_in[0].address]["symbol"] = txn.tokens_in[0].symbol;
      tokens_json[txn.tokens_in[0].address]["sells"].push(txn);
    }
  });

  res.status(200).json({
    name: "Hello World",
    transactions: tokens_json,
    history: all_txns,
  });
}
