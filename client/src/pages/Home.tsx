import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <button>
        <Link to="/product">Products</Link>
      </button>
    </div>
  )
}
