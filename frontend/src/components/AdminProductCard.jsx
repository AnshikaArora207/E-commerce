import React from 'react'
import rupees from '../utils/rupees'

const AdminProductCard = ({data}) => {
  return (
    <div className='p-4 rounded bg-[#303030]'>
        <img src={data?.productImage[0]} className='w-[160px] h-[120px]' alt="" />
        <h1>{data?.productName}</h1>
        <p className='font-semibold'>{rupees(data?.sellingPrice)}</p>
    </div>
  )
}

export default AdminProductCard