export default function Error() {
    return (
        <>
            <section className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-16 text-white">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl md:text-[12rem] lg:text-[14rem]">
                            <span className="sr-only">Error</span>404
                        </h2>
                        <p className="text-2xl font-semibold md:text-3xl">
                            Sorry, we couldn't find this page.
                        </p>
                        <p className="mt-4 mb-8 text-lg text-gray-200">
                            But don’t worry, you can find plenty of other things on our homepage.
                        </p>
                        <a
                            href="/"
                            className="px-8 py-3 font-semibold rounded-lg bg-violet-600 text-gray-50 transition duration-300 transform hover:scale-105 hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300"
                        >
                            Back to homepage
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
