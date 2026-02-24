// Calendar functionality
class MealPlannerCalendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        this.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        this.init();
    }

    init() {
        this.renderCalendar();
        this.setupEventListeners();
        this.loadDailyOptions();
        this.updateLastUpdated();
    }

    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        document.getElementById('closeMealDetails').addEventListener('click', () => {
            this.closeMealDetails();
        });

        document.getElementById('showInventoryBtn').addEventListener('click', () => {
            this.showInventory();
        });

        document.getElementById('mealDetails').addEventListener('click', (e) => {
            if (e.target.id === 'mealDetails') {
                this.closeMealDetails();
            }
        });
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month header
        document.getElementById('currentMonth').textContent = 
            `${this.monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = '';

        // Add day headers
        this.dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'day-header';
            dayHeader.textContent = day;
            dayHeader.style.cssText = `
                background: #34495e;
                color: white;
                padding: 0.5rem;
                text-align: center;
                font-weight: 600;
                font-size: 0.8rem;
            `;
            grid.appendChild(dayHeader);
        });

        // Generate calendar days
        const current = new Date(startDate);
        for (let week = 0; week < 6; week++) {
            for (let day = 0; day < 7; day++) {
                const dayElement = this.createDayElement(current, month);
                grid.appendChild(dayElement);
                current.setDate(current.getDate() + 1);
                
                // Stop if we've gone past the next month's first week
                if (current.getMonth() !== month && current.getDate() > 7) {
                    return;
                }
            }
        }
    }

    createDayElement(date, currentMonth) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const isCurrentMonth = date.getMonth() === currentMonth;
        const dateString = this.formatDateString(date);
        const meal = typeof getMealForDate === 'function' ? getMealForDate(dateString) : null;
        const isSunday = date.getDay() === 0; // 0 = Sunday
        
        if (!isCurrentMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (meal) {
            dayElement.classList.add('has-meal');
        }

        if (isSunday && isCurrentMonth) {
            dayElement.classList.add('shopping-day');
        }

        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);

        // Meal title if exists, or shopping indicator for Sunday
        if (meal && isCurrentMonth) {
            const mealTitle = document.createElement('div');
            mealTitle.className = 'meal-title';
            mealTitle.textContent = `${meal.emoji} ${meal.meal}`;
            dayElement.appendChild(mealTitle);
        } else if (isSunday && isCurrentMonth) {
            const shoppingTitle = document.createElement('div');
            shoppingTitle.className = 'shopping-title';
            shoppingTitle.textContent = '🛒 Shopping List';
            dayElement.appendChild(shoppingTitle);
        }

        // Click handler
        if (isCurrentMonth) {
            if (isSunday) {
                dayElement.addEventListener('click', () => {
                    this.showShoppingList(date);
                });
                dayElement.style.cursor = 'pointer';
            } else if (meal) {
                dayElement.addEventListener('click', () => {
                    this.showMealDetails(date, meal);
                });
                dayElement.style.cursor = 'pointer';
            }
        }

        return dayElement;
    }

    async showShoppingList(date) {
        const detailsElement = document.getElementById('mealDetails');
        const dateElement = document.getElementById('detailsDate');
        const contentElement = document.getElementById('detailsContent');

        // Format date
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = `${date.toLocaleDateString('en-US', options)} - Shopping List`;

        // Show loading message
        contentElement.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading shopping list... 🛒</div>';
        detailsElement.classList.add('active');

        const dateString = this.formatDateString(date);
        let weekData = null;

        try {
            // Try to fetch external JSON file first
            const response = await fetch('./shopping-lists.json');
            if (response.ok) {
                const shoppingData = await response.json();
                weekData = shoppingData[dateString];
            }
        } catch (error) {
            console.log('Could not load external shopping list, using fallback data');
        }

        // Fallback data if JSON file fails to load
        if (!weekData) {
            const fallbackData = {
                "2026-02-22": {
                    "freshVegetables": [
                        "Stir-fry vegetable mix",
                        "Sweet potatoes", 
                        "Asparagus",
                        "Celery, carrots (for soup)",
                        "Lettuce, tomatoes, cucumber (for sandwiches/salads)",
                        "Mushrooms",
                        "Potatoes (for soup)",
                        "Broccoli, cauliflower (for sheet-pan)"
                    ],
                    "freshFruits": [
                        "Apples",
                        "Grapes",
                        "Berries (blueberries, strawberries)"
                    ],
                    "breadGrains": [
                        "Whole grain bread"
                    ],
                    "otherFresh": [
                        "Oat milk",
                        "Hummus", 
                        "Low-sodium vegetable broth",
                        "Low-sodium marinara sauce"
                    ],
                    "pantryItems": [
                        "Garlic",
                        "Onion (1)",
                        "Ginger",
                        "Italian seasoning",
                        "Better than bouillon",
                        "Vegetable broth (2)",
                        "Refried beans (2)",
                        "Black beans (3)",
                        "Tomato sauce (2)",
                        "Penne pasta",
                        "Rigatoni pasta",
                        "Chickpeas",
                        "Alfredo sauce",
                        "Salsa",
                        "Liquid smoke",
                        "Garlic powder",
                        "Tahini",
                        "Fake meat crumbles",
                        "Frozen fruit",
                        "Tortillas",
                        "Taco shells",
                        "Wooden skewers",
                        "Croutons",
                        "Cashews"
                    ]
                }
            };
            weekData = fallbackData[dateString];
        }

        let content = `
            <div class="shopping-info">
                <h3>🛒 Weekly Shopping List</h3>
                <p class="shopping-subtitle">Ingredients needed for this week's meals</p>
        `;

        if (weekData) {
            // Fresh Vegetables
            if (weekData.freshVegetables && weekData.freshVegetables.length > 0) {
                content += `
                    <h4>🥕 Fresh Vegetables:</h4>
                    <div class="shopping-category">
                        ${weekData.freshVegetables.map(item => `<div class="shopping-item">• ${item}</div>`).join('')}
                    </div>
                `;
            }

            // Fresh Fruits
            if (weekData.freshFruits && weekData.freshFruits.length > 0) {
                content += `
                    <h4>🍎 Fresh Fruits:</h4>
                    <div class="shopping-category">
                        ${weekData.freshFruits.map(item => `<div class="shopping-item">• ${item}</div>`).join('')}
                    </div>
                `;
            }

            // Bread & Grains
            if (weekData.breadGrains && weekData.breadGrains.length > 0) {
                content += `
                    <h4>🍞 Bread & Grains:</h4>
                    <div class="shopping-category">
                        ${weekData.breadGrains.map(item => `<div class="shopping-item">• ${item}</div>`).join('')}
                    </div>
                `;
            }

            // Other Fresh Items
            if (weekData.otherFresh && weekData.otherFresh.length > 0) {
                content += `
                    <h4>🥛 Other Fresh Items:</h4>
                    <div class="shopping-category">
                        ${weekData.otherFresh.map(item => `<div class="shopping-item">• ${item}</div>`).join('')}
                    </div>
                `;
            }

            // Pantry Items
            if (weekData.pantryItems && weekData.pantryItems.length > 0) {
                content += `
                    <h4>🏪 Pantry Items:</h4>
                    <div class="shopping-category">
                        ${weekData.pantryItems.map(item => `<div class="shopping-item">• ${item}</div>`).join('')}
                    </div>
                `;
            }
        } else {
            content += `<p>No shopping list available for this date.</p>`;
        }

        content += `
                <div class="shopping-tip">
                    <p><strong>💡 Tip:</strong> Check items off as you shop, and don't forget reusable bags!</p>
                </div>
            </div>
        `;

        contentElement.innerHTML = content;
    }

    async showInventory() {
        const detailsElement = document.getElementById('mealDetails');
        const dateElement = document.getElementById('detailsDate');
        const contentElement = document.getElementById('detailsContent');

        dateElement.textContent = "📦 Pantry Inventory";

        // Show loading message
        contentElement.innerHTML = '<div style="text-align: center; padding: 2rem;">Loading pantry inventory... 📦</div>';
        detailsElement.classList.add('active');

        let inventory = null;

        try {
            // Try to fetch external JSON file first
            const response = await fetch('./pantry-inventory.json');
            if (response.ok) {
                inventory = await response.json();
            }
        } catch (error) {
            console.log('Could not load external inventory, using fallback data');
        }

        // Fallback data if JSON file fails to load
        if (!inventory) {
            inventory = {
                "grains_noodles": {
                    "title": "Grains & Noodles",
                    "items": [
                        { "name": "Rice", "status": "have" },
                        { "name": "Spaghetti noodles", "status": "have" },
                        { "name": "Lo mein noodles", "status": "have" },
                        { "name": "Ramen noodles", "status": "have" },
                        { "name": "Penne pasta", "status": "need" },
                        { "name": "Rigatoni pasta", "status": "need" }
                    ]
                },
                "canned_jarred": {
                    "title": "Canned/Jarred",
                    "items": [
                        { "name": "Refried beans", "status": "need", "quantity": "2" },
                        { "name": "Black beans", "status": "need", "quantity": "3" },
                        { "name": "Chickpeas", "status": "need" },
                        { "name": "Vegetable broth", "status": "need", "quantity": "2" },
                        { "name": "Better than bouillon", "status": "need" },
                        { "name": "Marinara sauce", "status": "have" },
                        { "name": "Tomato sauce", "status": "need", "quantity": "2" },
                        { "name": "Alfredo sauce", "status": "need" },
                        { "name": "Salsa", "status": "need" }
                    ]
                },
                "condiments_sauces": {
                    "title": "Condiments & Sauces",
                    "items": [
                        { "name": "Soy sauce", "status": "have" },
                        { "name": "Italian dressing", "status": "have" },
                        { "name": "Vegan mayo", "status": "have" },
                        { "name": "Sesame oil", "status": "have" },
                        { "name": "Olive oil", "status": "have" },
                        { "name": "Liquid smoke", "status": "need" }
                    ]
                },
                "spices_seasonings": {
                    "title": "Spices & Seasonings", 
                    "items": [
                        { "name": "Garlic", "status": "need" },
                        { "name": "Onion", "status": "need", "quantity": "1" },
                        { "name": "Italian seasoning", "status": "need" },
                        { "name": "Taco seasoning", "status": "need" },
                        { "name": "Ginger", "status": "need" },
                        { "name": "Turmeric", "status": "have" },
                        { "name": "Cumin", "status": "have" },
                        { "name": "Paprika", "status": "have" },
                        { "name": "Salt and pepper", "status": "have" },
                        { "name": "Garlic powder", "status": "need" }
                    ]
                },
                "pantry_staples": {
                    "title": "Pantry Staples",
                    "items": [
                        { "name": "Nutritional yeast", "status": "have" },
                        { "name": "Tahini", "status": "need" },
                        { "name": "White miso paste", "status": "have" },
                        { "name": "Lemon juice", "status": "have" },
                        { "name": "Vanilla extract", "status": "have" },
                        { "name": "Maple syrup", "status": "have" },
                        { "name": "Wasabi", "status": "have" },
                        { "name": "Pancake mix", "status": "have" }
                    ]
                },
                "frozen_items": {
                    "title": "Frozen Items",
                    "items": [
                        { "name": "Fake meat crumbles", "status": "need" },
                        { "name": "Impossible burgers", "status": "have" },
                        { "name": "Frozen fruit", "status": "need" }
                    ]
                },
                "dry_shelf_stable": {
                    "title": "Dry/Shelf-stable",
                    "items": [
                        { "name": "Tortillas", "status": "need" },
                        { "name": "Taco shells", "status": "need" },
                        { "name": "Seaweed wraps", "status": "have" },
                        { "name": "Wooden skewers", "status": "need" },
                        { "name": "Bacon bits", "status": "have" },
                        { "name": "Croutons", "status": "need" }
                    ]
                }
            };
        }

        let content = `
            <div class="inventory-info">
                <h3>📦 Current Pantry Status</h3>
                <p class="inventory-subtitle">Check what you have and what you need</p>
        `;

        if (inventory) {
            Object.keys(inventory).forEach(categoryKey => {
                const category = inventory[categoryKey];
                content += `
                    <div class="inventory-category">
                        <h4>${category.title}</h4>
                `;

                category.items.forEach(item => {
                    const statusClass = item.status === 'have' ? 'status-have' : 'status-need';
                    const statusText = item.status === 'have' ? '✓ Have' : '✗ Need';
                    const quantityText = item.quantity ? ` (${item.quantity})` : '';
                    
                    content += `
                        <div class="inventory-item ${item.status}">
                            <span>${item.name}${quantityText}</span>
                            <span class="inventory-status ${statusClass}">${statusText}</span>
                        </div>
                    `;
                });

                content += `</div>`;
            });
        } else {
            content += `<p>Inventory data not available.</p>`;
        }

        content += `
                <div class="inventory-tip">
                    <p><strong>💡 Tip:</strong> Items marked "Need" are already on your shopping lists. Add any low items to this week's list!</p>
                </div>
            </div>
        `;

        contentElement.innerHTML = content;
    }

    showMealDetails(date, mealData) {
        const detailsElement = document.getElementById('mealDetails');
        const dateElement = document.getElementById('detailsDate');
        const contentElement = document.getElementById('detailsContent');

        // Format date
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = date.toLocaleDateString('en-US', options);

        // Build content
        let content = `
            <div class="meal-info">
                <h3>${mealData.emoji} ${mealData.meal}</h3>
                ${mealData.note ? `<p><strong>Note:</strong> ${mealData.note}</p>` : ''}
                
                <h4>🥘 Ingredients:</h4>
                <div class="ingredients-list">
        `;

        if (mealData.ingredients) {
            mealData.ingredients.forEach(ingredient => {
                const className = ingredient.onHand ? 'ingredient on-hand' : 'ingredient';
                const status = ingredient.onHand ? ' ✓' : '';
                content += `<div class="${className}">${ingredient.name}${status}</div>`;
            });
        }

        content += `
                </div>
                <h4>� Health Benefits:</h4>
                <p style="background: #e8f5e8; padding: 0.75rem; border-radius: 6px; color: #27ae60;">
                    Healthy choice: ${mealData.healthNote}
                </p>
            </div>
        `;

        contentElement.innerHTML = content;
        detailsElement.classList.add('active');
    }

    closeMealDetails() {
        document.getElementById('mealDetails').classList.remove('active');
    }

    loadDailyOptions() {
        const { breakfast, lunch, snacks } = mealPlanData.dailyOptions;
        
        // Breakfast options
        const breakfastList = document.getElementById('breakfastOptions');
        breakfastList.innerHTML = breakfast.map(item => `<li>${item}</li>`).join('');
        
        // Lunch options
        const lunchList = document.getElementById('lunchOptions');
        lunchList.innerHTML = lunch.map(item => `<li>${item}</li>`).join('');
        
        // Snack options
        const snackList = document.getElementById('snackOptions');
        snackList.innerHTML = snacks.map(item => `<li>${item}</li>`).join('');
    }

    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('lastUpdated');
        const updateDate = new Date(mealPlanData.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short', 
            day: 'numeric'
        });
        lastUpdatedElement.textContent = updateDate;
    }

    formatDateString(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

// Initialize the calendar when the page loads and all scripts are available
document.addEventListener('DOMContentLoaded', () => {
    // Wait a brief moment to ensure meals-data.js is fully loaded
    setTimeout(() => {
        new MealPlannerCalendar();
    }, 100);
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add a subtle pulse animation to days with meals and shopping days
    const style = document.createElement('style');
    style.textContent = `
        .calendar-day.has-meal {
            animation: mealPulse 3s ease-in-out infinite;
        }
        
        .calendar-day.shopping-day {
            animation: shopPulse 3s ease-in-out infinite;
        }
        
        @keyframes mealPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); }
            50% { box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1); }
        }
        
        @keyframes shopPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4); }
            50% { box-shadow: 0 0 0 4px rgba(255, 193, 7, 0.1); }
        }
        
        .calendar-day.has-meal:hover,
        .calendar-day.shopping-day:hover {
            animation: none;
        }
    `;
    document.head.appendChild(style);
});

// Service Worker for offline functionality (disabled due to GitHub Pages limitations)
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('SW registered'))
            .catch(() => console.log('SW registration failed'));
    });
}
*/