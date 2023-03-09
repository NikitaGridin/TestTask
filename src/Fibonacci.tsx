import React from 'react'

export const Fibonacci = () => {
    let prev_1 = 3;
    let prev_2 = 4;
    let current = prev_1 + prev_2;
    let even_sum = 0;
    
    let a:number[] = [];
    while (current <= 7000000) {
      if (current % 2 === 0) {
        even_sum += current;
      }
if(current < 200){
    a.push(current)
}      prev_1 = prev_2;
      prev_2 = current;
      current = prev_1 + prev_2;
    }
        
  return (
    <div className='m-5'>Сумма чётных чисел Фибоначи до 7 000 000: {even_sum} <br /> {a+''}</div>
  )
}
