import type { LucideProps } from 'lucide-react';

export const Icons = {
  Logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 12L9 6l6 10 6-4" />
      <path d="M3 20l6-4 6 4 6-4" />
    </svg>
  ),
};
