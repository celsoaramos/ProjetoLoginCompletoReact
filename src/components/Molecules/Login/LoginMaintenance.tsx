import React from 'react'
import Label from '../../Atoms/Label'

const LoginMaintenance = () => {
  return (
    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
      <div className="text-center mb-10">
        <Label
          text="MANUTENÇÃO"
          textSize='three'
          fontWeight='bolder'
          color='text-gray-900'
        />
        <Label
          text="Voltaremos em breve.."
          textSize='medium'
          fontWeight='lighter'
          color='text-gray-600'
          className='px-3 py-3'
        />
      </div>
      <div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <Label
              text="Fizemos uma pausa para atualizar nosso sistema."
              textSize='small'
              fontWeight='semibolder'
              color='text-gray-500'
              className='px-1'
            />
          </div>
        </div>
        <div className="flex -mx-3">
          <div className="w-full px-3 mb-5">
            <Label
              text="Voltaremos em breve com novidades."
              textSize='small'
              fontWeight='semibolder'
              color='text-gray-500'
              className='px-1'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginMaintenance