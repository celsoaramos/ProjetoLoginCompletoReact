import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from '../Molecules/Layout/Header'
import Sidebar from '../Molecules/Layout/Sidebar'

import Pacient from '@/pages/Pacient'
import Home from '@/pages/Home'

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      <Sidebar />
      <main className="flex-1">
        <Header />
        <div className="mt-4 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paciente" element={<Pacient />} />
          </Routes>
        </div>
        <footer className='bg-green' />
      </main>
    </div>
  )
}

export default Layout