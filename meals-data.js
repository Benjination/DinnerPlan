// Meal Plan Data - Auto-updated from meal plan files
const mealPlanData = {
    lastUpdated: "2026-02-23",
    
    // Daily options that remain constant
    dailyOptions: {
        breakfast: [
            "Oatmeal with fresh berries",
            "Cereal with oat milk",
            "Toast with almond butter",
            "Fresh fruit"
        ],
        lunch: [
            "Veggie sandwiches (hummus, lettuce, tomato, cucumber)",
            "Leftover dinner portions",
            "Salads with simple dressing",
            "Crackers with hummus"
        ],
        snacks: [
            "Fresh fruit (apples, grapes, berries)",
            "Crackers",
            "Small handful of cashews",
            "Carrots with hummus"
        ]
    },

    // Monthly meal plans
    meals: {
        "2026-02": {
            title: "February 2026 Meal Plan (Kidney-Friendly Vegan)",
            weeks: {
                // Week 4 (Feb 23-28)
                "2026-02-23": {
                    meal: "Spaghetti with marinara (low-sodium) and vegetables",
                    emoji: "🛒",
                    note: "Shopping Day",
                    ingredients: [
                        { name: "Spaghetti noodles", onHand: true },
                        { name: "marinara sauce", onHand: true },
                        { name: "mixed vegetables", onHand: false }
                    ],
                    healthNote: "moderate protein, fresh vegetables"
                },
                "2026-02-24": {
                    meal: "Stir-fry vegetables with rice",
                    emoji: "🍽️",
                    ingredients: [
                        { name: "Rice", onHand: true },
                        { name: "stir-fry vegetable mix", onHand: false },
                        { name: "soy sauce", onHand: true },
                        { name: "sesame oil", onHand: true }
                    ],
                    healthNote: "fresh vegetables, controlled sodium"
                },
                "2026-02-25": {
                    meal: "Sheet-pan veggies with sweet potatoes",
                    emoji: "🍽️",
                    ingredients: [
                        { name: "Sweet potatoes", onHand: false },
                        { name: "broccoli", onHand: false },
                        { name: "asparagus", onHand: false },
                        { name: "cauliflower", onHand: false },
                        { name: "olive oil", onHand: true }
                    ],
                    healthNote: "fresh vegetables, low sodium"
                },
                "2026-02-26": {
                    meal: "Vegetable soup (low-sodium broth) with bread",
                    emoji: "🍽️",
                    ingredients: [
                        { name: "Vegetable broth", onHand: false },
                        { name: "celery", onHand: false },
                        { name: "carrots", onHand: false },
                        { name: "potatoes", onHand: false },
                        { name: "mushrooms", onHand: false },
                        { name: "bread", onHand: false }
                    ],
                    healthNote: "fresh vegetables, controlled sodium"
                },
                "2026-02-27": {
                    meal: "Black beans and rice with mushrooms",
                    emoji: "🍽️",
                    ingredients: [
                        { name: "Black beans", onHand: false },
                        { name: "rice", onHand: true },
                        { name: "mushrooms", onHand: false },
                        { name: "garlic", onHand: false },
                        { name: "onion", onHand: false }
                    ],
                    healthNote: "plant protein, fresh vegetables, moderate portions"
                },
                "2026-02-28": {
                    meal: "Asparagus and rice with light soy sauce",
                    emoji: "🍽️",
                    ingredients: [
                        { name: "Asparagus", onHand: false },
                        { name: "rice", onHand: true },
                        { name: "soy sauce", onHand: true }
                    ],
                    healthNote: "asparagus is great for kidneys"
                }
            }
        }
        // Add more months as needed: "2026-03": { ... }, etc.
    },

    // Shopping list for current week
    currentShoppingList: {
        "2026-02-23": {
            freshVegetables: [
                "Stir-fry vegetable mix",
                "Sweet potatoes",
                "Asparagus",
                "Celery, carrots (for soup)",
                "Lettuce, tomatoes, cucumber (for sandwiches/salads)",
                "Mushrooms",
                "Potatoes (for soup)",
                "Broccoli, cauliflower (for sheet-pan)"
            ],
            freshFruits: [
                "Apples",
                "Grapes",
                "Berries (blueberries, strawberries)"
            ],
            breadGrains: [
                "Whole grain bread"
            ],
            otherFresh: [
                "Oat milk",
                "Hummus",
                "Low-sodium vegetable broth",
                "Low-sodium marinara sauce"
            ],
            pantryItems: [
                "Garlic",
                "Onion (1)",
                "Ginger",
                "Italian seasoning",
                "Better than bouillion",
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
    }
};

// Helper function to get meal for a specific date
function getMealForDate(dateString) {
    const [year, month] = dateString.split('-');
    const monthKey = `${year}-${month}`;
    
    if (mealPlanData.meals[monthKey] && mealPlanData.meals[monthKey].weeks[dateString]) {
        return mealPlanData.meals[monthKey].weeks[dateString];
    }
    return null;
}

// Helper function to check if date has a meal planned
function hasMP(dateString) {
    return getMealForDate(dateString) !== null;
}