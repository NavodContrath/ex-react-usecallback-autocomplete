import { useState, useCallback, useEffect } from 'react'
//debouncer fuori dal componente
function debounce(callback, delay) {
  let timer
  return (query) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(query);
    }, delay)
  }
}

function App() {
  //state dinamici
  const [searchQuery, setSearchQuery] = useState("")
  const [product, setProduct] = useState([])
  const [products, setProducts] = useState([])

  const loadProducts = useCallback(debounce((query) => {
    console.log(`api call ${query}`)
    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, 500), [])

  useEffect(() => {
    loadProducts(searchQuery)
  }, [searchQuery])

  //controllo se products viene popolato dopo la API call
  useEffect(() => {
    console.log(products)
  }, [products])

  const getProduct = async (id) => {
    const res = await fetch(`http://localhost:3333/products/${id}`)
    const data = await res.json()
    setProduct(data)
  }

  useEffect(() => {
    console.log(product)
  }, [product])

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
                  <li key={p.id} onClick={() => { getProduct(p.id) }}>{p.name}</li>
                )
              })}
            </ul>
          )
        }
      </header>
      <main>
        {
          product && (
            <div class="card">
              <img class="card-img-top" src={`${product.image}`} alt="Title" />
              <div class="card-body">
                <h4 class="card-title">{product.name}</h4>
                <h4 class="card-subtitle text-primary">{product.brand}</h4>
                <p class="card-text text-danger">{product.price}</p>
              </div>
            </div>

          )
        }
      </main>
    </>
  )
}

export default App
