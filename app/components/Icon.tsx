import type { CSSProperties, ReactNode } from 'react'

export function Icon ({ children, className, style }: { children: ReactNode, className?: string, style?: CSSProperties }) {
  return (
    <div 
      className={`icon max-h-full max-w-full aspect-square [&>*]:h-full [&>*]:w-full [&>*]:aspect-square [&>*]:max-h-full [&>*]:max-w-full [&>*]:select-none ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
