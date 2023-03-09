import React from 'react'

interface ResultProps {
    message: string;
    count: number;
  }
  

export const Result = ({ message, count }: ResultProps) => {
    return (
    <div className='w-full border-yellow-400 border rounded-lg mt-5 p-2 text-center'>{message}: {count}</div>
  )
}
