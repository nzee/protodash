import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Connect from "../components/Connect";

export default function Home() {
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
              backgroundImage:
                'url("https://cdn.tofunft.com/covers/1qkvfy776zb87gi.jpg/1440.png")',
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
                        src="https://pbs.twimg.com/profile_images/1485280648478797833/f5bEDj8Y_400x400.jpg"
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
                    Universe (🌌,🌌) 🔺
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
                              <div>
                                <p className="flex items-center justify-end text-green-500 text-md">
                                  <span className="font-bold">6%</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className="heroicon-ui"
                                      d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"
                                    />
                                  </svg>
                                </p>
                              </div>
                              <p className="text-3xl font-semibold text-center text-gray-800">
                                $0.00052889
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
                              <div>
                                <p className="flex items-center justify-end text-red-500 text-md">
                                  <span className="font-bold">6%</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className="heroicon-ui"
                                      d="M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z"
                                    />
                                  </svg>
                                </p>
                              </div>
                              <p className="text-3xl font-semibold text-center text-gray-800">
                                $5,755,766
                              </p>
                              <p className="text-lg text-center text-gray-500">
                                Market Cap
                              </p>
                            </div>
                          </div>
                          <div
                            id="jh-stats-neutral"
                            className="flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0"
                          >
                            <div>
                              <div>
                                <p className="flex items-center justify-end text-gray-500 text-md">
                                  <span className="font-bold">0%</span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 fill-current"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      className="heroicon-ui"
                                      d="M17 11a1 1 0 010 2H7a1 1 0 010-2h10z"
                                    />
                                  </svg>
                                </p>
                              </div>
                              <p className="text-3xl font-semibold text-center text-gray-800">
                                $2,425,721
                              </p>
                              <p className="text-lg text-center text-gray-500">
                                Trading Volume
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
                        Universe $UNIV is an innovative DaaS on #Avalanche.
                        Passive income up to 2,044% APR, NFTs, Sustainability &
                        Metaverse. Founder: @cattyverse
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
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-6 mt-32 sm:mt-0"></div>
                  </div>
                </div>
                <Connect />
              </div>
            </div>
          </div>
          <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center md:justify-between justify-center">
                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                  <div className="text-sm text-blueGray-500 font-semibold py-1">
                    Made by folks from<a href="defidash.carrd.co"> DeFiDash.</a>
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
