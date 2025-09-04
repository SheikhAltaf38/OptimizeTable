import React from 'react'

function CountAge({calculateAges}) {
  return (
    <div className='bg-gray-800 shadow-lg shadow-gray-900 px-3 py-2 rounded-xl hover:bg-gray-900 w-[75%] transition-colors duration-300'>
        <div className='flex justify-around items-center text-white'>
            <h1 className='text-xl font-bold'>
                Teens : {calculateAges().teens}
            </h1>
            <h1 className='text-xl font-bold'>
                Adults : {calculateAges().adults}
            </h1>
            <h1 className='text-xl font-bold'>
                Olds : {calculateAges().olds}
            </h1>
        </div>
    </div>
  )
}

export default CountAge