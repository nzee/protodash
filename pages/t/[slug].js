import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Connect from "../../components/Connect";
import AppContext from "../../components/AppContext";
import { createContext, useContext } from "react";
import { useMoralis } from "react-moralis";
import Portfolio from "../../components/Portfolio";
import CTA from "../../components/CTA";
import DexGuru, { ChainsListModel } from "dexguru-sdk";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Details() {
  const router = useRouter();
  const [tokenBasics, setTokenBasics] = useState(false);
  const { slug } = router.query;

  const [tokenFinance, setTokenFinance] = useState({});
  const [tokenPrice, setTokenPrice] = useState(0);
  const [tokenAvailable, setTokenAvailable] = useState(false);
  const [volume, setVolume] = useState(0);
  const [wallet, setWallet] = useState(false);
  const { isAuthenticated, user, authenticate, logout } = useMoralis();
  const value = useContext(AppContext);
  let { walletAddr } = value.state;
  let chain = "43114";
  let token = "0x959b88966fc5b261df8359961357d34f4ee27b4a";
  var _apiKey = process.env.NEXT_PUBLIC_DEXGURU_API_KEY;
  const sdk = new DexGuru(_apiKey, "https://api.dev.dex.guru");
  let dollarUSLocale = Intl.NumberFormat("en-US");

  useEffect(async () => {
    if (tokenBasics) {
      const response = await sdk.getTokenFinance(
        tokenBasics.chainId,
        tokenBasics.token
      );
      console.log("finance", response);
      console.log("tokenBasics.chain", tokenBasics.chain);
      setTokenPrice(response.price_usd);
      setVolume(response.volume_24h_usd);

      console.log(
        "fetch url",
        `https://openapi.debank.com/v1/user/token_list?id=${wallet}&chain_id=${tokenBasics.chain}&is_all=true`
      );

      fetch(
        `https://openapi.debank.com/v1/user/token_list?id=${wallet}&chain_id=${tokenBasics.chain}&is_all=true`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("debank", data);
          try {
            var _available = data.filter((t) => t.id == tokenBasics.token)[0];
          } catch (e) {}
          //   setTokenAvailable(true);
          console.log("available?", _available);
          _available ? setTokenAvailable(true) : setTokenAvailable(false);
        });
    }
  }, [tokenBasics]);

  useEffect(() => {
    if (walletAddr) {
      // setWallet("0x375495bda1a990edde7f4fbf176c3dfff81fe0dd");
      //   setWallet(user.get("ethAddress"));
      setWallet(walletAddr);
    }
  }, [walletAddr]);

  useEffect(() => {
    fetch(`/api/tokens`)
      .then((response) => response.json())
      .then((data) => {
        setTokenBasics(data.tokens.filter((t) => t.slug === slug)[0]);
      });
  }, [slug, wallet]);

  return (
    <div>
      {/* component */}
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: `url("${tokenBasics && tokenBasics.cover}")`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            />
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x={0}
              y={0}
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-80">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full center  px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={tokenBasics && tokenBasics.pfp}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-6 mt-32 sm:mt-0"></div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {tokenBasics && tokenBasics.title}
                  </h3>
                  <div className="w-full px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div id="wrapper" className="max-w-3xl px-4 py-4 mx-auto">
                        <div className="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                          <div
                            id="jh-stats-positive"
                            className="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded"
                          >
                            <div>
                              <p className="text-3xl font-semibold text-center text-gray-800">
                                ${parseFloat(tokenPrice).toFixed(6)}
                              </p>
                              <p className="text-lg text-center text-gray-500">
                                Price
                              </p>
                            </div>
                          </div>
                          <div
                            id="jh-stats-negative"
                            className="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0"
                          >
                            <div>
                              <p className="text-3xl font-semibold text-center text-gray-800">
                                {tokenBasics && tokenBasics.tokenHolders}
                              </p>
                              <p className="text-lg text-center text-gray-500">
                                Token Holders
                              </p>
                            </div>
                          </div>
                          <div
                            id="jh-stats-neutral"
                            className="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0"
                          >
                            <div>
                              <p className="text-3xl font-semibold text-center text-gray-800">
                                $
                                {dollarUSLocale.format(
                                  parseFloat(volume).toFixed(0)
                                )}
                              </p>
                              <p className="text-lg text-center text-gray-500">
                                Trading Volume(24h)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {tokenBasics && tokenBasics.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <div className="px-6">
                {walletAddr ? (
                  <>
                    {tokenAvailable ? (
                      <Portfolio
                        key={tokenBasics && tokenBasics.token}
                        wallet={wallet}
                        slug={tokenBasics && tokenBasics.slug}
                        chain={tokenBasics && tokenBasics.chainId}
                        chainSlug={tokenBasics && tokenBasics.chain}
                        token={tokenBasics && tokenBasics.token}
                        available={tokenAvailable}
                        pfp={tokenBasics && tokenBasics.pfp}
                      />
                    ) : (
                      <CTA slug={tokenBasics && tokenBasics.slug} />
                    )}
                  </>
                ) : (
                  <Connect slug={slug} />
                )}
              </div>
            </div>
          </div>
          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    Made by folks from
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href="https://defidash.carrd.co"
                    >
                      {" "}
                      DeFiDash.
                    </a>
                    <br />
                    {isAuthenticated ? (
                      <a onClick={() => logout()}>logout</a>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Details;
