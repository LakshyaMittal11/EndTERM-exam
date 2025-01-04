
async function fetchAndRenderProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      const products = data.products;
  
     
      renderProducts(products);
  

      const searchBox = document.getElementById('search-box');
      searchBox.addEventListener('input', () => filterProducts(products));
    } catch (error) {
      console.error('Error fetching products:', error);
      const productGrid = document.getElementById('product-grid');
      productGrid.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
  }
  
  function renderProducts(products) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = ''; 
  
    if (products.length === 0) {
      productGrid.innerHTML = '<p>No products found.</p>';
      return;
    }
  
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
        <h2>${product.title}</h2>
        <p>Price: $${product.price}</p>
        <p>${product.description}</p>
      `;
      productGrid.appendChild(productElement);
    });
  }
  
  function filterProducts(products) {
    const searchValue = document.getElementById('search-box').value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue)
    );
    renderProducts(filteredProducts);
  }
  
  fetchAndRenderProducts();
  