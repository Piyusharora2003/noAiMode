# 🛡️ No-AI Mode – Human-Content Search Web App

## 📘 Overview

**No-AI Mode** is a web application that enhances user search experiences by filtering or labeling AI-generated content. Instead of traditional search results, it delivers links enriched with confidence scores estimating the likelihood of the content being human-written.

This project is focused on learning system design, service communication, scraping, and basic AI-content detection.

---

## 🧱 System Components

### 1. 🎯 Frontend Application (`f`)

- **Technology**: Angular / React
- **Role**: User interface for entering search queries and viewing enriched results.
- **Responsibility**: Sends query requests to the Backend Application and displays results with AI confidence labels.

### 2. 🧩 Backend Application (`b`)

- **Technology**: Node.js or FastAPI
- **Role**: Entry point API for the frontend. It does **not orchestrate the services**, but forwards requests.
- **Responsibility**:
  - Receives query from frontend
  - Forwards it to Service X
  - Returns processed response back to frontend

### 3. 🔧 Service X (Query Handler)

- **Technology**: Node.js / Python
- **Role**: Core processing unit of the system
- **Responsibility**:
  - Accepts the raw query
  - Uses the Scraper to get seed URLs based on the search
  - Sends the scraped URLs to the AI Content Detection Service
  - Aggregates results with confidence scores and sends back to Backend

### 4. 🕷 Scraper Service

- **Technology**: Puppeteer / BeautifulSoup / Playwright
- **Role**: Gathers actual URLs from search engines or custom sources
- **Responsibility**: Returns a list of real-world links for a given query or seed keyword

### 5. 🧠 AI Content Detection Service

- **Technology**: Python + model APIs (e.g., GPTZero, Originality.ai, or open-source classifiers)
- **Role**: Evaluates content for likelihood of AI authorship
- **Output**:
  ```json
  {
    "url": "https://example.com",
    "confidence": 0.18 // 18% chance it's AI-generated
  }
  ```
