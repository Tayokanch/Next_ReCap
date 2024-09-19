import React, { ReactNode } from 'react'

interface Props {
    children : ReactNode
}
const AdminLayout = ({children}:Props) => {
  return (
    <div className='flex min-h-screen'>
        <aside className='w-[150px]  bg-slate-200 p-5  justify-center'>Admin SiderBar</aside>
        <div className='flex-1 bg-yellow-600'>{children}</div>
    </div>
  )
}

export default AdminLayout