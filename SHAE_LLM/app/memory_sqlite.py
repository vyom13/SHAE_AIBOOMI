from __future__ import annotations
import os
import sqlite3
from typing import List, Tuple, Optional
from datetime import datetime

# Store DB in project root (next to app/)
DB_PATH = os.getenv("SHAE_DB_PATH", os.path.join(os.getcwd(), "shae_memory.db"))

def _conn() -> sqlite3.Connection:
    c = sqlite3.connect(DB_PATH, check_same_thread=False)
    c.row_factory = sqlite3.Row
    return c

def init_db() -> None:
    with _conn() as c:
        c.execute("""
        CREATE TABLE IF NOT EXISTS turns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            ts TEXT NOT NULL,
            role TEXT NOT NULL,
            text TEXT NOT NULL
        )
        """)
        c.execute("""
        CREATE TABLE IF NOT EXISTS session_state (
            session_id TEXT PRIMARY KEY,
            summary TEXT NOT NULL DEFAULT '',
            updated_at TEXT NOT NULL
        )
        """)
        c.commit()

def append_turn(session_id: str, role: str, text: str) -> None:
    if not session_id:
        session_id = "default"
    ts = datetime.utcnow().isoformat()
    with _conn() as c:
        c.execute(
            "INSERT INTO turns(session_id, ts, role, text) VALUES(?,?,?,?)",
            (session_id, ts, role, text),
        )
        c.commit()

def get_turn_count(session_id: str) -> int:
    with _conn() as c:
        row = c.execute(
            "SELECT COUNT(*) AS n FROM turns WHERE session_id=?",
            (session_id,),
        ).fetchone()
        return int(row["n"]) if row else 0

def get_last_turns(session_id: str, limit: int) -> List[Tuple[str, str]]:
    with _conn() as c:
        rows = c.execute(
            "SELECT role, text FROM turns WHERE session_id=? ORDER BY id DESC LIMIT ?",
            (session_id, limit),
        ).fetchall()
        # rows are newest-first; reverse to chronological
        return [(r["role"], r["text"]) for r in reversed(rows)]

def get_old_turns_excluding_last(session_id: str, keep_last: int) -> List[Tuple[str, str]]:
    """
    Returns the older turns that would be summarized:
    all turns except the most recent `keep_last`.
    """
    with _conn() as c:
        # fetch ids of last keep_last turns
        rows = c.execute(
            "SELECT id FROM turns WHERE session_id=? ORDER BY id DESC LIMIT ?",
            (session_id, keep_last),
        ).fetchall()
        last_ids = [r["id"] for r in rows]
        if not last_ids:
            return []

        min_last_id = min(last_ids)

        older = c.execute(
            "SELECT role, text FROM turns WHERE session_id=? AND id < ? ORDER BY id ASC",
            (session_id, min_last_id),
        ).fetchall()
        return [(r["role"], r["text"]) for r in older]

def delete_old_turns_excluding_last(session_id: str, keep_last: int) -> None:
    with _conn() as c:
        rows = c.execute(
            "SELECT id FROM turns WHERE session_id=? ORDER BY id DESC LIMIT ?",
            (session_id, keep_last),
        ).fetchall()
        last_ids = [r["id"] for r in rows]
        if not last_ids:
            return
        min_last_id = min(last_ids)
        c.execute(
            "DELETE FROM turns WHERE session_id=? AND id < ?",
            (session_id, min_last_id),
        )
        c.commit()

def get_summary(session_id: str) -> str:
    with _conn() as c:
        row = c.execute(
            "SELECT summary FROM session_state WHERE session_id=?",
            (session_id,),
        ).fetchone()
        return (row["summary"] if row else "") or ""

def set_summary(session_id: str, summary: str) -> None:
    ts = datetime.utcnow().isoformat()
    summary = (summary or "").strip()
    with _conn() as c:
        c.execute(
            """
            INSERT INTO session_state(session_id, summary, updated_at)
            VALUES(?,?,?)
            ON CONFLICT(session_id) DO UPDATE SET
              summary=excluded.summary,
              updated_at=excluded.updated_at
            """,
            (session_id, summary, ts),
        )
        c.commit()

def clear_session(session_id: str) -> None:
    with _conn() as c:
        c.execute("DELETE FROM turns WHERE session_id=?", (session_id,))
        c.execute("DELETE FROM session_state WHERE session_id=?", (session_id,))
        c.commit()
