import { useMemo, useState, useCallback, useEffect } from 'react'
function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function loadProducts(query) {
      const res = await fetch(`http://localhost:3333/products?search=${query}`)
      const data = await res.json()
      setProducts(data)
    }
    loadProducts(searchQuery)
  }, [searchQuery])
  console.log(products)

  return (
    <>
      <header className="bar d-flex align-items-center justify-content-center position-relative">
        <input type="text" name="serach-politician" id="search-bar" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} />
        <button type="button">Search</button>
        {
          searchQuery && products.length > 0 && (
            <ul className='suggestions'>
              {products.map(p => {
                return (
                  <li key={p.id}>{p.name}</li>
                )
              })}
            </ul>
          )
        }
      </header>
    </>
  )
}

export default App
