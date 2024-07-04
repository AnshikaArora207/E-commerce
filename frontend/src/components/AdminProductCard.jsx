import React from 'react'

const AdminProductCard = ({data}) => {
  return (
    <div className='p-4 rounded bg-[#303030]'>
        <img src={data?.productImage[0]} className='w-[160px] h-[120px]' alt="" />
        <h1>{data?.productName}</h1>
        <p>{data?.sellingPrice}</p>
    </div>
  )
}

export default AdminProductCard