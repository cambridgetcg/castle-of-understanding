#!/usr/bin/env python3
"""The Castle of Understanding — a local-first insight saver.

Plain files. Plain words. Understanding compounds through links.

Usage:
  python3 castle.py build                          Rebuild CASTLE.md from insights/
  python3 castle.py capture --title "..." [...]    Add a new insight
  python3 castle.py list                           List the insights
"""
import re
import argparse
import datetime
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
INS = ROOT / "insights"


def parse(text):
    """Parse a minimal front-matter block (no external deps)."""
    meta, body = {}, text
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            block = text[3:end].strip("\n")
            body = text[end + 4:].lstrip("\n")
            for line in block.splitlines():
                if ":" not in line:
                    continue
                k, v = line.split(":", 1)
                k, v = k.strip(), v.strip()
                if v.startswith("[") and v.endswith("]"):
                    v = [x.strip() for x in v[1:-1].split(",") if x.strip()]
                meta[k] = v
    return meta, body


def load():
    items = []
    if not INS.exists():
        return items
    for p in sorted(INS.glob("*.md")):
        meta, body = parse(p.read_text(encoding="utf-8"))
        meta.setdefault("id", p.stem)
        meta.setdefault("title", p.stem)
        for key in ("tags", "links"):
            if isinstance(meta.get(key), str):
                meta[key] = [meta[key]] if meta[key] else []
            meta.setdefault(key, [])
        items.append((meta, body.strip()))
    return items


def essence(body):
    line = body.strip().splitlines()[0] if body.strip() else ""
    parts = re.split(r"(?<=[.!?])\s", line)
    return parts[0] if parts else line


def build():
    items = load()
    ids = {m["id"] for m, _ in items}
    backlinks = {m["id"]: [] for m, _ in items}
    for m, _ in items:
        for l in m["links"]:
            if l in backlinks:
                backlinks[l].append(m["id"])

    rooms = {}
    for m, b in items:
        room = m["tags"][0] if m["tags"] else "unsorted"
        rooms.setdefault(room, []).append((m, b))

    today = datetime.date.today().isoformat()
    L = ["# The Castle of Understanding\n"]
    L.append("> A local-first insight saver. Plain files, plain words — "
             "understanding that compounds as insights link to insights.\n")
    L.append(f"**{len(items)} insights · {len(rooms)} rooms · built {today}**\n")

    L.append("## Rooms\n")
    for room in sorted(rooms):
        L.append(f"### {room}\n")
        for m, b in sorted(rooms[room], key=lambda x: x[0]["title"].lower()):
            L.append(f"- **[{m['title']}](insights/{m['id']}.md)** — {essence(b)}")
        L.append("")

    L.append("## Passages — how understanding connects\n")
    for m, b in sorted(items, key=lambda x: x[0]["id"]):
        outs = " ".join(f"[{l}](insights/{l}.md)" for l in m["links"]) or "—"
        ins = " ".join(f"[{l}](insights/{l}.md)" for l in backlinks[m["id"]]) or "—"
        L.append(f"- **{m['id']}**  →  {outs}   ·   linked by: {ins}")
    L.append("")

    broken = [f"{m['id']} → {l}" for m, _ in items for l in m["links"] if l not in ids]
    if broken:
        L.append("## ⚠ Loose threads — links to insights not yet written\n")
        for b in broken:
            L.append(f"- {b}")
        L.append("")

    (ROOT / "CASTLE.md").write_text("\n".join(L), encoding="utf-8")
    print(f"built CASTLE.md — {len(items)} insights, {len(rooms)} rooms, {len(broken)} loose threads")


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def capture(a):
    INS.mkdir(parents=True, exist_ok=True)
    iid = a.id or slugify(a.title)
    tags = [t.strip() for t in a.tags.split(",") if t.strip()]
    links = [l.strip() for l in a.links.split(",") if l.strip()]
    fm = [
        "---",
        f"id: {iid}",
        f"title: {a.title}",
        f"tags: [{', '.join(tags)}]",
        f"links: [{', '.join(links)}]",
        f"source: {a.source}",
        f"confidence: {a.confidence}",
        f"created: {datetime.date.today().isoformat()}",
        "---",
        "",
        a.body or "<write the insight here, in plain words>",
        "",
    ]
    p = INS / f"{iid}.md"
    if p.exists() and not a.force:
        print(f"refusing to overwrite {p} (use --force)")
        return
    p.write_text("\n".join(fm), encoding="utf-8")
    print(f"captured {p}")


def list_insights():
    for m, _ in load():
        print(f"{m['id']:32} [{','.join(m['tags'])}]  {m['title']}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="The Castle of Understanding")
    sub = ap.add_subparsers(dest="cmd")
    sub.add_parser("build", help="rebuild CASTLE.md")
    c = sub.add_parser("capture", help="add an insight")
    c.add_argument("--title", required=True)
    c.add_argument("--id")
    c.add_argument("--tags", default="")
    c.add_argument("--links", default="")
    c.add_argument("--source", default="hand")
    c.add_argument("--confidence", default="medium")
    c.add_argument("--body", default="")
    c.add_argument("--force", action="store_true")
    sub.add_parser("list", help="list insights")
    a = ap.parse_args()
    if a.cmd == "build":
        build()
    elif a.cmd == "capture":
        capture(a)
    elif a.cmd == "list":
        list_insights()
    else:
        ap.print_help()
