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
        const meal = getMealForDate(dateString);
        
        if (!isCurrentMonth) {
            dayElement.classList.add('other-month');
        }
        
        if (meal) {
            dayElement.classList.add('has-meal');
        }

        // Day number
        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = date.getDate();
        dayElement.appendChild(dayNumber);

        // Meal title if exists
        if (meal && isCurrentMonth) {
            const mealTitle = document.createElement('div');
            mealTitle.className = 'meal-title';
            mealTitle.textContent = `${meal.emoji} ${meal.meal}`;
            dayElement.appendChild(mealTitle);
        }

        // Click handler
        if (meal && isCurrentMonth) {
            dayElement.addEventListener('click', () => {
                this.showMealDetails(date, meal);
            });
            dayElement.style.cursor = 'pointer';
        }

        return dayElement;
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
                <h4>💚 Health Benefits:</h4>
                <p style="background: #e8f5e8; padding: 0.75rem; border-radius: 6px; color: #27ae60;">
                    Kidney-friendly: ${mealData.healthNote}
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

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MealPlannerCalendar();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add a subtle pulse animation to days with meals
    const style = document.createElement('style');
    style.textContent = `
        .calendar-day.has-meal {
            animation: mealPulse 3s ease-in-out infinite;
        }
        
        @keyframes mealPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); }
            50% { box-shadow: 0 0 0 4px rgba(39, 174, 96, 0.1); }
        }
        
        .calendar-day.has-meal:hover {
            animation: none;
        }
    `;
    document.head.appendChild(style);
});

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('SW registered'))
            .catch(() => console.log('SW registration failed'));
    });
}