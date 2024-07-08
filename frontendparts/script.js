document.addEventListener('DOMContentLoaded', () => {
  const productForm = document.getElementById('productForm');
  const productList = document.getElementById('productList');

  // Fetch all products from backend API and display on page load
  fetchProducts();

  // Add event listener to form submission for adding new product
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: productName, price: productPrice }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const newProduct = await response.json();
      console.log('Product added:', newProduct);

      // Clear form inputs
      document.getElementById('productName').value = '';
      document.getElementById('productPrice').value = '';

      // Add new product to the product list
      addProductToList(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  });

  // Function to fetch all products from backend API
  async function fetchProducts() {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const products = await response.json();
      console.log('Products:', products);

      // Display products in the DOM
      products.forEach(product => {
        addProductToList(product);
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Function to add a product item to the product list
  function addProductToList(product) {
    const li = document.createElement('li');
    li.textContent = `${product.name} - $${product.price}`;
    li.classList.add('product-item');

    // Create buttons for update and delete actions
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', () => updateProduct(product._id));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteProduct(product._id));

    li.appendChild(updateButton);
    li.appendChild(deleteButton);
    productList.appendChild(li);
  }

  // Function to update a product
  async function updateProduct(productId) {
    const newName = prompt('Enter new name for the product:');
    const newPrice = prompt('Enter new price for the product:');

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName, price: newPrice }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      console.log('Product updated:', updatedProduct);

      // Update product in the UI
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  // Function to delete a product
  async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        console.log('Product deleted:', productId);

        // Remove product from the UI
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
});
