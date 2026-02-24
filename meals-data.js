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
            title: "February 2026 Meal Plan (Healthy Vegan)",
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
                    healthNote: "nutritious vegetables and whole grains"
                }
            }
        }
        // Add more months as needed: "2026-03": { ... }, etc.
    },

    // On-hand pantry inventory
    onHandInventory: {
        "grains_noodles": {
            title: "Grains & Noodles",
            items: [
                { name: "Rice", status: "have" },
                { name: "Spaghetti noodles", status: "have" },
                { name: "Lo mein noodles", status: "have" },
                { name: "Ramen noodles", status: "have" },
                { name: "Penne pasta", status: "need" },
                { name: "Rigatoni pasta", status: "need" }
            ]
        },
        "canned_jarred": {
            title: "Canned/Jarred",
            items: [
                { name: "Refried beans", status: "need", quantity: "2" },
                { name: "Black beans", status: "need", quantity: "3" },
                { name: "Chickpeas", status: "need" },
                { name: "Vegetable broth", status: "need", quantity: "2" },
                { name: "Better than bouillon", status: "need" },
                { name: "Marinara sauce", status: "have" },
                { name: "Tomato sauce", status: "need", quantity: "2" },
                { name: "Alfredo sauce", status: "need" },
                { name: "Salsa", status: "need" }
            ]
        },
        "condiments_sauces": {
            title: "Condiments & Sauces",
            items: [
                { name: "Soy sauce", status: "have" },
                { name: "Italian dressing", status: "have" },
                { name: "Vegan mayo", status: "have" },
                { name: "Sesame oil", status: "have" },
                { name: "Olive oil", status: "have" },
                { name: "Liquid smoke", status: "need" }
            ]
        },
        "spices_seasonings": {
            title: "Spices & Seasonings", 
            items: [
                { name: "Garlic", status: "need" },
                { name: "Onion", status: "need", quantity: "1" },
                { name: "Italian seasoning", status: "need" },
                { name: "Taco seasoning", status: "need" },
                { name: "Ginger", status: "need" },
                { name: "Turmeric", status: "have" },
                { name: "Cumin", status: "have" },
                { name: "Paprika", status: "have" },
                { name: "Salt and pepper", status: "have" },
                { name: "Garlic powder", status: "need" }
            ]
        },
        "pantry_staples": {
            title: "Pantry Staples",
            items: [
                { name: "Nutritional yeast", status: "have" },
                { name: "Tahini", status: "need" },
                { name: "White miso paste", status: "have" },
                { name: "Lemon juice", status: "have" },
                { name: "Vanilla extract", status: "have" },
                { name: "Maple syrup", status: "have" },
                { name: "Wasabi", status: "have" },
                { name: "Pancake mix", status: "have" }
            ]
        },
        "frozen_items": {
            title: "Frozen Items",
            items: [
                { name: "Fake meat crumbles", status: "need" },
                { name: "Impossible burgers", status: "have" },
                { name: "Frozen fruit", status: "need" }
            ]
        },
        "dry_shelf_stable": {
            title: "Dry/Shelf-stable",
            items: [
                { name: "Tortillas", status: "need" },
                { name: "Taco shells", status: "need" },
                { name: "Seaweed wraps", status: "have" },
                { name: "Wooden skewers", status: "need" },
                { name: "Bacon bits", status: "have" },
                { name: "Croutons", status: "need" }
            ]
        }
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

// Helper function to get shopping list for a specific date (Sunday shopping days)
function getShoppingListForDate(dateString) {
    if (mealPlanData.currentShoppingList[dateString]) {
        return mealPlanData.currentShoppingList[dateString];
    }
    return null;
}

// Helper function to get on-hand inventory
function getOnHandInventory() {
    return mealPlanData.onHandInventory;
}