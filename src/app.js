import express from 'express'
import { ProductManager } from './ProductManager.js'

const PORT = 8080
const app = express()

app.get('/products', async (req, res) => {
  const { limit } = req.query

  const productsAdm = new ProductManager()
  const productsAll = await productsAdm.getProducts()

  if (!limit) {
    return res.json({
      status: true,
      data: productsAll
    })
  }

  const lim = productsAll.splice(0, limit)
  res.json({
    status: true,
    data: lim
  })
})

app.get('/products/:pid', async (req, res) => {
  const { pid } = req.params
 
  const productsAdm = new ProductManager()
  const producto = await productsAdm.getProductById(pid)

  res.json({
    status: true,
    data: {
      producto
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`)
})