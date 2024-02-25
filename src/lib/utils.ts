import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const GhBaseURL = "https://api.github.com/repos/vercel/next.js/issues"
export const GhBaseURL = "https://api.github.com/repos/xup60521/gh-issue-blog/issues"
