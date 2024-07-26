import React from 'react'

const Skeleton = () => {
  return (
    <section className="">
    <div className="container px-6 py-10 mx-auto animate-pulse">
        <h1 className="w-48 h-2 mx-auto bg-neutral-700 rounded-lg "></h1>

        <p className="w-64 h-2 mx-auto mt-4 bg-neutral-700 rounded-lg "></p>
        <p className="w-64 h-2 mx-auto mt-4 bg-neutral-700 rounded-lg sm:w-80 "></p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full ">
                <div className="w-full h-64 bg-neutral-800 rounded-lg md:h-72 "></div>
                
                <h1 className="w-56 h-2 mt-4 bg-neutral-700 rounded-lg "></h1>
                <p className="w-24 h-2 mt-4 bg-neutral-700 rounded-lg "></p>
            </div>

            <div className="w-full ">
                <div className="w-full h-64 bg-neutral-800 rounded-lg md:h-72 "></div>
                
                <h1 className="w-56 h-2 mt-4 bg-neutral-700 rounded-lg "></h1>
                <p className="w-24 h-2 mt-4 bg-neutral-700 rounded-lg "></p>
            </div>

            <div className="w-full ">
                <div className="w-full h-64 bg-neutral-800 rounded-lg md:h-72 "></div>
                
                <h1 className="w-56 h-2 mt-4 bg-neutral-700 rounded-lg "></h1>
                <p className="w-24 h-2 mt-4 bg-neutral-700 rounded-lg "></p>
            </div>
        </div>
    </div>
</section>
  )
}

export default Skeleton