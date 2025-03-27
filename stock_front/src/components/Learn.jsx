import React, { useState } from "react";

import Navbar from "./Navbar";
import  '../style/Learn.css'

const Learn = () => {
  const [activeTab, setActiveTab] = useState("videos");
 
  const videos = [
    "https://www.youtube.com/embed/x0G4WtO0LCQ?si=ISIa4dYOTnoOFsmj",
    "https://www.youtube.com/embed/tmryHfunyQ4?si=5370auMg-fCcbNSN",
    "https://www.youtube.com/embed/lNdOtlpmH5U?si=h86MERz2eKYDHpHr",
    "https://www.youtube.com/embed/8zWQ9aXmeaY?si=b7oep750FTvDw9f0",
    "https://www.youtube.com/embed/vrQ584TCVko?si=U-xhJHkXdIBm6fIU",
    "https://www.youtube.com/embed/ZCFkWDdmXG8?si=K4e_Znwb1vpED4sd"
  ];

  const faqs = [
    { question: "What is stock investment?", answer: "Stock investment refers to buying shares of a company to gain profits through dividends or price appreciation." },
    { question: "How do I start investing?", answer: "You can start investing by opening a brokerage account, researching stocks, and diversifying your portfolio." },
    { question: "What are the risks involved?", answer: "Stock investments come with risks such as market volatility, economic downturns, and company-specific risks." },
    { question: "What is a stock market index?", answer: "A stock market index measures the performance of a group of stocks, representing a particular sector or the entire market." },
    { question: "What are blue-chip stocks?", answer: "Blue-chip stocks belong to well-established, financially stable companies known for steady performance over time." },
    { question: "What is the difference between stocks and mutual funds?", answer: "Stocks represent ownership in a company, whereas mutual funds pool money from investors to invest in a diversified portfolio of stocks or bonds." },
    { question: "What is an IPO?", answer: "An Initial Public Offering (IPO) is when a company offers its shares to the public for the first time to raise capital." },
    { question: "How can I analyze a stock before investing?", answer: "You can analyze a stock using fundamental analysis (company financials, earnings, P/E ratio) or technical analysis (price trends, charts, and indicators)." },
    { question: "What are dividends?", answer: "Dividends are payments made by a company to its shareholders, usually derived from profits." },
    { question: "How do I minimize investment risks?", answer: "Diversifying your portfolio, staying updated on market trends, and investing for the long term can help reduce investment risks." }
  ];
  

  const blogs = [
    { title: "Stock Market Trends 2024", content: "Stay updated with the latest market trends and expert insights...", link: "https://equityechoes.co.in/indian-stock-market-2024-performance-and-2025-outlook/" },
    { title: "Beginner's Guide to Investing", content: "A step-by-step guide to help beginners understand stock investments...", link: "https://www.nerdwallet.com/article/investing/how-to-invest-in-stocks" },
    { title: "How to Diversify Your Portfolio", content: "Learn why diversification is key to risk management and long-term success...", link: "https://www.forbes.com/advisor/investing/stock-market-basics/" },
    { title: "Understanding Stock Market Indicators", content: "Discover key indicators that can help you make better investment decisions...", link: "https://www.stockguru.in/trading-guide/best-shares-to-buy-today.jsp" },
    { title: "Top 5 Investment Strategies for 2024", content: "Explore effective strategies to maximize returns in the upcoming year...", link: "https://www.motilaloswal.com/learning-centre/2024/3/five-strategies-for-profitable-investments-in-2024" },
    { title: "Common Mistakes to Avoid in Stock Investing", content: "Avoid these pitfalls to ensure a successful investment journey...", link: "https://www.investopedia.com/articles/stocks/07/beat_the_mistakes.asp" }
  ];


  return (
   <>
     <div className="learn-body min-h-screen ">
   <Navbar/>
    <div className="learn-content mt-[80px]   mx-auto p-6 space-y-8">
      {/* Tabs Section */}
      <div className="flex h-[50px]  justify-center space-x-4   pb-3">
        <button onClick={() => setActiveTab("videos")} className={`px-4 py-2 w-[80px] rounded-md ${activeTab === "videos" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>Videos</button>
        <button onClick={() => setActiveTab("blogs")} className={`px-4 py-2 w-[80px] rounded-md ${activeTab === "blogs" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>Blogs</button>
        <button onClick={() => setActiveTab("qna")} className={`px-4 py-2 w-[80px] rounded-md ${activeTab === "qna" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>Q&A</button>
      </div>

      {/* Content Sections */}
      {activeTab === "videos" && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 mt-[10px]">Stock Investment Videos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 ">
            {videos.map((video, index) => (
              <div key={index} className="w-full h-60">
                <iframe
                  className="w-full h-full rounded-lg shadow-lg"
                  src={video}
                  title={`Stock Investment Video ${index + 1}`}
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}
      

      {activeTab === "blogs" && (
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">Latest Investment Blogs</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  ">
            {blogs.map((blog, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md h-[150px] ">
                <h4 className="font-semibold text-lg">{blog.title}</h4>
                <p className="text-gray-600">{blog.content}</p>
                <a href={blog.link} className="text-blue-500 font-semibold hover:underline">Read More</a>
              </div>
            ))}
          </div>
        </div>
      )}

 

{activeTab === "qna" && (
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4 text-white">Knowledge Key Notes</h3>
          <div className="flex flex-col items-center space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="w-full md:w-2/3 p-6 bg-white   shadow-md text-center">
                <h4 className="font-semibold text-lg text-blue-600">{faq.question}</h4>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}




    </div>
  
    </div>
   </>

    );
};

export default Learn;
