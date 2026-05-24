# 🚀 Deploying to GitHub Pages (Free)

Your portfolio will be live at: **https://tsenthil5.github.io**

---

## Step 1 — Login to GitHub CLI

In your terminal, run:
```bash
gh auth login
```
- Choose: **GitHub.com**
- Choose: **HTTPS**
- Choose: **Login with a web browser**
- Copy the code and paste it in your browser

---

## Step 2 — Create the GitHub Pages repo & push

Run these commands one by one:

```bash
cd "/Users/senthilt/Desktop/Portfolio Website/portfolio"

# Create the special GitHub Pages repo
gh repo create tsenthil5.github.io --public --source=. --remote=origin --push

# Rename branch to main (required for GitHub Pages)
git branch -m master main
git push -u origin main --force
```

---

## Step 3 — Enable GitHub Pages

1. Go to https://github.com/tsenthil5/tsenthil5.github.io
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, choose: **Deploy from a branch**
4. Branch: **main** / folder: **/ (root)**
5. Click **Save**

⏱️ Wait ~60 seconds, then visit: **https://tsenthil5.github.io**

---

## Updating the site later

```bash
cd "/Users/senthilt/Desktop/Portfolio Website/portfolio"
git add .
git commit -m "Update portfolio"
git push
```
Changes go live within 1-2 minutes.

---

## ✅ Your LinkedIn URL
Update your LinkedIn URL in index.html if needed.
Search for: `linkedin.com/in/senthil-thanneermalai/` and replace with your exact URL.
