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
         <div class="products rounded-2xl shadow-sm h-full">
            <div class="product-image inline-block"><img class="w-60 h-60" src="${data.image}" alt=""></div>
            <h2 class="Bangla-font text-2xl font-semibold mt-3">${data.name}</h2>
            <p class="Bangla-font text-xl font-semibold mt-2">৳ ${data.price} <span>${data.unit}</span></p>
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
      let cartcount = document.getElementById('cartcount').innerText
      let totalCount = Number(cartcount)
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
         <div class="products rounded-2xl shadow-sm h-full">
            <div class="product-image inline-block"><img class="w-60 h-60" src="${data.image}" alt=""></div>
            <h2 class="Bangla-font text-2xl font-semibold mt-3">${data.name}</h2>
            <p class="Bangla-font text-xl font-semibold mt-2">৳ ${data.price} <span>${data.unit}</span></p>
            <button id="btn-${data.id}" onclick="addCart('btn-${data.id}')" class="cartbtn btn bg-[#469642] text-white mt-3 rounded-full hover:text-[#469642] hover:bg-white mb-7">কার্টে যোগ করুন</button>
          </div>
         `
         displayProducts.appendChild(div)
       }
         
           
      }
  }

  document.getElementById('productlist').addEventListener('click', ()=>{
      document.getElementById('hero').classList.add('hidden')
      document.getElementById('allproductlist').classList.add('add-mt') 
  })
  document.getElementById('productlist1').addEventListener('click', ()=>{
    document.getElementById('hero').classList.add('hidden')
    document.getElementById('allproductlist').classList.add('add-mt') 
  })