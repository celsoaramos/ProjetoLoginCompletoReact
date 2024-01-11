import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Icon from '../../Atoms/Icon'
import Label from '../../Atoms/Label'

const Sidebar = () => {

  const [isUsersMenuOpen, setIsUsersMenuOpen] = useState(false);

  const toggleUsersMenu = () => setIsUsersMenuOpen(!isUsersMenuOpen);

  const location = useLocation();
  
  return (
    <aside className="w-60 bg-[#004872] text-white">
        <div className="p-4 text-center">
          <Label text='GESTÃO' textSize='two' className='font-semibold' color='text-white' />
        </div>
        <nav>
          <ul className="space-y-2 p-4">
            <NavLink to="/">
              
              <li className={`
              rounded-full
              p-1 pl-2 mb-2
              ${location.pathname === '/' && 'bg-[#1a6693]'}
              hover:bg-[#1a6693] hover:rounded-full transition-colors duration-300`}>
                <Icon color='text-white' icon='mdi-home-outline' size='large' className='pr-1' />
                <Label color='text-white' text='Home' />
              </li>
            </NavLink>
            
            <NavLink to="/paciente">
              <li className={`
                rounded-full
                p-1 pl-2
                ${location.pathname === '/paciente' && 'bg-[#1a6693]'}
                hover:bg-[#1a6693] hover:rounded-full transition-colors duration-300`}>
                <Icon color='text-white' icon='mdi-account-outline' size='large' className='pr-1' />
                <Label color='text-white' text='Paciente' />
              </li>
            </NavLink>
            <li>
              <div className="flex items-center p-1 pl-2" onClick={() => toggleUsersMenu()}>
                <Label text='Usuarios' color='text-white' />
                <span className="ml-auto">
                  {
                    isUsersMenuOpen ? 
                    <Icon icon='mdi-arrow-up-drop-circle-outline' color='text-white'  size='large'/>
                    : 
                    <Icon icon='mdi-arrow-down-drop-circle-outline' color='text-white'  size='large'/>
                  }
                </span>
              </div>
              <ul
                className={`ml-4 transition-all ${isUsersMenuOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
                  } overflow-hidden`}
              >
                <li className={`
                rounded-full
                p-1 pl-2
                ${location.pathname === '/' && 'bg-[#1a6693]'}
                hover:bg-[#1a6693] hover:rounded-full transition-colors duration-300`}>
                  <Label text='Usuario 1' color='text-white' textSize='medium' />
                </li>
                <li className={`
                rounded-full
                p-1 pl-2
                ${location.pathname === '/' && 'bg-[#1a6693]'}
                hover:bg-[#1a6693] hover:rounded-full transition-colors duration-300`}>
                  <Label text='Usuario 2' color='text-white' textSize='medium'/>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>
  )
}

export default Sidebar