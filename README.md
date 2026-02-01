# SHAE - AI Mental Health Resiliance App!
<img 
  src="https://github.com/vyom13/SHAE_AIBOOMI/blob/main/GIF/SHEA_onboarding.gif" 
  width="500"
/>
 <\n>
 <img 
  src="https://github.com/vyom13/SHAE_AIBOOMI/blob/main/GIF/square_breathing.gif" 
  width="500"
/>
<\n>
 <img 
  src="https://github.com/vyom13/SHAE_AIBOOMI/blob/main/GIF/burn_journal.gif" 
  width="500"
/>


SHAE is a privacy-focused mental health chatbot with sophisticated multi-agent orchestration, designed with cultural sensitivity for Indian contexts.

## Features

- **Multi-Agent Architecture**: 3-agent pipeline (Social → State → Coaching)
- **Local LLM Support**: Runs entirely on your machine using Ollama (llama3.1:8b)
- **Micro-Actions**: Integrated grounding exercises (Square Breathing, Burn Journaling, 2-Minute Rule)
- **Memory Management**: Intelligent conversation summarization for long sessions
- **Cultural Sensitivity**: Built-in awareness of Indian family dynamics and social context
- **Privacy-First**: All data stays on your machine, no cloud dependencies required

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)

### Backend
- FastAPI (Python web framework)
- SQLite (session storage)
- Ollama (local LLM inference)
- Pydantic (data validation)

## Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.10+
- **Ollama** installed and running (https://ollama.ai)
  - Download the llama3.1:8b model: `ollama pull llama3.1:8b`

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/vyom13/SHAE_AIBOOMI.git
cd SHAE_AIBOOMI
```

### 2. Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 3. Backend Setup

```bash
cd SHAE_LLM

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env

# Start backend server
uvicorn app.main:app --reload
```

The backend will be available at `http://127.0.0.1:8000`

### 4. Ollama Setup

```bash
# Make sure Ollama is running
ollama serve

# Pull the required model
ollama pull llama3.1:8b
```

## Configuration

Edit `SHAE_LLM/.env` to configure the backend:

```bash
# Use local Ollama (recommended)
BACKEND=ollama
OLLAMA_BASE_URL=http://localhost:11434/v1
OLLAMA_MODEL=llama3.1:8b

# LLM Parameters
MAX_NEW_TOKENS=512
TEMPERATURE=0.3
TOP_P=0.9
```
