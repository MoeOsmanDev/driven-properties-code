import { MultiStepForm } from '@/components/forms/MultiStepForm';

export default function Home() {
  return (
    <div className='w-full min-h-screen px-3 sm:px-4 py-6 sm:py-8 bg-gradient-to-br from-cyan-700 via-cyan-100 to-slate-900'>
      <div className='w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto'>
        <div className='text-center mb-6 sm:mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-2'>
            Property Registration
          </h1>
          <p className='text-sm sm:text-base text-gray-700'>
            Complete your property registration in a few simple steps
          </p>
        </div>
        <MultiStepForm />
      </div>
    </div>
  );
}
