"""Writes the Virtucon Ventures pages into site/."""
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
DESC = "Virtucon Ventures builds and operates companies in consumer, health, and financial technology."
EMAIL = "info@virtuconventures.com"


def head(title, r):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<meta name="description" content="{DESC}">
<meta property="og:title" content="Virtucon Ventures">
<meta property="og:description" content="{DESC}">
<meta property="og:image" content="https://virtuconventures.com/assets/og.png">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#050505">
<link rel="icon" href="{r}assets/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="{r}assets/apple-touch-icon.png">
<link rel="stylesheet" href="{r}assets/site.css">
</head>
<body>
"""


CLOCK = '<div class="clock"><span id="clock-date"></span><span id="clock-time"></span></div>\n'
V = '<canvas id="v" aria-label="Virtucon Ventures logo"></canvas>\n'
def scripts(r):
    return f'<script src="{r}assets/clock.js"></script>\n<script type="module" src="{r}assets/v3d.js"></script>\n'
END = "</body>\n</html>\n"

R, U = "./", "../"  # paths from the root page and from one folder down

pages = {
    "index.html": head("Virtucon Ventures", R) + CLOCK + V + f"""<div class="foot-c up">
  <span>Virtucon Ventures</span>
  <a href="{R}info/">Info</a>
</div>
""" + scripts(R) + END,

    "info/index.html": head("Virtucon Ventures", U) + CLOCK + V + f"""<div class="panel">
  <nav class="links up"><a href="{U}incubations/">Incubations</a><a href="{U}contact/">Contact</a></nav>
  <p class="body">{DESC}</p>
  <a class="up" href="{U}">Home</a>
</div>
""" + scripts(U) + END,

    "incubations/index.html": head("Incubations | Virtucon Ventures", U) + CLOCK + V + f"""<div class="panel">
  <span class="up">Virtucon Incubations</span>
  <div class="list body">
    <span>Holy Grail &mdash; DTC</span>
    <span>Grail &mdash; Telehealth</span>
    <span>OneTap &mdash; Fintech</span>
  </div>
  <a class="up" href="{U}info/">Close</a>
</div>
""" + scripts(U) + END,

    "contact/index.html": head("Contact | Virtucon Ventures", U) + f"""<div class="top-l up">Virtucon Ventures</div>
<div class="mid-l">General correspondence: <a href="mailto:{EMAIL}">{EMAIL}</a></div>
<a class="bot-l up" href="{U}info/">Close</a>
""" + END,

    "404.html": head("Virtucon Ventures", "/") + """<div class="foot-c up">
  <span>Page not found</span>
  <a href="/">Home</a>
</div>
""" + END,
}

for rel, html in pages.items():
    p = SITE / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(html)
    print("wrote", p.relative_to(SITE))
