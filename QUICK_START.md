# ⚡ Quick Start Guide

## 🚀 Start in 3 Steps

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd Backened
pip install -r requirements.txt
python -m spacy download en_core_web_sm
cd ..
```

### Step 2: Start Backend

```bash
cd Backened
python run_server.py
```

✅ Backend running at: `http://localhost:8000`

### Step 3: Start Frontend (New Terminal)

```bash
npm start
```

✅ Frontend running at: `http://localhost:3000`

## 🎯 That's It!

Open your browser to `http://localhost:3000` and start detecting fake news!

---

## 📝 Notes

- **API Status**: Check the indicator in the dashboard header (🟢 = connected)
- **Without ML Models**: The app works using LLM analysis only
- **To train ML models**: See `SETUP_INSTRUCTIONS.md`

## 🐛 Issues?

**Backend won't start?**
```bash
pip install -r requirements.txt --force-reinstall
```

**Frontend won't start?**
```bash
npm install --force
```

**Port conflicts?**
- Backend: Change port in `Backened/run_server.py` (line 119)
- Frontend: `set PORT=3001 && npm start`

---

For detailed setup: See `SETUP_INSTRUCTIONS.md`
