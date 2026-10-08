import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href = '#',
  onClick,
  className = '',
}) => {
  return (
    <a
      href={href}
      target={href !== '#' ? '_blank' : undefined}
      rel={href !== '#' ? 'noopener noreferrer' : undefined}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors duration-200 hover:bg-[#D7E2EA]/10 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base cursor-pointer ${className}`}
    >
      Live Project
    </a>
  );
};
