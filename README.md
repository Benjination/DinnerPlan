# Family Meal Planner Web App 🍽️

A mobile-friendly web application for displaying family meal plans with an interactive calendar interface.

## Features ✨

- **📅 Interactive Calendar**: View meals by date with a clean, mobile-first design
- **� Shopping Lists**: Click Sundays for weekly shopping lists organized by category- **📦 Pantry Inventory**: View current on-hand items to check what you're running low on- **�📱 Mobile Responsive**: Optimized for smartphones and tablets
- **🥗 Meal Details**: Click any day to see ingredients and health notes
- **💚 Health-Focused**: Displays healthy meal information
- **🔄 Auto-Updates**: Data syncs when meal plan files are updated
- **⚡ Fast Loading**: Lightweight and optimized for quick access

## How It Works 🔧

The app reads meal data from your meal plan text files and displays them in an interactive calendar format. Family members can:

1. View the monthly calendar with meal titles
2. Click on any meal day to see detailed ingredients
3. **Click on Sundays to see the weekly shopping list** 🛒
4. **Click "View Pantry" to check on-hand inventory** 📦
5. Check which ingredients are already on-hand (marked with ✓)
6. View daily breakfast, lunch, and snack options

## File Structure 📁

```
/
├── index.html          # Main app page
├── styles.css          # Mobile-first responsive styling  
├── script.js           # Calendar functionality
├── meals-data.js       # Meal plan data structure
├── sw.js              # Service worker for offline access
└── README.md          # This file
```

## Deployment 🚀

### GitHub Pages Setup

1. **Create a GitHub Repository**:
   - Go to GitHub and create a new repository
   - Name it something like `family-meal-planner`
   - Make it public (required for GitHub Pages)

2. **Upload Files**:
   ```bash
   git init
   git add .
   git commit -m "Initial meal planner setup"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/family-meal-planner.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)"
   - Click Save

4. **Access Your App**:
   - Your app will be available at: `https://YOUR-USERNAME.github.io/family-meal-planner`
   - Share this link with your family!

## Updating Meals 📝

### Method 1: Manual Update
1. Edit the `meals-data.js` file directly
2. Update the meal plan data structure
3. Commit and push changes to GitHub
4. Changes will be live within minutes

### Method 2: Automated Update (Future Enhancement)
- Set up a GitHub Action to parse your meal plan text files
- Automatically regenerate `meals-data.js` when files change
- Completely hands-off updates

## Customization 🎨

### Adding New Months
Edit `meals-data.js` and add new month entries:

```javascript
"2026-03": {
    title: "March 2026 Meal Plan",
    weeks: {
        "2026-03-01": {
            meal: "Your meal name",
            emoji: "🍝",
            ingredients: [...]
        }
    }
}
```

### Changing Colors/Styling
Edit `styles.css` to customize:
- Color scheme (CSS custom properties at top)
- Layout spacing
- Typography
- Mobile breakpoints

### Adding Features
The app is built with vanilla JavaScript for easy modification:
- Add meal categories
- Include cooking times
- Add shopping list integration
- Include recipe instructions

## Mobile Usage 📱

The app is designed for mobile use:
- **Home Screen**: Add to home screen for app-like experience
- **Offline Access**: Service worker caches content
- **Touch Friendly**: Large tap targets and smooth animations
- **Fast Loading**: Optimized for slower connections

## Browser Support 🌐

- ✅ Chrome/Safari (mobile & desktop)
- ✅ Firefox
- ✅ Edge
- ✅ iOS Safari
- ✅ Android Chrome

## Privacy & Data 🔒

- **No Tracking**: No analytics or external requests
- **Local Storage**: App works entirely offline
- **No Account Required**: Just visit the URL
- **Family Friendly**: Safe for all ages

## Troubleshooting 🔧

### App Not Loading
- Check GitHub Pages is enabled
- Verify all files are committed and pushed
- Wait 5-10 minutes for deployment

### Meals Not Showing  
- Check `meals-data.js` for syntax errors
- Verify date format: `YYYY-MM-DD`
- Ensure month key exists in meals object

### Mobile Issues
- Clear browser cache
- Try landscape/portrait orientation
- Check internet connection for initial load

## Future Enhancements 🔮

- [ ] Automatic meal plan file parsing
- [ ] Shopping list generation
- [ ] Recipe instructions
- [ ] Meal prep reminders
- [ ] Nutrition information
- [ ] Family preferences tracking

---

Built with ❤️ for healthy family meals!