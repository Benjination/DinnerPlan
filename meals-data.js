// Meal Plan Data - Auto-updated from meal plan files
const mealPlanData = {
    "lastUpdated": "2026-02-24",
    "dailyOptions": {
        "breakfast": [
            "Oatmeal with fresh berries",
            "Cereal with oat milk",
            "Toast with almond butter",
            "Fresh fruit"
        ],
        "lunch": [
            "Veggie sandwiches (hummus, lettuce, tomato, cucumber)",
            "Leftover dinner portions",
            "Salads with simple dressing",
            "Crackers with hummus"
        ],
        "snacks": [
            "Fresh fruit (apples, grapes, berries)",
            "Crackers",
            "Small handful of cashews",
            "Carrots with hummus"
        ]
    },
    "meals": {
        "2026-02": {
            "title": "February 2026 Meal Plan",
            "weeks": {
                "2026-02-23": {
                    "ingredients": [
                        {
                            "name": "Spaghetti noodles",
                            "onHand": true
                        },
                        {
                            "name": "marinara sauce",
                            "onHand": true
                        },
                        {
                            "name": "mixed vegetables",
                            "onHand": false
                        }
                    ],
                    "meal": "Spaghetti with marinara (low-sodium) and vegetables",
                    "emoji": "🛒",
                    "healthNote": "moderate protein, fresh vegetables"
                },
                "2026-02-24": {
                    "ingredients": [
                        {
                            "name": "Rice",
                            "onHand": true
                        },
                        {
                            "name": "stir-fry vegetable mix",
                            "onHand": false
                        },
                        {
                            "name": "soy sauce",
                            "onHand": true
                        },
                        {
                            "name": "sesame oil",
                            "onHand": true
                        }
                    ],
                    "meal": "Stir-fry vegetables with rice",
                    "emoji": "🍽️",
                    "healthNote": "fresh vegetables, controlled sodium"
                },
                "2026-02-25": {
                    "ingredients": [
                        {
                            "name": "Sweet potatoes",
                            "onHand": false
                        },
                        {
                            "name": "broccoli",
                            "onHand": false
                        },
                        {
                            "name": "asparagus",
                            "onHand": false
                        },
                        {
                            "name": "cauliflower",
                            "onHand": false
                        },
                        {
                            "name": "olive oil",
                            "onHand": true
                        }
                    ],
                    "meal": "Sheet-pan veggies with sweet potatoes",
                    "emoji": "🍽️",
                    "healthNote": "fresh vegetables, low sodium"
                },
                "2026-02-26": {
                    "ingredients": [
                        {
                            "name": "Vegetable broth",
                            "onHand": false
                        },
                        {
                            "name": "celery",
                            "onHand": false
                        },
                        {
                            "name": "carrots",
                            "onHand": false
                        },
                        {
                            "name": "potatoes",
                            "onHand": false
                        },
                        {
                            "name": "mushrooms",
                            "onHand": false
                        },
                        {
                            "name": "bread",
                            "onHand": false
                        }
                    ],
                    "meal": "Vegetable soup (low-sodium broth) with bread",
                    "emoji": "🍽️",
                    "healthNote": "fresh vegetables, controlled sodium"
                },
                "2026-02-27": {
                    "ingredients": [
                        {
                            "name": "Black beans",
                            "onHand": false
                        },
                        {
                            "name": "rice",
                            "onHand": true
                        },
                        {
                            "name": "mushrooms",
                            "onHand": false
                        },
                        {
                            "name": "garlic",
                            "onHand": false
                        },
                        {
                            "name": "onion",
                            "onHand": false
                        }
                    ],
                    "meal": "Black beans and rice with mushrooms",
                    "emoji": "🍽️",
                    "healthNote": "plant protein, fresh vegetables, moderate portions"
                },
                "2026-02-28": {
                    "ingredients": [
                        {
                            "name": "Asparagus",
                            "onHand": false
                        },
                        {
                            "name": "rice",
                            "onHand": true
                        },
                        {
                            "name": "soy sauce",
                            "onHand": true
                        }
                    ],
                    "meal": "Asparagus and rice with light soy sauce",
                    "emoji": "🍽️",
                    "healthNote": "nutritious vegetables and whole grains"
                }
            }
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