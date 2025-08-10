import { MultiStepForm } from '@/components/forms/MultiStepForm';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent'></div>
      <div className='absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-cyan-400/20 rounded-full blur-3xl'></div>
      <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-blue-400/10 rounded-full blur-3xl'></div>

      <div className='relative w-full min-h-screen px-3 sm:px-4 py-6 sm:py-8'>
        <div className='w-full max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto'>
          <div className='text-center mb-8 sm:mb-12'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent mb-4 tracking-tight'>
              Property Registration
            </h1>
            <p className='text-base sm:text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed'>
              Complete your property registration in a few simple steps with our
              modern, secure platform
            </p>
            {/* Decorative line */}
            <div className='w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-6 rounded-full'></div>
          </div>
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
}
