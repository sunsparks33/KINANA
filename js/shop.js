// Shop page filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categorySections = document.querySelectorAll('.category-section');
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter categories
            filterCategories(category);
        });
    });
    
    function filterCategories(category) {
        categorySections.forEach(section => {
            if (category === 'all') {
                section.classList.remove('hidden');
                section.style.display = 'block';
            } else {
                const sectionCategory = section.getAttribute('data-category');
                if (sectionCategory === category) {
                    section.classList.remove('hidden');
                    section.style.display = 'block';
                } else {
                    section.classList.add('hidden');
                    section.style.display = 'none';
                }
            }
        });
        
        // Smooth scroll to top of products section
        if (category !== 'all') {
            const targetSection = document.querySelector(`[data-category="${category}"]`);
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }
    }
    
    // Handle anchor links in navigation
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Show all categories first
                filterCategories('all');
                
                // Update filter buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                const correspondingBtn = document.querySelector(`[data-category="${targetId}"]`);
                if (correspondingBtn) {
                    correspondingBtn.classList.add('active');
                    filterCategories(targetId);
                } else {
                    document.querySelector('[data-category="all"]').classList.add('active');
                }
                
                // Scroll to section
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 100);
            }
        });
    });
    
    // Enhanced search functionality for shop page
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // Reset all products to visible
                const allProducts = document.querySelectorAll('.product-card');
                allProducts.forEach(product => {
                    product.style.display = 'block';
                    product.style.border = '';
                });
                return;
            }
            
            // Search through all products
            const allProducts = document.querySelectorAll('.product-card');
            let foundProducts = [];
            
            allProducts.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                
                if (productName.includes(searchTerm)) {
                    product.style.display = 'block';
                    product.style.border = '3px solid #ff6b35';
                    foundProducts.push(product);
                } else {
                    product.style.display = 'none';
                    product.style.border = '';
                }
            });
            
            // Show all categories when searching
            if (foundProducts.length > 0) {
                filterCategories('all');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-category="all"]').classList.add('active');
                
                // Scroll to first found product
                if (foundProducts[0]) {
                    setTimeout(() => {
                        foundProducts[0].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }, 100);
                }
            }
        });
    }
});

