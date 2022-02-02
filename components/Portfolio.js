import React, { useState, useEffect } from "react";
import Moment from "react-moment";

function Portfolio({ wallet, token, chain }) {
  const [tokenJson, setTokenJson] = useState(false);
  const [history, setHistory] = useState(false);
  const [tokenSummary, setTokenSummary] = useState({});
  const [abp, setABP] = useState(0);
  const [pnl, setPnL] = useState(0);
  const [totalWorth, setTotalWorth] = useState(0);
  var profits = 0;

  useEffect(() => {
    fetch(`/api/hello?token=${token}&chain=${chain}&wallet=${wallet}`)
      .then((response) => response.json())
      .then((data) => {
        setTokenJson(data.transactions);
        setHistory(data.history);
      });

    fetch(
      `https://openapi.debank.com/v1/user/token_list?id=0xe66037d732ac018358a999ea4b8f4a561e87b7e0&chain_id=avax&is_all=true`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("debank", data);
        setTokenSummary(data.filter((t) => t.id == token)[0]);
      });
  }, []);

  useEffect(() => {
    try {
      setABP(tokenJson[token].total_buy_worth / tokenJson[token].total_buys);
    } catch (e) {
      console.log("json", tokenJson);
    }
  }, [tokenJson]);

  useEffect(() => {
    setTotalWorth(tokenSummary.amount * tokenSummary.price);
  }, [tokenSummary]);

  useEffect(() => {
    if (tokenJson) {
      setPnL(
        tokenJson[token].total_buys > 0
          ? totalWorth +
              tokenJson[token].total_sell_value -
              tokenJson[token].total_buy_value
          : "-"
      );
    }
  }, [totalWorth, tokenJson]);

  return (
    <>
      <div className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8">
        <div className="sm:flex sm:space-x-4">
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
                  <p className="text-3xl font-bold text-black">
                    ${parseFloat(abp).toFixed(4)}
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
                    Profits
                  </h3>
                  <p className="text-3xl font-bold text-black">
                    ${parseFloat(pnl).toFixed(2)}
                  </p>
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
                    Buy $UNIV
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
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((txn) => {
                      return (
                        <tr key={txn.transaction_address}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            <Moment format="YYYY/MM/DD" unix>
                              {txn.timestamp}
                            </Moment>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {txn.tokens_in[0].address == token
                              ? parseFloat(txn.tokens_in[0].price_usd).toFixed(
                                  5
                                )
                              : parseFloat(txn.tokens_out[0].price_usd).toFixed(
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
                              : parseFloat(txn.tokens_in[0].amount).toFixed(2)}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {txn.tokens_in[0].address == token
                              ? parseFloat(txn.tokens_out[0].amount).toFixed(2)
                              : "-"}
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
        </div>
      </section>
    </>
  );
}

export default Portfolio;
