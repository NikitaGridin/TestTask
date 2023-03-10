import React from 'react'

interface ResultProps {
    message: string;
    count?: number;
    border: string;
  }
  

export const Result = ({ message, count,border }: ResultProps) => {
    return (
    <div className={`w-full ${border} rounded-lg mt-5 p-2 text-center border-2 font-semibold`}>{message}: {count}</div>
  )
}
