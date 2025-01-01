export default function Error() {
    return (
        <>
            <section className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 p-16 text-white">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-lg text-center">
                        <h2 className="mb-8 font-extrabold text-9xl md:text-[12rem] lg:text-[14rem] animate-pulse">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-3xl md:text-4xl font-semibold text-white opacity-80 mb-6">
                            Whoops! This page doesn't exist.
                        </p>
                        <p className="text-lg md:text-xl text-gray-100 mb-8">
                            Don't worry, there’s plenty more on our homepage to discover.
                        </p>
                        <a
                            href="/"
                            className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-pink-600 text-gray-800 font-semibold rounded-full shadow-lg transition duration-300 transform hover:scale-105 hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-pink-400"
                        >
                            Take me home
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
