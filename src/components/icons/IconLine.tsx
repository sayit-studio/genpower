interface IconLineProps {
  size?: number
}

export default function IconLine({ size = 24 }: IconLineProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5" fill="#06C755" />
      <path
        d="M12 5C8.13 5 5 7.69 5 11c0 1.97 1.1 3.74 2.83 4.92L7 20l4.35-2.38c.21.03.43.05.65.05 3.87 0 7-2.69 7-6s-3.13-6-7-6zm-2.5 7.5h-1V11h1v1.5zm2 0h-1V11h1v1.5zm2 0h-1V11h1v1.5z"
        fill="white"
      />
    </svg>
  )
}
