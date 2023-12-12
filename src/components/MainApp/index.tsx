import { useAuthContext } from '@/contexts/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { api } from '@/services/api'


export default function MainApp() {

  return (
    <div
      className="flex flex-col items-center w-full h-[100%] relative 
      max-sm:w-[100%] max-sm:overflow-y-auto max-sm:overflow-hidden max-sm:no-scrollbar"
    >
      LOGADO
    </div>
  )
}
