import Link from 'next/link';
import Image from 'next/image'; 

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#2d3748] text-white px-4 text-center'>
            <div className='mb-8'>
                <Image 
                    src="/error-404.png"
                    alt="404 Illustration" 
                    width={500} 
                    height={300} 
                    priority
                />
            </div>
            

            <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                Page Not Found
                </h1>

            <p className='text-gray-400 max-w-md mb-8 leading-relaxed'>
                Sorry, the page you are looking for doesn’t exist or has been removed. Keep exploring our site.
                </p>

            <Link 
                href="/" 
                className="bg-[#f0623e] hover:bg-[#d55435] text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200 flex items-center gap-2"
            >
                Back to Home <span>↗</span>
            </Link>

        </div>
    );
}