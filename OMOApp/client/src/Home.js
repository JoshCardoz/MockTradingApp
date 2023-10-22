import React from "react";
import LoginBar from "./LoginBar";

function Home(){
    return (
        <>
    <LoginBar />
    <div className="h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white pt-2">
        
        <div className="bg-gradient-to-br from-black to-gray-700 p-10 rounded-md grid grid-cols-6 gap-4 m-5 ">
                <div className="col-span-4"> 
                    <h1 className="text-3xl font-bold text-white mb-4">Buy and Sell</h1>
                    <p className=" text-white text-bottom text-lg mb-6">


                    Explore the realm of the stock market without risking actual funds. Build your trading expertise by virtually investing in leading companies such as Apple, Google, and others.
                    </p>
                    <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-2 px-8 rounded-full mt-6">
                        Start Investing
                    </button>
                </div>
                <div className="col-span-1 pd-6">
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/VIDEO_ID"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe>
                </div>
            </div>

            <div className="bg-gradient-to-br from-black to-gray-700 mt-12 md:flex md:flex-row md:py-5 md:pl-7">
                            <div className="text-white flex flex-col text-left font-display pt-24 md:justify-center md:max-w-sm md:pt-0 lg:max-w-3xl lg:pl-10 md:pr-5">
                                <h3 className="text-xl font-bold text-white mb-2">Create Profile</h3>
                                <h2 className="text-3xl font-bold mb-4 text-violet-700">Easy Way to Get Started</h2>
                                <p className="text-gray-400">
                                Whether you're an experienced investor or a newcomer, our platform provides a safe avenue to sharpen your abilities and expand your financial horizons.
                                </p>
                            </div>

                            <div class="text-white flex flex-col items-center font-display md:mr-5">
                                <ul class="grid grid-cols-1 md:grid-cols-2">
                                    <li class="rounded-lg bg-black m-2 p-5 mb-4 pl-8">
                                        <h5 class="font-bold text-md mb-4">
                                            <span class="text-primarydark text-violet-700">1. </span>
                                            Create An Account
                                        </h5>
                                        <p class="text-neutraldark text-sm"> Sign up with a username and password in under 2 minutes</p>
                                    </li>
                                    <li class="rounded-lg bg-black m-2 p-5 mb-4 pl-8">
                                        <h5 class="font-bold text-md mb-4">
                                            <span class="text-primarydark text-violet-700">2. </span>
                                            Analyse Companies
                                        </h5>
                                        <p class="text-neutraldark text-sm"> Decide which companies you'd like to invest in.</p>
                                    </li>
                                    <li class="rounded-lg bg-black m-2 p-5 mb-4 pl-8">
                                        <h5 class="font-bold text-md mb-4">
                                            <span class="text-primarydark text-violet-700">3. </span>
                                            Start Investing Instantly
                                        </h5>
                                        <p class="text-neutraldark text-sm"> Trade a range of stocks using $1,000 in virtual funds.</p>
                                    </li>
                                    <li class="rounded-lg bg-black m-2 p-5 mb-4 pl-8">
                                        <h5 class="font-bold text-md mb-4">
                                            <span class="text-primarydark text-violet-700">4. </span>
                                            Compete Against Friends
                                        </h5>
                                        <p class="text-neutraldark text-sm"> Discover the top earners on our leaderboard.</p>
                                    </li>
                                </ul>
                            </div>
                            
            </div>
    </div>
</>


    );
             
}

export default Home;