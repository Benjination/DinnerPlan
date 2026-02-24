# Quick Setup Guide 🚀

## Step 1: Test Locally
1. Open `index.html` in your browser
2. Check that the calendar shows your meals
3. Click on meal days to test the detail popup

## Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `family-meal-planner` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

## Step 3: Upload Files
```bash
# In your Meal Plan directory
git init
git add .
git commit -m "Add family meal planner web app"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/family-meal-planner.git
git push -u origin main
```

## Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll to "Pages" section in sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)"
6. Click "Save"

## Step 5: Share with Family
Your app will be live at:
`https://YOUR-USERNAME.github.io/family-meal-planner`

## Step 6: Future Updates
- Edit your meal plan files as usual
- Push changes to GitHub
- The GitHub Action will automatically update the web app!

## Mobile Installation
Family members can "Add to Home Screen" on their phones for app-like experience:
- **iPhone**: Safari -> Share -> Add to Home Screen
- **Android**: Chrome -> Menu -> Add to Home Screen

---

## Troubleshooting

**Q: App not loading?**
A: Wait 5-10 minutes after enabling GitHub Pages

**Q: Meals not showing?**
A: Check that your file format matches the expected structure

**Q: Want to update manually?**
A: Edit `meals-data.js` directly and push changes

---

That's it! Your family now has a mobile-friendly meal planner! 🎉