let totalProducts = []
const loadProduct = ()=>{
       const url = './scripts/product.json'
       fetch(url)
       .then(res=> res.json())
       .then(data=>displayProducts(data))
       const displayProducts = (datas)=>{
         for(let data of datas){
         const div = document.createElement('div')
         const displayProducts = document.getElementById('displayproducts')
         div.innerHTML = `
         <div id=${data.id} onclick="products(event)" class="products rounded-2xl shadow-sm h-full">
            <div class="product-image product-image inline-block"><img class="w-60 h-60" src="${data.image}" alt=""></div>
            <h2 class="product-name Bangla-font text-2xl font-semibold mt-3">${data.name}</h2>
            <p class="Bangla-font text-xl font-semibold mt-2"><span class="product-price">৳ ${data.price}</span>  <span class="unit">${data.unit}</span></p>
            <button id="btn-${data.id}" onclick="addCart('btn-${data.id}')" class="cartbtn btn bg-[#469642] text-white mt-3 rounded-full hover:text-[#469642] hover:bg-white mb-7">কার্টে যোগ করুন</button>
          </div>
         `
         displayProducts.appendChild(div)
       }
       }
    }
    const addCart=(id)=>{
      const button = document.getElementById(id)
      const newBtn = document.createElement('button')
      const cart = document.getElementById('cartText')
      const cart2 = document.getElementById('cartTextDrop')

      newBtn.innerHTML = `
      <button id="btn-${id}" onclick="addCart('btn-${id}')" class="cartbtn btn text-[#469642] bg-white mt-3 rounded-full hover:text-[#469642] hover:bg-white mb-7 border border-[#469642]">কার্টে সফলভাবে যুক্ত হয়েছে</button>
      `
     button.replaceWith(newBtn)
     cart.classList.add('text-[#469642]')
     cart2.classList.add('text-[#469642]')
   
    }
  loadProduct();

  const searchValue=()=>{
   const url = './scripts/product.json'
       fetch(url)
       .then(res=> res.json())
       .then(data=>searchProducts(data))

      const searchProducts = (datas)=>{
        const hero = document.getElementById('hero')
        hero.classList.add('hidden')
        hero.classList.add('add-mt')
        document.getElementById('allcartproduct').classList.add('hidden')
        
         const searchProduct = document.getElementById('searchproduct').value
         const filterData = datas.filter(el =>
      el.name.toLowerCase().includes(searchProduct.toLowerCase()))
      const displayProducts = document.getElementById('displayproducts')
      displayProducts.innerHTML = ' '

    const noProduct = document.querySelector('#noproduct')
      if(filterData.length === 0){
        noProduct.classList.remove('hidden')
      }
      else{
        noProduct.classList.add('hidden')
      }
       
      for(let data of filterData){
         const div = document.createElement('div')
         
          
         div.innerHTML = `
         <div id=${data.id} onclick="{products(event)}" class="products rounded-2xl shadow-sm h-full">
            <div class="product-image inline-block"><img class="w-60 h-60" src="${data.image}" alt=""></div>
            <h2 class="product-name Bangla-font text-2xl font-semibold mt-3">${data.name}</h2>
            <p class="Bangla-font text-xl font-semibold mt-2"><span class="product-price">৳ ${data.price}</span> <span>${data.unit}</span></p>
            <button id="btn-${data.id}" onclick="addCart('btn-${data.id}')" class="cartbtn btn bg-[#469642] text-white mt-3 rounded-full hover:text-[#469642] hover:bg-white mb-7">কার্টে যোগ করুন</button>
          </div>
         `
         displayProducts.appendChild(div)
       }
         
           
      }
  }

  document.getElementById('productlist').addEventListener('click', ()=>{
      document.getElementById('hero').classList.add('hidden')
      document.getElementById('allproductlist').classList.remove('hidden') 
      document.getElementById('allproductlist').classList.add('add-mt') 
      const cart = document.getElementById('cart')
      cart.classList.add('hidden')
  })
  document.getElementById('productlist1').addEventListener('click', ()=>{
    document.getElementById('hero').classList.add('hidden')
      document.getElementById('allproductlist').classList.remove('hidden') 
      document.getElementById('allproductlist').classList.add('add-mt') 
      const cart = document.getElementById('cart')
      cart.classList.add('hidden') 
  })

  

  const products = (event)=>{
    if(event.target.classList.contains('cartbtn')){
    const parentNode = event.currentTarget
    const productID = parentNode.id
    const productImage = parentNode.querySelector('.product-image')
    const productName = parentNode.querySelector('.product-name').innerText
    const productPrice = parentNode.querySelector('.product-price').innerText
    const cartBtn = parentNode.querySelector('.cartbtn')

    
    const productInfo = {
      productID,
      productImage,
      productName,
      productPrice
    }


    const productExist = totalProducts.find(el=> el.productName === productInfo.productName)
    if(!productExist){
      totalProducts.push(productInfo)
    }
    const countProduct = document.getElementById('cartcount')
    countProduct.innerText = totalProducts.length
    const countProduct1 = document.getElementById('cartTextDropCount')
    countProduct1.innerText = totalProducts.length
   
    renderProduct()
    calculateTotalPrice()
    
  }
}

    document.getElementById('cartText').addEventListener('click', ()=>{
      const hero = document.getElementById('hero')
      const allProduct = document.getElementById('allproductlist')
      const cart = document.getElementById('cart')
      const noProduct = document.getElementById('notProductadd')
      hero.classList.add('hidden')
      allProduct.classList.add('hidden')
      cart.classList.remove('hidden')
      if (totalProducts.length === 0) {
    noProduct.classList.remove('hidden')
    document.getElementById('allcartproduct').classList.add('hidden')
  } else {
    noProduct.classList.add('hidden')
    document.getElementById('allcartproduct').classList.remove('hidden')
  }
    })
      document.getElementById('cartTextDrop').addEventListener('click', ()=>{
      const hero = document.getElementById('hero')
      const allProduct = document.getElementById('allproductlist')
      const cart = document.getElementById('cart')
      hero.classList.add('hidden')
      allProduct.classList.add('hidden')
      cart.classList.remove('hidden')
    })

    document.getElementById('logo').addEventListener('click' ,()=>{
      const hero = document.getElementById('hero')
      const allProduct = document.getElementById('allproductlist')
      const cart = document.getElementById('cart')
      hero.classList.remove('hidden')
      allProduct.classList.remove('hidden')
      cart.classList.add('hidden')
    })

   

    const productPrice = document.getElementById('productprice').innerText
    const delivaryPrice = document.getElementById('delivarycharge').innerText
    const totalAdd = document.getElementById('totaladd').innerText
    const totalPrice = document.getElementById('totalprice')
    const currentPrice = parseInt(productPrice)*parseInt(totalAdd) + parseInt(delivaryPrice) 
    totalPrice.innerText = currentPrice
   
    

  const renderProduct = ()=>{
  const cartContainer = document.getElementById('leftsidecart')
  cartContainer.innerHTML = ''
  
 
   
  for(let product of totalProducts){

    
    const div = document.createElement('div')

    div.innerHTML = `
    <div id=${product.productID} class="rounded-2xl shadow p-6 relative">
          ${product.productImage.outerHTML}
              <h1 class="font-semibold Bangla-font text-2xl">${product.productName}</h1>
              <h1 id="allproductprice" class="font-semibold Bangla-font text-lg">${product.productPrice}</h1>
              <button onclick="deleteProduct(${product.productID})" class="dltbtn absolute top-4 right-6 cursor-pointer"><i class="fa-solid fa-trash"></i></button>
              </div>
    `
    cartContainer.appendChild(div)
  }
}
    
  let allProductPrice = document.getElementById('allproductprice')
 
    
const calculateTotalPrice = () => {

  let total = 0

  for(let product of totalProducts){
    const price = parseInt(product.productPrice.replace(/[^\d]/g,''))

    total += price
  }

  const deliveryCharge = parseInt(document.getElementById('delivarycharge').innerText)
  document.getElementById('productprice').innerText = total
  if(total === 0){
    document.getElementById('totalprice').innerText = 0
  }
  else{
 document.getElementById('totalprice').innerText = total + deliveryCharge

  }
 
}

const deleteProduct = (id) => {
  totalProducts = totalProducts.filter(product => product.productID != id)

  renderProduct()
  calculateTotalPrice()

  document.getElementById('cartcount').innerText = totalProducts.length
  document.getElementById('cartTextDropCount').innerText = totalProducts.length
}