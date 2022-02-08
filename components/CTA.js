import React from "react";

function CTA() {
  return (
    <section className="py-1 bg-white-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-12">
        <div className="flex flex-col py-10 ">
          <br />
          <div className="m-auto">
            <a
              className=" bg-indigo-500 text-white active:bg-indigo-600 text-xl font-bold uppercase px-3 py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
              href="https://traderjoexyz.com/trade?outputCurrency=0x959b88966fC5B261dF8359961357d34F4ee27b4a#/"
              target="_blank"
              rel="noreferrer"
            >
              Buy $UNIV
            </a>
          </div>
          <br />
        </div>
      </div>
    </section>
  );
}

export default CTA;
