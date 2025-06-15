# Smart Excel AI Assistant

## Project Overview

**Smart Excel AI Assistant** is a web-based application that brings natural language AI capabilities to Excel file processing. Users can upload `.xlsx` or `.xls` files, enter intuitive commands in natural language, and receive transformed or extracted data based on those instructions. The goal is to simplify complex Excel tasks by leveraging AI for intelligent data extraction, transformation, and automation.

This project bridges the gap between traditional spreadsheet manipulation and modern AI-powered workflows—making data processing more efficient and user-friendly.


## Features

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


## Technologies Used

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


## Folder Structure (Suggested)

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
