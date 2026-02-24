# Data Files Structure

The meal planner app now uses separate JSON files for different types of data:

## 📋 meals-data.js
- Contains meal schedules and ingredients for each day
- Auto-generated from your meal plan text files
- Handles calendar display and meal details

## 🛒 shopping-lists.json  
- Weekly shopping lists organized by date
- Categorized by: Fresh Vegetables, Fresh Fruits, Bread & Grains, Other Fresh Items, Pantry Items
- Updated manually or through automation

## 📦 pantry-inventory.json
- Current on-hand pantry status
- Organized by categories: Grains & Noodles, Canned/Jarred, Condiments & Sauces, etc.
- Shows what you "have" vs what you "need"
- Based on your on-hand.txt markings

## 🔄 Auto-Updates
The GitHub Action automatically:
- Updates meals-data.js when you change meal plan files
- TODO: Auto-generate shopping-lists.json and pantry-inventory.json

## 📱 How It Works
1. Calendar loads meals from meals-data.js
2. Sunday click loads data from shopping-lists.json 
3. Pantry button loads data from pantry-inventory.json
4. All data loads asynchronously for fast performance