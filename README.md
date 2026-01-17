## StockNews – Stock Company Sentiment Analysis 💹📰

The StockNews Dashboard is an AI-powered web application designed to assist investors and traders in analyzing financial news sentiment across 3000+ NSE-listed companies.

---

## Tech Stack ⚙️

* FastAPI with Uvicorn backend (Python 3.11)
* Local FinBERT inference using PyTorch and Hugging Face Transformers
* Next.js 15 frontend with Tailwind CSS
* SQLite for stock master data and news caching

---

## Repository Layout 📁

```
stock-sentiment-dashboard/
├── backend/
│   ├── app/                 # FastAPI application and sentiment pipeline
│   ├── config/              # Runtime configuration stubs
│   ├── data/                # SQLite databases, NSE master CSV, cached news
│   ├── finbert_training/    # Utilities for fine-tuning and evaluation
│   └── requirements.txt
├── frontend/                # Next.js client (App Router)
├── docs/                    # Design notes and planning documents
└── README.md
```

---

## Prerequisites 📌

* Python **3.11** (recommended)
* `pip` version 23 or higher (Poetry or Pipenv may also be used)
* Node.js **18.18+** (compatible with Next.js 15; newer LTS versions also work)
* A JavaScript package manager (`pnpm` recommended, `npm` or `yarn` supported)

---

## Initial Setup 🛠️

## Backend Setup (FastAPI + FinBERT)

1. **Create and activate a virtual environment**

   ```bash
   python -m venv .venv
   source .venv/bin/activate       # macOS / Linux
   # .venv\Scripts\activate        # Windows PowerShell
   ```

2. **Install Python dependencies**

   ```bash
   pip install --upgrade pip
   pip install -r backend/requirements.txt
   ```

3. **Configure environment variables**

   Create a `.env` file in the repository root:

   ```bash
   GEMINI_API_KEY=your_google_gemini_key
   HUGGINGFACE_TOKEN=your_optional_hf_token
   ```

   * `GEMINI_API_KEY` is required for the LLM-based web search fallback.
   * `HUGGINGFACE_TOKEN` is optional and only needed for private models or Hub access.

4. **Initialize the NSE stock database (first-time setup)**

   ```bash
   cd backend
   python -m app.services.db_setup
   cd ..
   ```

   This step reads the NSE master CSV file and generates the local stock database.

5. **Start the FastAPI server**

   ```bash
   cd backend
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

6. **Optional: Run the sentiment pipeline as a CLI check**

   ```bash
   cd backend
   python -m app.core.pipeline
   ```

   The first run may take several minutes as model weights are downloaded.

---

## Frontend Setup (Next.js Dashboard) 📊

1. **Install dependencies**

   ```bash
   cd frontend
   pnpm install
   ```

2. **Optional environment configuration**

   If a non-default backend is required, create a local environment file and define the API base URL. Update the frontend fetch helpers accordingly.

3. **Start the development server**

   ```bash
   pnpm dev
   ```

   The frontend runs in development mode and communicates with the backend API.

---

## FinBERT Fine-Tuning and Evaluation Suite 📎

The fine-tuning and evaluation utilities are located in `backend/finbert_training/`.

```bash
cd backend/finbert_training

# Generate synthetic training and validation data
python dataset_preparation.py --out_dir data --synth_per_class 800 --seed 42

# Fine-tune FinBERT
python model_finetune.py \
  --train_csv data/synthetic_train.csv \
  --val_csv data/synthetic_val.csv \
  --output_dir models/finetuned_finbert \
  --epochs 3 --batch_size 16 --lr 2e-5 --fp16 false

# Evaluate against a labelled test dataset
python evaluation.py \
  --test_csv data/real_test.csv \
  --model_dir models/finetuned_finbert \
  --baseline_model yiyanghkust/finbert-tone \
  --report_path reports/metrics.json
```

To use a fine-tuned model in the API, update the model path in `backend/app/core/finbert_client.py`.

---

## Data and Storage Notes 📝

* The NSE master CSV should be updated periodically and followed by re-running the database setup.
* The generated stock database is intended as derived data and should only be committed if used as seed data.
* The news cache database grows over time; deleting it will force fresh news collection.

---

### 📌 Copyright

© 2025 Stock Sentiment Dashboard. All rights reserved.
