# 📝 TaskFlow — Responsive Task Manager

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**TaskFlow** is a lightweight, responsive, single-page task management web application designed and built from scratch using **semantic HTML5**, modern **CSS3** (Flexbox, CSS Grid, CSS Variables), and vanilla **JavaScript (ES6)** without external dependencies or heavy frameworks.

This project was developed by **V Shree Kamalesh** during a Web Development Internship at **Vault of Codes** (Panimalar Engineering College, Affiliated to Anna University).

---

## 🚀 Live Demo & Deployment

- **Deployable Platform:** Vercel / GitHub Pages / Netlify
- **Zero Config Required:** Pure static files (`index.html`, `style.css`, `script.js`) that run instantly in any browser.

---

## ✨ Features

- **⚡ Full Task Lifecycle (CRUD):** Create, view, edit in-place, complete, and delete tasks seamlessly.
- **🎯 Priority Indicators:** Color-coded priority borders and badges:
  - 🔴 **High Priority:** Red indicator (`#ef4444`)
  - 🟠 **Medium Priority:** Orange/Amber indicator (`#f59e0b`)
  - 🟢 **Low Priority:** Green indicator (`#22a06b`)
- **⏰ Deadline Tracking & Overdue Highlighting:** Overdue tasks are automatically identified in the local timezone and highlighted in red with `- Overdue`.
- **📊 Real-time Statistics & Progress Bar:**
  - Instant counts for **Total**, **Pending**, **Completed**, and **Overdue** tasks.
  - Dynamic progress bar updating the exact completion percentage (`X% complete`).
- **🔍 Instant Live Search:** Filter tasks instantaneously as you type by matching titles or categories.
- **🏷️ Status Filtering & Sorting:**
  - Status filters: **All**, **Pending**, **Completed**.
  - Sort modes: **Newest first**, **Due date** (with date parsing & null fallback), and **Priority ranking**.
- **🌗 Dark / Light Mode:** Built-in theme toggle with CSS custom properties, automatically saved to `localStorage`.
- **💾 Client-Side Persistence:** Tasks and theme preference are saved in the browser using the `localStorage` API, with automatic fallback and pre-populated sample tasks on first launch.
- **🛡️ Security & Validation:** HTML input sanitization (`escapeHtml`) to prevent XSS attacks and input validation alerts for empty task submissions.
- **📱 Responsive Layout:** Perfectly optimized across mobile phones (360px+), tablets, and desktop displays with responsive Grid and Flexbox layouts.

---

## 📂 Project Structure

```text
INTERN-PROJECT/
├── index.html        # Semantic HTML5 page structure
├── style.css         # Modern CSS3 styling, themes, Grid, Flexbox & media queries
├── script.js         # JavaScript application logic, state, persistence & DOM updates
├── favicon.svg       # Application vector favicon
├── vercel.json       # Vercel deployment & security headers configuration
├── .gitignore        # Git ignore file for editor and OS temporary files
├── README.md         # Comprehensive project documentation
└── V_Shree_Kamalesh_Internship_Report_Revised.pdf # Internship report documentation
```

---

## 💻 How to Run Locally

You don't need Node.js or any build tools to run TaskFlow locally:

### Method 1: Direct Browser Launch
Simply double-click `index.html` or open it in any web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

### Method 2: Local Server (Optional)
If you have Node.js installed:
```bash
npx serve .
```
Or with Python:
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000` in your browser.

---

## 📤 Step-by-Step: Push to GitHub

To publish this project to your GitHub account:

1. **Open PowerShell or Terminal** in this project folder:
   ```powershell
   cd "C:\Users\Shree\Desktop\Shree Kamalesh\Stylish  Demon\INTERN-PROJECT"
   ```

2. **Initialize Git (if not already done):**
   ```bash
   git init
   ```

3. **Stage all files and make the initial commit:**
   ```bash
   git add .
   git commit -m "feat: complete TaskFlow responsive task manager web application"
   ```

4. **Create a new repository on GitHub:**
   - Go to [GitHub.com/new](https://github.com/new).
   - Enter Repository Name (e.g., `TaskFlow` or `taskflow-internship-project`).
   - Choose **Public**.
   - Do **NOT** initialize with a README, .gitignore, or license (we already created them).
   - Click **Create repository**.

5. **Link and push to your GitHub repository:**
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPOSITORY_NAME>.git
   git push -u origin main
   ```

---

## 🌐 Step-by-Step: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended & Easiest)

1. Go to [vercel.com](https://vercel.com) and log in (or sign up with your GitHub account).
2. Click **"Add New..."** → **"Project"**.
3. Under **"Import Git Repository"**, select the `TaskFlow` repository you just pushed to GitHub.
4. In the Project Configuration:
   - **Framework Preset:** Leave as `Other` (Vercel automatically detects static HTML/CSS/JS).
   - **Root Directory:** `./`
5. Click **"Deploy"**.
6. Within seconds, your project will be live with a free SSL-secured `https://<project-name>.vercel.app` URL!

### Method 2: Deploy via Vercel CLI

1. Run in terminal:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts:
   - Confirm your Vercel account login.
   - Set project directory: `./`
   - Link to existing project: `N`
   - Project name: `taskflow`
3. To deploy to production:
   ```bash
   npx vercel --prod
   ```

---

## 🧪 Functional Test Cases & Validation

All 15 test cases identified in the project report were tested and verified:

| TC | Test Case | Expected Result | Status |
|:--:|:---|:---|:---:|
| 1 | Add a task with a title | Task appears at the top of the list | ✅ Pass |
| 2 | Add a task with an empty title | Error toast notification shown, submission blocked | ✅ Pass |
| 3 | Mark task as completed | Title struck through, progress & stats updated | ✅ Pass |
| 4 | Edit an existing task | Form populated, task updated on save | ✅ Pass |
| 5 | Delete a task | Confirmation dialog shown, task removed | ✅ Pass |
| 6 | Task with past due date | Highlighted in red with Overdue badge | ✅ Pass |
| 7 | Filter by Pending / Completed | Only matching status tasks shown | ✅ Pass |
| 8 | Search by title or category | Live filter updates on each keystroke | ✅ Pass |
| 9 | Sort by date and priority | Tasks reordered correctly | ✅ Pass |
| 10 | Clear completed tasks | All completed tasks removed on confirmation | ✅ Pass |
| 11 | Refresh the page | Tasks persist via `localStorage` | ✅ Pass |
| 12 | Toggle dark mode and reload | Theme applied and remembered | ✅ Pass |
| 13 | Enter HTML tags in title | Escaped and displayed as safe text | ✅ Pass |
| 14 | Filter with no matching tasks | Clean empty-state message displayed | ✅ Pass |
| 15 | View on mobile (360px - 600px) | Responsive grid & stacked layout, no horizontal scroll | ✅ Pass |

---

## 🎓 Internship & Academic Details

- **Student Name:** V Shree Kamalesh (Register No: 211423244203)
- **Institution:** Panimalar Engineering College (Affiliated to Anna University)
- **Department:** Computer Science and Business Systems
- **Host Organization:** Vault of Codes (VaultofCodes.in)
- **Internship Domain:** Web Development
- **Mentor:** Dr. A. Anbarasa Pandian, M.E., Ph.D.
- **Head of Department:** Dr. D. Anuradha, M.E., PGDBA, Ph.D.
