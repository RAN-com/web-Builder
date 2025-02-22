import hero from '../assets/hand.png';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center min-h-screen p-6">
      {/* Left Column - Text and Button */}
      <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover amazing features and opportunities tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            Get Started
          </button>
          <button className="border border-black text-black px-6 py-2 rounded-lg shadow-md hover:text-white hover:bg-blue-600 transition">
            Login
          </button>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="flex justify-center md:justify-end w-full md:w-1/2">
        <img 
          src={hero} 
          alt="Illustration" 
          className="max-w-full h-auto md:max-w-[500px] lg:max-w-[600px] rounded-lg"
        />
      </div>
    </div>
  );
}
