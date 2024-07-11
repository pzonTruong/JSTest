document.addEventListener('DOMContentLoaded', () => {
    const addDataBtn = document.getElementById('addDataBtn');
    const addProductModal = document.getElementById('addProductModal');
    const closeModalBtn = document.querySelector('.close');
    const productForm = document.getElementById('productForm');
    const productContainer = document.getElementById('productContainer');
    const placeholderImage = document.getElementById('placeholder');

    loadProducts();
    
    addProductModal.style.display = 'none';

    
    addDataBtn.addEventListener('click', () => {
        addProductModal.style.display = 'block';
    });

   
    closeModalBtn.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    
    closeModalButton.addEventListener('click', () => {
        addProductModal.style.display = 'none';
    });

    
    window.addEventListener('click', event => {
        if (event.target === addProductModal) {
            addProductModal.style.display = 'none';
        }
    });

   
    productForm.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const imageInput = document.getElementById('image');
        const imageFile = imageInput.files[0];

        if (!name || !price || !description || !imageFile) {
            alert('Please fill out all fields.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function() {
            const imageBase64 = reader.result;

            const product = { name, price, description, imageBase64 };
            addProduct(product);
            saveProduct(product);

            productForm.reset();
            addProductModal.style.display = 'none';
        };
        reader.readAsDataURL(imageFile);
    });

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        if (products.length === 0) {
            placeholderImage.style.visibility = 'block';
        } else {
            placeholderImage.style.visibility = 'hidden';
            products.forEach(product => addProduct(product));
        }
    }

    function addProduct(product) {
        const productBlock = document.createElement('div');
        productBlock.className = 'product-block';

        productBlock.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>${product.description}</p>
            <img class = "image-setting" src="${product.imageBase64}" alt="${product.name}">
            <br>
            <button class = "edit-btn" onclick="editProduct(this)">Edit</button>
            <button class = "del-btn" onclick="deleteProduct(this)">Delete</button>
        `;

        productContainer.appendChild(productBlock);

        placeholderImage.style.visibility = 'hidden'; 
    }

    function saveProduct(product) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    }

    window.editProduct = function(button) {
        const productBlock = button.parentNode;
        const name = productBlock.querySelector('h3').innerText;
        const price = productBlock.querySelector('p:nth-of-type(1)').innerText.replace('Price: ', '');
        const description = productBlock.querySelector('p:nth-of-type(2)').innerText;

        document.getElementById('name').value = name;
        document.getElementById('price').value = price;
        document.getElementById('description').value = description;

        deleteProduct(button);
        addProductModal.style.display = 'block';
    };

    window.deleteProduct = function(button) {
        const productBlock = button.parentNode;
        const name = productBlock.querySelector('h3').innerText;

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(product => product.name !== name);
        localStorage.setItem('products', JSON.stringify(products));

        productBlock.remove();
        

        if (products.length === 0) {
            placeholderImage.style.display = 'block';
        }
    };
});
