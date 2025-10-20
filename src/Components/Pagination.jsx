'use client'
import React from 'react'

const Pagination = () => {
  return (
 <div className="join">
  <input
    className="join-item btn btn-square btn-sm"
    type="radio"
    name="options"
    aria-label="1"
    checked="checked"
   
    />
  <input className="join-item btn btn-square btn-sm" type="radio" name="options" aria-label="2" />
  <input className="join-item btn btn-square btn-sm" type="radio" name="options" aria-label="3" />
  <input className="join-item btn btn-square btn-sm" type="radio" name="options" aria-label="4" />
</div>
  )
}

export default Pagination
