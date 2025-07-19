# Xcelerate - Smart Excel AI Assistant

## ☀️ Project Overview

**Xcelerate** is a full-stack project I built to explore how generative AI can simplify Excel workflows using natural language. It enables users to upload .xlsx or .xls files and issue commands in plain English to extract, transform, or manipulate data using AI. that brings the power of natural language AI to Excel file processing. It enables users to upload .xlsx or .xls files and issue commands in plain English to extract, transform, or manipulate data using AI.

This project bridges the gap between manual spreadsheet operations and modern AI workflows, making Excel data processing faster, more intuitive, and more intelligent.


## ☀️ Features

- **Excel File Upload**  
  Upload `.xlsx` or `.xls` files directly through the interface.

- **Natural Language Commands**  
  Use simple English instructions to manipulate or extract data (e.g., “Extract unique company names in column C and E”).

- **AI-Powered Data Processing (via Gemini API)**  
  Supports advanced operations such as:
  - Extracting filtered lists
  - Performing calculations or summaries
  - Rewriting cell content
  - Mapping between columns

- **Flexible Output Options**  
  Users can choose how the results are returned:
  - Add results to a **new sheet** in the original file
  - Generate a **new Excel file** with only the processed data
  - Append results as a **new column** in the original sheet

- **Dynamic Column Detection**  
  Automatically lists detected column names from the Excel sheet to help users write accurate AI prompts.

- **Responsive Web Interface**  
  Clean and interactive UI built with Tailwind CSS and vanilla JavaScript. Works across devices and screen sizes.

- **Theme Toggle (Dark / Pale Yellow)**  
  Switch between light and dark themes with saved preferences for a personalized experience.


## ☀️ Technologies Used

### Backend (Python + Flask)

- **Python 3** — Core programming language
- **Flask** — Lightweight web framework for serving the API
- **Pandas** — For reading, processing, and transforming Excel data
- **Openpyxl** — Excel engine used with Pandas for `.xlsx` file manipulation
- **Google Generative AI (Gemini API)** — Handles natural language understanding and AI-powered data transformation
- **python-dotenv** — Loads environment variables like API keys from `.env` files
- **Flask-CORS** — Enables CORS to support frontend-backend communication in development

### Frontend (HTML + CSS + JavaScript)

- **HTML5** — Structure of the web application
- **CSS3** — Styling and layout
- **JavaScript (ES6+)** — Handles frontend logic and user interactions
- **Tailwind CSS** — Utility-first CSS framework for clean and responsive UI
- **Font Awesome** — For intuitive iconography (upload, moon/sun toggle, etc.)


## ☀️ Folder Structure 
```bash
smart-excel-ai/
├── backend/
│   ├── app.py
│   ├── uploads/
│   ├── downloads/
│   └── .env
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── styles.css (if needed)
└── README.md

```

 🛠 **Maintained by Yulo L.**

✨ Building full-stack tools that blend natural language AI with real-world use cases like Excel 
