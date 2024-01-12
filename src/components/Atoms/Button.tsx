import React, { useEffect, useState } from 'react';

interface ButtonProps {
  type: 'default' | 'submit' | 'cancel' | 'text' | 'disabled'
  label: string
  textSize?: 'small' | 'medium' | 'large' | 'two' | 'three' | 'four'
  fontWeight?:  'lighter' | 'normal' | 'semibolder'	| 'bolder'
  className?: string
  onClick?: () => void
}

const Button = ({ label, onClick, className, type, textSize, fontWeight }: ButtonProps) => {

  const [typeButton, setTypeButton] = useState('')
  const [textSizeButton, setTextSizeButton] = useState('')
  const [fontWeightButton, setFontWeightButton] = useState('')

  const handleType = () => {
    if (type === 'default') {
      setTypeButton('block w-full max-w-xs mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold px-3 py-3 rounded-lg')
    } else if (type === 'submit') {
      setTypeButton('block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-70 text-white font-bold px-3 py-3 rounded-lg')
    } else if (type === 'cancel') {
      setTypeButton('block w-full max-w-xs mx-auto bg-red-500 hover:bg-red-700 text-white font-bold px-3 py-3 rounded-lg')
    } else if (type === 'text') {
      setTypeButton('bg-transparent text-gray-500 font-semibold py-2 px-1')
    } else if (type === 'disabled') {
      setTypeButton('block w-full max-w-xs mx-auto bg-gray-500 text-white font-bold px-3 py-3 rounded-lg cursor-not-allowed')
    }
  }

  const handleTextSize = () => {
    if (textSize === 'small') {
      setTextSizeButton('text-xs')
    } else if (textSize === 'medium') {
      setTextSizeButton('text-sm')
    } else if (textSize === 'large') {
      setTextSizeButton('text-lg')
    } else if (textSize === 'two') {
      setTextSizeButton('text-2xl')
    } else if (textSize === 'three') {
      setTextSizeButton('text-3xl')
    } else if (textSize === 'four') {
      setTextSizeButton('text-4xl')
    }
  }

  const handleFontWeight = () => {
    if (fontWeight === 'lighter') {
      setFontWeightButton('font-light')
    } else if (fontWeight === 'normal') {
      setFontWeightButton('font-normal')
    } else if (fontWeight === 'semibolder') {
      setFontWeightButton('font-semibold')
    } else if (fontWeight === 'bolder') {
      setFontWeightButton('font-bold')
    }
  }

  useEffect(() => {
    handleType()
    handleTextSize()
    handleFontWeight()
  })

  return (
    <button
      onClick={onClick}
      className={`${typeButton} ${textSizeButton} ${fontWeightButton} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
