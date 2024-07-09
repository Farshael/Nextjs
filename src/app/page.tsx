import React from 'react';

export default function ExampleComponent() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">Mini Project</span>
          </a>

          <div className="ml-auto">
            <a href="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Login
            </a>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Your main content here */}
        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="object-cover w-full h-48 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="/image/banner (2).png" alt="Foto" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Halo, Selamat datang di mini-project</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </div>
        </a>
      </div>
    </>
  );
}
