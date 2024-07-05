import React from 'react'
import rupees from '../utils/rupees'

const AdminProductCard = ({data}) => {
  return (
    <div className='p-4 w-40 rounded bg-[#303030]'>
      <div className='w-32 h-32 flex justify-center items-center'>
      <img src={data?.productImage[0]} className='mx-auto object-fill h-full' alt="" />
      </div>
        <h1 className=' text-ellipsis line-clamp-1'>{data?.productName}</h1>
        <p className='font-semibold'>{rupees(data?.sellingPrice)}</p>
    </div>
  )
}

export default AdminProductCard