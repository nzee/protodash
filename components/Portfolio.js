import React, { useState, useEffect } from "react";
import Moment from "react-moment";
import Download from "./Download";
import { Image, Video, Transformation } from "cloudinary-react";

function Portfolio({ wallet, token, chain, chainSlug, slug, available, pfp }) {
  const [tokenJson, setTokenJson] = useState(false);
  const [history, setHistory] = useState(false);
  const [tokenSummary, setTokenSummary] = useState(false);
  const [tokenAvailable, setTokenAvailable] = useState(false);
  const [abp, setABP] = useState(0);
  const [delta, setDelta] = useState(0);
  const [pnl, setPnL] = useState(0);
  const [totalWorth, setTotalWorth] = useState(0);
  const [bestTrade, setBestTrade] = useState(false);
  var profits = 0;

  // var wallet = "0x5156280b0c3b876c72d7b406b22e394ffd284ba1";

  useEffect(() => {
    console.log("walletttt:::", wallet);
    fetch(
      `https://openapi.debank.com/v1/user/token_list?id=${wallet}&chain_id=${chainSlug}&is_all=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("debank", data);
        try {
          setTokenSummary(data.filter((t) => t.id == token)[0]);
        } catch (e) {
          console.log(e);
        }
      });

    fetch(`/api/hello?token=${token}&chain=${chain}&wallet=${wallet}`)
      .then((response) => response.json())
      .then((data) => {
        setTokenJson(data.transactions);
        setHistory(data.history);
      });
  }, [wallet]);

  useEffect(() => {
    try {
      console.log("tokenJson", tokenJson);
      setABP(
        tokenJson[token].total_buy_value / tokenJson[token].total_buy_amount
      );
    } catch (e) {
      console.log("json", tokenJson);
    }
  }, [tokenJson]);

  useEffect(() => {
    let _delta = (tokenSummary.price * 100) / abp;
    _delta = _delta - 100;
    setDelta(parseFloat(_delta).toFixed(2));
  }, [abp]);

  useEffect(() => {
    setTotalWorth(tokenSummary.amount * tokenSummary.price);
  }, [tokenSummary]);

  useEffect(() => {
    if (tokenJson[token]) {
      setPnL(
        tokenJson[token].total_buys > 0
          ? totalWorth +
              tokenJson[token].total_sell_value -
              tokenJson[token].total_buy_value
          : "-"
      );
    }
  }, [tokenJson, totalWorth]);

  useEffect(() => {
    if (tokenJson[token]) {
      var _current_price = tokenSummary.price;

      var best_delta = 0;
      var best_trade = {};

      var _delta = 0;
      var _current_best_delta = 0;

      tokenJson[token].buys.map((txn) => {
        let _delta = (_current_price * 100) / txn.tokens_out[0].price_usd;
        _delta = _delta - 100;
        console.log("delyaaaaa:", _delta);
        if (_delta > _current_best_delta) {
          _current_best_delta = _delta;
          best_trade = {
            delta: parseFloat(_delta).toFixed(0),
            entry_price: parseFloat(txn.tokens_out[0].price_usd).toFixed(5),
            current_price: parseFloat(_current_price).toFixed(5),
          };
        } else {
          best_trade = false;
        }

        // _best_delta[txn.block_number] = {
        //   delta: _delta,
        //   entry_price: txn.tokens_out[0].price_usd,
        //   current_price: _current_price,
        // };
        // best_delta.push(_best_delta);

        // _best_delta.push({
        //   key: txn.block_number,
        //   value: _delta,
        // });
      });
      console.log("deltas::", best_trade);

      setBestTrade(best_trade);
    }
  }, [tokenJson]);

  return (
    <>
      <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <div className="sm:flex sm:space-x-4">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">
                    Total Cost
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    $
                    {tokenJson[token]
                      ? parseFloat(tokenJson[token].total_buy_value).toFixed(2)
                      : "loading.."}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">
                    Current Worth
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    ${parseFloat(totalWorth).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow transform transition-all mb-4 w-full sm:w-1/3 sm:my-8">
            <div className="bg-white p-5">
              <div className="sm:flex sm:items-start">
                <div className="text-center sm:mt-0 sm:ml-2 sm:text-left">
                  <h3 className="text-sm leading-6 font-medium text-gray-400">
                    Avg. Buy Price
                  </h3>
                  <div className="flex flex-row">
                    <p className="text-3xl font-bold text-black">
                      ${parseFloat(abp).toFixed(4)}
                    </p>

                    <p
                      className={
                        delta > 0
                          ? "ml-4 flex items-center justify-end text-green-500 text-md"
                          : "ml-4 flex items-center justify-end text-red-500 text-md"
                      }
                    >
                      <span className="font-bold">{delta}%</span>
                      {delta > 0 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                          />
                        </svg>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-1 bg-white-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-12">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Transactions
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <a
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    href="https://traderjoexyz.com/trade?outputCurrency=0x959b88966fC5B261dF8359961357d34F4ee27b4a#/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Buy ${slug}
                  </a>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Price
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Qty
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Cost
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Sells
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      PnL
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((txn) => {
                      return (
                        <tr
                          key={txn.transaction_address}
                          className={
                            txn.tokens_in[0].address == token
                              ? "text-red-700"
                              : "text-green-700"
                          }
                        >
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            <Moment format="YYYY/MM/DD" unix>
                              {txn.timestamp}
                            </Moment>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {txn.tokens_in[0].address == token
                              ? "$" +
                                parseFloat(txn.tokens_in[0].price_usd).toFixed(
                                  5
                                )
                              : "$" +
                                parseFloat(txn.tokens_out[0].price_usd).toFixed(
                                  5
                                )}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {txn.tokens_in[0].address == token
                              ? parseFloat(txn.tokens_in[0].amount).toFixed(2)
                              : parseFloat(txn.tokens_out[0].amount).toFixed(2)}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {txn.tokens_in[0].address == token
                              ? "-"
                              : "$" + parseFloat(txn.amount_usd).toFixed(2)}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {txn.tokens_in[0].address == token
                              ? "$" + parseFloat(txn.amount_usd).toFixed(2)
                              : "-"}
                          </td>
                          <td
                            className={`border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ${
                              txn.tokens_out[0].amount * tokenSummary.price -
                                txn.amount_usd >
                              0
                                ? "text-green-800"
                                : "text-gray-900"
                            }`}
                          >
                            {" "}
                            {txn.tokens_out[0].amount * tokenSummary.price -
                              txn.amount_usd >
                            0
                              ? "+"
                              : "-"}
                            {txn.tokens_in[0].address == token
                              ? ""
                              : "$" +
                                Math.abs(
                                  parseFloat(
                                    txn.tokens_out[0].amount *
                                      tokenSummary.price -
                                      txn.amount_usd
                                  ).toFixed(2)
                                )}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {txn.tokens_in[0].address == token ? "Sell" : "Buy"}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <br />

          {bestTrade ? (
            <div className="flex flex-col py-10 border-t-2">
              <h1 className=" font-bold text-2xl m-auto">Share on Twitter</h1>
              <br />
              <div>
                {/* https://res.cloudinary.com/motogarage/image/upload/l_text:Arial_45_bold:Entry%20Price:%20$0.00005,x_285/l_text:Arial_45_bold:Current%20Price:%20$0.0003,x_285,y_75/co_rgb:38db36,l_text:Arial_45_bold:Total%20Gains:%20+$305,x_285,y_200/l_text:Arial_45_bold:My%20Best%20UNIV%20Trade:,x_285,y_-190/v1644529379/defidash/Capture7894756.png */}
                {/* <img
                  src={
                    bestTrade &&
                    `https://res.cloudinary.com/motogarage/image/upload/l_text:Arial_45_bold:Entry%20Price:%20$${bestTrade.entry_price},x_285/l_text:Arial_45_bold:Current%20Price:%20$${bestTrade.current_price},x_285,y_75/co_rgb:38bd36,l_text:Arial_45_bold:Total%20Gains:%20+${bestTrade.delta}%25,x_285,y_200/v1644240478/defidash/Capture51564.png`
                  }
                /> */}
                <Image
                  cloud_name="motogarage"
                  publicId="defidash/Capture7894756.png"
                >
                  <Transformation
                    overlay={{
                      fontFamily: "Arial",
                      fontSize: 45,
                      fontWeight: "bold",
                      text: "Entry Price: $" + bestTrade.entry_price,
                    }}
                    x="285"
                  />
                  <Transformation
                    overlay={{
                      fontFamily: "Arial",
                      fontSize: 45,
                      fontWeight: "bold",
                      text: "Current Price: $" + bestTrade.current_price,
                    }}
                    x="285"
                    y="75"
                  />
                  <Transformation
                    color="#38db36"
                    overlay={{
                      fontFamily: "Arial",
                      fontSize: 45,
                      fontWeight: "bold",
                      text: "Total Gains: " + bestTrade.delta + "%",
                    }}
                    x="285"
                    y="200"
                  />
                  <Transformation
                    overlay={{
                      fontFamily: "Arial",
                      fontSize: 45,
                      fontWeight: "bold",
                      text: `My Best $${slug.toUpperCase()} Trade`,
                    }}
                    x="285"
                    y="-190"
                  />

                  <Transformation
                    overlay={{
                      url: pfp,
                    }}
                    x="-300"
                  />

                  {/* <Transformation flags="layer_apply" /> */}
                </Image>
              </div>

              <div className="m-auto my-6">
                <Download
                  url={`https://res.cloudinary.com/motogarage/image/upload/l_text:Arial_45_bold:Entry%20Price:%20$${bestTrade.entry_price},x_285/l_text:Arial_45_bold:Current%20Price:%20$${bestTrade.current_price},x_285,y_75/co_rgb:38bd36,l_text:Arial_45_bold:Total%20Gains:%20+${bestTrade.delta}%25,x_285,y_200/v1644240478/defidash/Capture51564.png`}
                />
              </div>
              <br />
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}

export default Portfolio;
