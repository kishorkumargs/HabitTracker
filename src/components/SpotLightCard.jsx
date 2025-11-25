import React from 'react'

export default function SpotlightCard({ children, className = '', spotlightColor = 'rgba(59, 130, 246, 0.1)', style = {}, ...rest }) {
  const combinedStyle = {
    backgroundImage: `radial-gradient(circle at 12% 12%, ${spotlightColor} 0%, rgba(0,0,0,0) 35%)`,
    backgroundRepeat: 'no-repeat',
    ...style,
  }

  return (
    <div className={className} style={combinedStyle} {...rest}>
      {children}
    </div>
  )
}
