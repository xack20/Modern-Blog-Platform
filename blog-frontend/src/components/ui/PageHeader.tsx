import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  gradient?: boolean;
}

export default function PageHeader({ title, subtitle, children, gradient = false }: PageHeaderProps) {
  return (
    <div className={`relative pt-24 pb-16 ${gradient ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900' : 'bg-white dark:bg-slate-900'} overflow-hidden`}>
      {gradient && (
        <>
          {/* Background decorations for gradient variant */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>
        </>
      )}
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            gradient 
              ? 'bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent' 
              : 'text-gray-900 dark:text-white'
          }`}>
            {title}
          </h1>
          
          {subtitle && (
            <p className={`text-xl leading-relaxed max-w-3xl mx-auto ${
              gradient 
                ? 'text-gray-300' 
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {subtitle}
            </p>
          )}
          
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
