import React, { useEffect, useState } from 'react';

interface IconProps {
  icon: string
  color: string
  size: 'small' | 'medium' | 'large' | 'two' | 'three' | 'four' | 'five'
  className?: string
}

const Icon: React.FC<IconProps> = ({ icon, color, size, className }) => {

  const [sizeIcon, setSizeIcon] = useState('')

  const handleTextSize = () => {
    if (size === 'small') {
      setSizeIcon('text-xs')
    } else if (size === 'medium') {
      setSizeIcon('text-sm')
    } else if (size === 'large') {
      setSizeIcon('text-lg')
    } else if (size === 'two') {
      setSizeIcon('text-2xl')
    } else if (size === 'three') {
      setSizeIcon('text-3xl')
    } else if (size === 'four') {
      setSizeIcon('text-4xl')
    } else if (size === 'five') {
      setSizeIcon('text-5xl')
    }
  }

  useEffect(() => {
    handleTextSize()
  })

  return (
    <i className={`mdi ${icon} ${sizeIcon} ${color} ${className}`} />
  );
};

export default Icon;
