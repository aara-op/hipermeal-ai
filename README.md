# 🍽️ HiperMeal AI — Autonomous Multimodal Meal Vision & Clinical Nutrition Engine
### Segmenting Complex Plates, Estimating Portions & Grounding Macros with 4.8M+ Open Food Facts & 1-Lakh Culinary Knowledge Base

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![WebGL1](https://img.shields.io/badge/WebGL1-Plasma_Shader_60FPS-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://get.webgl.org/)
[![NVIDIA NIM](https://img.shields.io/badge/NVIDIA_NIM-Llama_3.2_Vision-76B900?style=for-the-badge&logo=nvidia&logoColor=white)](https://build.nvidia.com/)
[![Open Food Facts](https://img.shields.io/badge/Open_Food_Facts-4.8M+_Items-F49D37?style=for-the-badge&logo=openfoodfacts&logoColor=white)](https://world.openfoodfacts.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

---

## 📌 Problem Overview
Traditional dietary tracking has an **85% drop-off rate** within the first 14 days because manual logging (typing item names, guessing portion weights in grams) creates extreme friction.

Furthermore, traditional single-label computer vision classifiers (such as Food-101 / standard CNNs) fail on **complex, mixed plates**. When presented with a daily meal—such as an Indian Thali containing **Whole Wheat Roti**, **Homestyle Sabji**, and **Yellow Dal Tadka**, or breakfast combos like **Indori Poha** and **Saffron Jalebi**—conventional models can only guess a single label or hallucinate incorrect numbers.

### The HiperMeal AI Solution:
1. **Autonomous Multimodal Meal Vision (VLM):** Simultaneously segments all distinct dishes on a plate and estimates realistic portion weights in grams.
2. **Clinical Nutrition Grounding:** Directly verifies every detected food against the **Open Food Facts API (4.8M+ items)** and our **Verified 7-Continent Culinary Database (100,000+ / 1 Lakh items)** to eliminate AI hallucination.
3. **Actionable Metabolic Indicators:** Instant **Nutri-Score (A to E)**, **NOVA Food Processing Group (1 to 4)**, **Glycemic Index (Low/Medium/High)**, and **Smart Dietitian Clinical Swaps**.
4. **Human-in-the-Loop (HITL) UX:** One-tap portion scaling (`0.5x`, `1x`, `1.5x`), natural language adjustments (*"added 1 tsp ghee"*), and real-time live macro recalculation.
5. **Interactive WebGL Plasma Shader:** GPU-accelerated pattern shader running smoothly at 60 FPS capped at 2 DPR for maximum performance.

---

## 🍛 Featured 1-Lakh Food Catalog Staples
HiperMeal AI provides high-fidelity grounding for continental cuisines worldwide, specifically prioritizing authentic regional staples:

| Dish | Components & Classification | Calories & Macros (per 100g) | Nutri-Score & NOVA | Clinical Swap & Glycemic Index |
| :--- | :--- | :--- | :--- | :--- |
| **🫓 Roti** | Whole Wheat Phulka / Chapati | **260 kcal** · P: 9.4g · C: 52.0g · F: 2.8g · Fib: 8.5g | **Nutri-Score A** · NOVA 1 | **GI 54 (Medium)**: Add 20% besan/sattu for +4g protein. |
| **🍛 Sabji** | Homestyle Aloo Gobi & Mixed Seasonal Veggies | **95 kcal** · P: 2.8g · C: 11.2g · F: 4.5g · Fib: 3.2g | **Nutri-Score A** · NOVA 1 | **GI 42 (Low)**: Cooked with mustard oil & turmeric; high in antioxidants. |
| **🥣 Poha** | Indori Kanda Batata Poha with Peanuts | **160 kcal** · P: 3.5g · C: 28.0g · F: 4.2g · Fib: 2.1g | **Nutri-Score A** · NOVA 2 | **GI 52 (Medium)**: Fresh lemon juice triples non-heme iron absorption. |
| **🥨 Jalebi** | Crispy Golden Saffron & Cardamom Spirals | **380 kcal** · P: 2.2g · C: 68.5g · F: 11.8g · Fib: 0.5g | **Nutri-Score E** · NOVA 3 | **GI 78 (High)**: Pair with unsweetened warm milk or Greek yogurt. |
| **🥟 Samosa** | Crispy Potato & Pea Samosa with Mint Chutney | **262 kcal** · P: 4.5g · C: 32.0g · F: 13.5g · Fib: 2.8g | **Nutri-Score D** · NOVA 3 | **GI 71 (High)**: Air-fry at 200°C to eliminate 60% of deep-frying oil. |
| **🥮 Kachori** | Crispy Khasta Pyaaz / Moong Dal Kachori | **340 kcal** · P: 6.2g · C: 38.0g · F: 18.5g · Fib: 3.4g | **Nutri-Score D** · NOVA 3 | **GI 68 (High)**: Flaky ajwain crust pastry with spiced moong dal. |

---

## 🏗️ System Architecture

```
  ┌─────────────────────────────────────────────────────────────┐
  │       CLIENT VIEWPORT: React 19 + Tailwind + WebGL1         │
  │  (Camera Snap, File Upload, 1-Tap Desi Bar, Portion Sliders)│
  └──────────────────────────────┬──────────────────────────────┘
                                 │ HTTP / JSON
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │              FASTAPI MICROSERVICE (Port 8005)               │
  │                                                             │
  │   ├── Tier 1: Cloud VLM (NVIDIA NIM Llama-3.2-11B-Vision)   │
  │   ├── Tier 2: Edge VLM (Local Ollama Moondream / Gemma)     │
  │   └── Tier 3: Zero-Latency Lexical & Spectral Analyzer      │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                                 ▼
  ┌─────────────────────────────────────────────────────────────┐
  │             CLINICAL GROUNDING & METABOLIC ENGINE           │
  │   ├── Open Food Facts API (4.8M+ Global Barcode Database)   │
  │   └── World Culinary DB (100k+ Authentic Regional Dishes)   │
  └─────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start & Local Execution

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **Python**: 3.10+ with `pip`

### 2. Frontend Setup
```bash
# Clone the repository
git clone https://github.com/aara-op/hipermeal-ai.git
cd hipermeal-ai

# Install dependencies
npm install

# Start Vite development server
npm run dev
# Live at http://localhost:5173
```

### 3. VLM & Nutrition Microservice (Port 8005)
```bash
# Install Python dependencies
pip install fastapi uvicorn httpx pillow pydantic

# Run the microservice
python meal_vlm_server.py
# Online at http://localhost:8005
# Interactive Swagger Docs at http://localhost:8005/docs
```

### 4. CLI Model Inference Tool
You can test meal decomposition directly from your terminal:
```bash
# Run self-contained verification benchmark
python generate_food_model.py --test

# Analyze any local image or web URL
python generate_food_model.py --image "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600"
```

---

## 🚀 Cloud Deployment Options

### Option 1: Vercel (Frontend 1-Click Deploy)
1. Fork or push this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select this repository and click **Deploy**. Vercel will automatically build the React Vite bundle and provision an SSL domain (`*.vercel.app`).

### Option 2: Docker / DigitalOcean App Platform / Render (Full-Stack)
This repository includes a multi-stage production `Dockerfile` and `.do/app.yaml`:
```bash
# Build the production container
docker build -t hipermeal-ai:latest .

# Run locally on Port 80
docker run -p 80:80 hipermeal-ai:latest
```

---

## 📄 License
MIT License. Open for hackathons, clinical research, and commercial dietary applications.
