import React from "react";
import love4 from "../assets/love4.png";
import love5 from "../assets/love5.png";
import love6 from "../assets/love6.png";
import logo from "../assets/Logo.png";
import playstore from "../assets/playstore.png";
import appstore from "../assets/appstore.png";

export default function AboveFooter() {
  return (
    <>
    <div className="banner flex flex-col sm:flex-row items-center gap-4 sm:gap-20 justify-center bg-slate-100 py-4 sm:py-6 border-b-2 border-slate-300">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-white bg-cyan-600 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-center">
          भारतीयों द्वारा विश्वास किया गया
        </h1>
        <div className="flex flex-wrap justify-center mt-4 sm:mt-0">
          <div className="flex flex-col items-center mr-4 sm:mr-8">
            <img src={love4} alt="" className="w-16 sm:w-20" />
            <p className="text-base sm:text-lg mt-2">Best Matches</p>
          </div>
          <div className="flex flex-col items-center mr-4 sm:mr-8">
            <img src={love5} alt="" className="w-16 sm:w-20" />
            <p className="text-base sm:text-lg mt-2">Verified Profiles</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={love6} alt="" className="w-16 sm:w-20" />
            <p className="text-base sm:text-lg mt-2">99.99% Privacy</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 py-10 justify-center items-center sm:px-10 md:px-20 lg:px-40 xl:px-60">
        <img className="mx-auto h-24 w-auto" src={logo} alt="Logo" />
        <p className="text-lg sm:text-xl lg:text-2xl text-center mt-4">
          आज के समय में, एक साथी खोजना मुश्किल हो सकता है। एकल लोगों के लिए बहुत सारे विकल्प हैं और वे सभी एक जैसे लगते हैं! इसीलिए YV की स्थापना आपकी खोज को आसान बनाने के उद्देश्य से की गई थी। हम चाहते हैं कि आप खुशी पाएं। YV भारत की नंबर 1 मैचमेकिंग सेवा है, जिसे एक साधारण उद्देश्य के साथ स्थापित किया गया था - लोगों को अपने जीवन में खुशी और प्यार पाने में मदद करना।
        </p>
      </div>
      

      <div className="apps w-full flex flex-col items-center justify-center py-5 bg-slate-100">
        <h1 className="text-3xl md:text-5xl pb-3">Get the Matrimony app here..</h1>
        <div className="flex gap-3">
          <img
            src={playstore}
            alt="playstore"
            className="h-16 md:h-20 w-auto object-contain cursor-pointer hover:shadow-xl duration-300"
          />
          <img
            src={appstore}
            alt="appstore"
            className="h-16 md:h-20 w-auto object-contain cursor-pointer hover:shadow-xl duration-300"
          />
        </div>
      </div>
    </>
  );
}
