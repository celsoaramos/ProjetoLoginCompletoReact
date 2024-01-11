import React, { useState } from 'react'
import Icon from '../../Atoms/Icon'
import { Link } from 'react-router-dom';
import Label from '../../Atoms/Label';
import { useAuthContext } from '@/contexts/AuthContext';

const Header = () => {

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const {
    user,
  } = useAuthContext()

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  return (

    <>
      <header className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-black">Bem-vindo, {user?.name}</h2>

          <button onClick={toggleSubMenu} className='mr-10'>
            <Icon icon='mdi-account-circle' size='five' color="text-gray-800" />
          </button>
        </div>
      </header>

      {/* Submenu */}
      {isSubMenuOpen && (
        <div className="absolute right-0 mt-0 mr-6 bg-white border rounded shadow-md">
          <Link
            to="/perfil"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            <Icon icon='mdi-account-settings' size='large' color="text-gray-800" className='mr-3' />
            <Label color='labelGray' text='Perfil' />
          </Link>
          <Link
            to="/financeiro"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            <Icon icon='mdi-chart-line' size='large' color="text-gray-800" className='mr-3' />
            <Label color='labelGray' text='Financeiro' />
          </Link>
          <div className="border-t"></div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
          >
            <Icon icon='mdi-logout' size='large' color="text-gray-800" className='mr-3' />
            <Label color='labelGray' text='Sair' />
          </button>
        </div>
      )}
    </>
  )
}

export default Header