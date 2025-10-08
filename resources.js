// 资源相关脚本 - 包含学生ID后三位678

document.addEventListener('DOMContentLoaded', function() {
    // 加载资源数据
    loadResources678();
});

// 加载资源数据并显示 - 包含学生ID后三位678
function loadResources678() {
    // 从JSON文件加载资源数据（替换原硬编码数据）
    fetch('resources.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load resources');
            }
            return response.json();
        })
        .then(resources => {
            // 处理图片路径（原JSON中是相对路径，补充为完整路径）
            const normalizedResources = resources.map(resource => ({
                ...resource,
                // 原JSON中图片是"resource1.jpg"等，补充为实际路径（若图片在images文件夹可改为`images/${resource.image}`）
                image: resource.image.includes('http') ? resource.image : `https://picsum.photos/600/400?random=${20 + resource.id}`
            }));
            
            // 显示资源
            displayResources678(normalizedResources);
            
            // 在首页显示部分资源
            if (document.getElementById('featured-resources-container')) {
                const featuredResources = normalizedResources.slice(0, 3);
                displayFeaturedResources678(featuredResources);
            }
        })
        .catch(error => {
            console.error('Error loading resources:', error);
        });
}

// 显示资源列表 - 保持不变
function displayResources678(resources) {
    const container = document.getElementById('resources-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <div class="resource-image">
                <img src="${resource.image}" alt="${resource.title}">
            </div>
            <div class="resource-content">
                <span class="resource-code">Unit: ${resource.unitNumber}</span>
                <h3>${resource.title}</h3>
                <p class="resource-description">${resource.description}</p>
                <p class="resource-price">${formatPrice678(resource.price)}</p>
                <button class="btn add-to-cart-btn" onclick="addToCart678(${resource.id}, '${resource.title}', ${resource.price}, '${resource.image}', '${resource.description}', '${resource.unitNumber}')">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        container.appendChild(resourceCard);
    });
}

// 显示特色资源 - 保持不变
function displayFeaturedResources678(resources) {
    const container = document.getElementById('featured-resources-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        resourceCard.innerHTML = `
            <div class="resource-image">
                <img src="${resource.image}" alt="${resource.title}">
            </div>
            <div class="resource-content">
                <span class="resource-code">Unit: ${resource.unitNumber}</span>
                <h3>${resource.title}</h3>
                <p class="resource-description">${resource.description}</p>
                <p class="resource-price">${formatPrice678(resource.price)}</p>
                <button class="btn add-to-cart-btn" onclick="addToCart678(${resource.id}, '${resource.title}', ${resource.price}, '${resource.image}', '${resource.description}', '${resource.unitNumber}')">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        `;
        
        container.appendChild(resourceCard);
    });
}

// 以下函数（addToCart678、showAddToCartNotification678）保持不变
function addToCart678(id, title, price, image, description, unitNumber) {
    let cart = getCart678();
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id,
            title,
            price,
            image,
            description,
            unitNumber,
            quantity: 1
        });
    }
    
    saveCart678(cart);
    showAddToCartNotification678(title);
}

function showAddToCartNotification678(title) {
    const notification = document.createElement('div');
    notification.className = 'success-message';
    notification.textContent = `"${title}" has been added to your cart!`;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1000';
    notification.style.padding = '1rem';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}
