import React from 'react'
import { TCalAges } from '../../../Types/TableTypes'

function CountAge({calculateAges} : Pick<TCalAges,"calculateAges">)  {
  return (
    <div className='bg-gray-800 shadow-lg shadow-gray-900 px-2 md:px-3 py-2 rounded-xl hover:bg-gray-900 w-[75%] transition-colors duration-300 mb-5'>
        <div className='flex justify-around gap-2 items-center text-white'>
            <h1 className='text-lg font-semibold md:text-xl md:font-bold'>
                Teens : {calculateAges?.().teens}
            </h1>
            <h1 className='text-lg font-semibold md:text-xl md:font-bold'>
                Adults : {calculateAges?.().adults}
            </h1>
            <h1 className='text-lg font-semibold md:text-xl md:font-bold'>
                Olds : {calculateAges?.().olds}
            </h1>
        </div>
    </div>
  )
}

export default React.memo(CountAge)