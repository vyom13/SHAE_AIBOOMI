# SHAE - AI Mental Health Companion

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

## Architecture

### Multi-Agent Pipeline

```
User Message
    ↓
1. Social Agent (Pattern matching)
   └─→ Quick responses for greetings
    ↓
2. State Agent (LLM classifier)
   └─→ Detects: intent, arousal, plan_request, needs_help
    ↓
3. Coaching Agent (LLM responder)
   └─→ Modes: GROUND (default) | PLAN (explicit requests)
   └─→ Outputs: text response + optional UI_ACTION
```

### Key Components

**Frontend:**
- `src/app/App.tsx` - Main app with screen routing
- `src/app/components/ChatScreen.tsx` - Chat interface
- `src/app/services/api.ts` - Backend communication
- `src/app/components/chat/MicroActionSuggestion.tsx` - Micro-action cards

**Backend:**
- `SHAE_LLM/app/main.py` - FastAPI routes
- `SHAE_LLM/app/orchestrator.py` - Agent orchestration
- `SHAE_LLM/app/agents.py` - Agent implementations
- `SHAE_LLM/app/prompts.py` - System prompts
- `SHAE_LLM/app/llm_backend.py` - LLM interface

## Usage

1. Start Ollama: `ollama serve`
2. Start Backend: `cd SHAE_LLM && uvicorn app.main:app --reload`
3. Start Frontend: `npm run dev`
4. Open browser to `http://localhost:5173`

## Coaching Modes

- **GROUND Mode** (Default): Short, supportive responses with optional micro-actions
- **PLAN Mode**: Structured 21-day resilience plans (triggered by explicit planning requests)

## Micro-Actions

- **Square Breathing**: 4-4-4-4 breath pattern for grounding
- **Burn Journaling**: Write and release without saving
- **2-Minute Rule**: Start small tasks to build momentum

## Development

### Project Structure

```
SHAE/
├── src/                    # Frontend React app
│   └── app/
│       ├── components/     # React components
│       ├── services/       # API services
│       └── utils/          # Utilities
├── SHAE_LLM/              # Backend Python app
│   └── app/
│       ├── agents.py       # Agent logic
│       ├── orchestrator.py # Orchestration
│       ├── prompts.py      # System prompts
│       └── main.py         # FastAPI app
├── package.json           # Frontend dependencies
└── README.md              # This file
```

### Running Tests

```bash
# Frontend (if tests are added)
npm test

# Backend (if tests are added)
cd SHAE_LLM
pytest
```

## Privacy & Security

- All conversations are stored locally in SQLite
- No data is sent to external services when using Ollama
- `.env` file contains no sensitive credentials (only local configuration)
- Session IDs are generated locally and stored in browser localStorage

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add license information]

## Acknowledgments

- Built with Claude Code
- Powered by Ollama and Meta's Llama 3.1 model
- UI design based on Figma export from "New User Workflow"

## Support

For issues or questions:
- Open an issue on GitHub: https://github.com/vyom13/SHAE_AIBOOMI/issues
- Review the documentation in the codebase

---

**Note**: This is a mental health support tool, not a replacement for professional mental health care. If you're in crisis, please contact local emergency services or a mental health helpline.
