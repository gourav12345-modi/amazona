import express from 'express';
import data from './data';
const app = express();

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x=> x._id === productId);
  if(product){
    console.log(product);
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found"})
    console.log("result failed");
  }
})

app.get("/api/products", (req, res) => {
  res.send(data.products);
})



app.listen(5001, () => {
  console.log("server started at http://localhost:5001")
})