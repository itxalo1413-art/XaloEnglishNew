# -*- coding: utf-8 -*-
"""Generate src/app/quy-trinh/page.tsx from branding HTML (UTF-8)."""
import json
import re
import subprocess
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def get_br() -> Path:
    p = subprocess.check_output(
        "find /Users/nguyen/Downloads -maxdepth 1 -type d -name '*BRANDING*' | head -1",
        shell=True,
        text=True,
    ).strip()
    return Path(p)


class DocParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.chunks: list[tuple[str, str]] = []

    def handle_starttag(self, tag, attrs):
        if tag == "img":
            src = dict(attrs).get("src", "")
            self.chunks.append(("IMG", src))

    def handle_data(self, d):
        t = " ".join(d.split())
        if t:
            self.chunks.append(("TXT", t))


def merge_txt(chunks, a: int, b: int) -> str:
    parts: list[str] = []
    for i in range(a, b + 1):
        if 0 <= i < len(chunks) and chunks[i][0] == "TXT":
            parts.append(chunks[i][1])
    s = " ".join(parts)
    s = re.sub(r"\s+([,.:;?)])", r"\1", s)
    s = re.sub(r"\(\s+", "(", s)
    return s


def ts_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def main() -> None:
    br = get_br()
    html = (br / "BnsaocaMTCCSNPHMBRANDINGMKTDEPT.html").read_text(encoding="utf-8")
    html = re.sub(r"<style[^>]*>.*?</style>", " ", html, flags=re.DOTALL | re.I)
    parser = DocParser()
    parser.feed(html)
    ch = parser.chunks

    k0 = merge_txt(ch, 4, 7)
    k1 = merge_txt(ch, 8, 11)
    k2 = merge_txt(ch, 12, 16)
    k3 = merge_txt(ch, 17, 31)

    nt_h2 = ch[32][1]
    nt_intro = ch[33][1]

    p1_title = ch[34][1]
    p1_open = merge_txt(ch, 35, 37)
    p1_b0, p1_b1, p1_b2 = ch[38][1], ch[39][1], ch[40][1]
    p1_close = merge_txt(ch, 41, 43)

    p2_title = ch[44][1]
    p2_open = merge_txt(ch, 45, 47)
    p2_b0, p2_b1, p2_b2 = ch[48][1], ch[49][1], ch[50][1]
    p2_mid = merge_txt(ch, 51, 53)
    p2_b3, p2_b4, p2_b5 = ch[54][1], ch[55][1], ch[56][1]
    p2_close = merge_txt(ch, 57, 59)

    p3_title = ch[60][1]
    p3_open = merge_txt(ch, 61, 63)
    p3_b0, p3_b1, p3_b2 = ch[64][1], ch[65][1], ch[66][1]
    p3_close = merge_txt(ch, 67, 69)

    ii_h2 = ch[70][1]

    chan_title = merge_txt(ch, 72, 73)
    chan_intro = ch[74][1]
    chan_items = [
        (ch[75][1], ch[76][1]),
        (ch[77][1], ch[78][1]),
        (ch[79][1], ch[80][1]),
    ]

    chua_title = merge_txt(ch, 82, 83)
    chua_intro = ch[84][1]
    chua_items = [
        (ch[85][1], ch[86][1]),
        (ch[87][1], ch[88][1]),
        (ch[89][1], ch[90][1]),
    ]

    iii_h2 = ch[91][1]
    tomtat_h3 = ch[93][1]
    tomtat_0a, tomtat_0b = ch[94][1], ch[95][1]
    tomtat_1a, tomtat_1b = ch[96][1], ch[97][1]
    mohinh_p = ch[98][1]
    mohinh_items = [ch[99][1], ch[100][1], ch[101][1]]

    closing_h3 = ch[102][1]
    closing_p1 = ch[103][1]
    closing_steps_p = ch[104][1]
    closing_steps = [ch[105][1], ch[106][1], ch[107][1], ch[108][1], ch[109][1]]
    closing_ensure_p = ch[110][1]
    closing_ensure = [ch[111][1], ch[112][1], ch[113][1]]
    bcb_p = ch[114][1]
    rlp_p = ch[115][1]
    cycles_p = ch[116][1]
    cycles = [ch[117][1], ch[118][1], ch[119][1]]
    final_p = ch[120][1]

    badge = ch[0][1]
    byline = ch[2][1]
    khai_h2 = ch[3][1]

    lines: list[str] = []
    W = lines.append
    W('import Image from "next/image";')
    W('import Link from "next/link";')
    W('import { SiteFooter } from "@/components/site-footer";')
    W('import { SiteHeader } from "@/components/site-header";')
    W('import { FinalCta } from "@/components/home/final-cta";')
    W("")
    W("const khaiNiemCards = [")
    W(f"  {{ body: {ts_str(k0)} }},")
    W(f"  {{ body: {ts_str(k1)} }},")
    W(f"  {{ body: {ts_str(k2)} }},")
    W("] as const;")
    W("")
    W("const nguyenTacItems = [")
    W("  {")
    W(f"    title: {ts_str(p1_title)},")
    W("    body: (")
    W("      <>")
    W(f"        <p>{p1_open}</p>")
    W('        <ul className="mt-3 list-disc space-y-2 pl-5">')
    W(f"          <li>{p1_b0}</li>")
    W(f"          <li>{p1_b1}</li>")
    W(f"          <li>{p1_b2}</li>")
    W("        </ul>")
    W(f'        <p className="mt-3">{p1_close}</p>')
    W("      </>")
    W("    ),")
    W("  },")
    W("  {")
    W(f"    title: {ts_str(p2_title)},")
    W("    body: (")
    W("      <>")
    W(f"        <p>{p2_open}</p>")
    W('        <ul className="mt-3 list-disc space-y-2 pl-5">')
    W(f"          <li>{p2_b0}</li>")
    W(f"          <li>{p2_b1}</li>")
    W(f"          <li>{p2_b2}</li>")
    W("        </ul>")
    W(f'        <p className="mt-3">{p2_mid}</p>')
    W('        <ul className="mt-3 list-disc space-y-2 pl-5">')
    W(f"          <li>{p2_b3}</li>")
    W(f"          <li>{p2_b4}</li>")
    W(f"          <li>{p2_b5}</li>")
    W("        </ul>")
    W(f'        <p className="mt-3">{p2_close}</p>')
    W("      </>")
    W("    ),")
    W("  },")
    W("  {")
    W(f"    title: {ts_str(p3_title)},")
    W("    body: (")
    W("      <>")
    W(f"        <p>{p3_open}</p>")
    W('        <ul className="mt-3 list-disc space-y-2 pl-5">')
    W(f"          <li>{p3_b0}</li>")
    W(f"          <li>{p3_b1}</li>")
    W(f"          <li>{p3_b2}</li>")
    W("        </ul>")
    W(f'        <p className="mt-3">{p3_close}</p>')
    W("      </>")
    W("    ),")
    W("  },")
    W("] as const;")
    W("")
    W("const chanPoints = [")
    for lab, txt in chan_items:
        W(f"  {{ label: {ts_str(lab)}, text: {ts_str(txt)} }},")
    W("] as const;")
    W("")
    W("const chuaPoints = [")
    for lab, txt in chua_items:
        W(f"  {{ label: {ts_str(lab)}, text: {ts_str(txt)} }},")
    W("] as const;")
    W("")
    W(f"const docClosingArrowNote = {ts_str(final_p)};")
    W("")
    W("export default function QuyTrinhChanChuaPage() {")
    W("  return (")
    W("    <>")
    W("      <SiteHeader />")
    W('      <main className="flex-1">')
    W('        <section id="chan-chua-la-gi" className="bg-[#fff] py-16 sm:py-24 lg:py-28">')
    W('          <div className="mx-auto max-w-8xl px-4 sm:px-6">')
    W('            <div className="mx-auto max-w-5xl text-center">')
    W('              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold text-[var(--foreground)] ring-1 ring-black/10">')
    W('                <span className="flex -space-x-2" aria-hidden>')
    W('                  <span className="h-6 w-6 rounded-full bg-[var(--surface-2)] ring-2 ring-white/80" />')
    W('                  <span className="h-6 w-6 rounded-full bg-[var(--surface-2)] ring-2 ring-white/80" />')
    W('                  <span className="h-6 w-6 rounded-full bg-[var(--surface-2)] ring-2 ring-white/80" />')
    W("                </span>")
    W(f"                <span>{badge}</span>")
    W("              </div>")
    W('              <div className="mt-7 flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start sm:gap-10">')
    W('                <div className="min-w-0 text-center sm:text-left">')
    W('                  <h1 className="text-balance text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">')
    W(f"                    {badge}")
    W("                  </h1>")
    W('                  <p className="mt-4 text-lg font-semibold text-[var(--foreground)] sm:text-xl">')
    W(f"                    {byline}")
    W("                  </p>")
    W("                </div>")
    W('                <div className="relative h-[114px] w-[106px] shrink-0">')
    W('                  <Image src="/quy-trinh-branding/image4.png" alt="" width={106} height={114} className="h-auto w-[106px]" />')
    W("                </div>")
    W("              </div>")
    W('              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">')
    W('                <a')
    W('                  href="#dang-ky-tu-van"')
    W('                  className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-sm bg-[var(--primary)] px-8 text-base font-semibold text-[var(--on-primary)] transition-colors hover:bg-[var(--secondary)]"')
    W("                >")
    W("                  Làm test đầu vào")
    W("                </a>")
    W("                <Link")
    W('                  href="#dang-ky-tu-van"')
    W('                  className="inline-flex h-12 min-w-[220px] items-center justify-center rounded-sm bg-white/40 px-8 text-base font-semibold text-[var(--primary)] ring-1 ring-black/10 transition-colors hover:bg-white/70"')
    W("                >")
    W("                  Đăng ký tư vấn")
    W("                </Link>")
    W("              </div>")
    W("            </div>")
    W('            <h2 className="mx-auto mt-14 max-w-5xl text-center text-balance text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">')
    W(f"              {khai_h2}")
    W("            </h2>")
    W('            <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:gap-6">')
    W("              {khaiNiemCards.map((x, i) => (")
    W('                <div key={i} className="rounded-sm bg-[var(--surface-2)] p-6 shadow-sm shadow-black/10">')
    W('                  <p className="text-sm leading-relaxed text-[var(--muted)]">{x.body}</p>')
    W("                </div>")
    W("              ))}")
    W("            </div>")
    W("          </div>")
    W("        </section>")
    W("")
    W('        <section className="bg-[var(--background)] py-16 sm:py-24">')
    W('          <div className="mx-auto max-w-8xl px-4 sm:px-6">')
    W('            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-12 xl:gap-16">')
    W('              <div className="max-w-xl lg:max-w-none">')
    W('                <p className="text-base leading-relaxed text-[var(--muted)] sm:text-lg">')
    W(f"                  {k3}")
    W("                </p>")
    W("              </div>")
    W('              <div className="grid gap-6 lg:grid-cols-2">')
    W('                <div className="overflow-hidden rounded-sm bg-[var(--surface-2)] shadow-sm shadow-black/10">')
    W('                  <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-black/5 via-black/0 to-black/10">')
    W('                    <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(0,0,0,0.08),transparent_60%)]" />')
    W("                  </div>")
    W('                  <div className="p-6" aria-hidden />')
    W("                </div>")
    W('                <div className="overflow-hidden rounded-sm bg-[var(--surface-2)] shadow-sm shadow-black/10">')
    W('                  <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-black/5 via-black/0 to-black/10">')
    W('                    <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,rgba(0,0,0,0.08),transparent_60%)]" />')
    W("                  </div>")
    W('                  <div className="p-6" aria-hidden />')
    W("                </div>")
    W("              </div>")
    W("            </div>")
    W("          </div>")
    W("        </section>")
    W("")
    W('        <section className="bg-[var(--background)] py-16 sm:py-24">')
    W('          <div className="mx-auto max-w-8xl px-4 sm:px-6">')
    W('            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-12 xl:gap-16">')
    W('              <div className="max-w-3xl">')
    W('                <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">')
    W(f"                  {nt_h2}")
    W("                </h2>")
    W("              </div>")
    W('              <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">')
    W(f"                {nt_intro}")
    W("              </p>")
    W("            </div>")
    W('            <div className="mt-12 overflow-hidden rounded-sm bg-[var(--surface-2)] shadow-sm shadow-black/10">')
    W('              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">')
    W('                <div className="space-y-10 p-7 sm:p-10">')
    W("                  {nguyenTacItems.map((x) => (")
    W('                    <div key={x.title} className="flex gap-3">')
    W('                      <span')
    W('                        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--background)] text-[var(--muted)] ring-1 ring-black/10"')
    W("                        aria-hidden")
    W("                      >")
    W("                        \u2726")
    W("                      </span>")
    W('                      <div className="min-w-0 text-sm leading-relaxed text-[var(--muted)]">')
    W('                        <p className="font-semibold text-[var(--foreground)]">{x.title}</p>')
    W('                        <div className="mt-2">{x.body}</div>')
    W("                      </div>")
    W("                    </div>")
    W("                  ))}")
    W("                </div>")
    W('                <div className="relative min-h-[440px] bg-[#F5F0EA] sm:min-h-[560px]">')
    W('                  <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_60%_40%,rgba(0,0,0,0.18),transparent_62%)]" />')
    W('                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--surface-2)] to-transparent lg:w-32" />')
    W('                  <div className="absolute inset-8 rounded-sm bg-[linear-gradient(135deg,rgba(0,0,0,0.08),rgba(0,0,0,0.02))] ring-1 ring-black/10" />')
    W('                  <div className="absolute right-8 bottom-8 h-12 w-24 rounded-lg bg-white/70 ring-1 ring-black/10" />')
    W("                </div>")
    W("              </div>")
    W("            </div>")
    W("          </div>")
    W("        </section>")
    W("")
    W('        <section id="quy-trinh" className="bg-[var(--surface-2)] py-16 sm:py-24">')
    W('          <div className="mx-auto max-w-8xl px-4 sm:px-6">')
    W('            <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">')
    W(f"              {ii_h2}")
    W("            </h2>")
    W('            <div className="mt-8 flex justify-center">')
    W('              <Image src="/quy-trinh-branding/image2.jpg" alt="" width={337} height={455} className="h-auto max-w-full" />')
    W("            </div>")
    W('            <div className="mt-12 rounded-sm bg-[var(--background)] p-6 shadow-sm shadow-black/10 sm:p-8">')
    W('              <h3 className="text-lg font-semibold text-[var(--foreground)]">')
    W(f"                {chan_title}")
    W("              </h3>")
    W('              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                {chan_intro}")
    W("              </p>")
    W('              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--muted)]">')
    W("                {chanPoints.map((c) => (")
    W("                  <li key={c.label}>")
    W('                    <span className="font-semibold text-[var(--foreground)]">{c.label}</span> {c.text}')
    W("                  </li>")
    W("                ))}")
    W("              </ul>")
    W("            </div>")
    W('            <div className="mt-10 flex justify-center">')
    W('              <Image src="/quy-trinh-branding/image3.jpg" alt="" width={434} height={481} className="h-auto max-w-full" />')
    W("            </div>")
    W('            <div className="mt-12 rounded-sm bg-[var(--background)] p-6 shadow-sm shadow-black/10 sm:p-8">')
    W('              <h3 className="text-lg font-semibold text-[var(--foreground)]">')
    W(f"                {chua_title}")
    W("              </h3>")
    W('              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                {chua_intro}")
    W("              </p>")
    W('              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--muted)]">')
    W("                {chuaPoints.map((c) => (")
    W("                  <li key={c.label}>")
    W('                    <span className="font-semibold text-[var(--foreground)]">{c.label}</span> {c.text}')
    W("                  </li>")
    W("                ))}")
    W("              </ul>")
    W("            </div>")
    W("          </div>")
    W("        </section>")
    W("")
    W('        <section className="bg-[var(--background)] py-16 sm:py-24">')
    W('          <div className="mx-auto max-w-8xl px-4 sm:px-6">')
    W('            <h2 className="text-balance text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">')
    W(f"              {iii_h2}")
    W("            </h2>")
    W('            <div className="mt-8 overflow-x-auto rounded-sm shadow-sm shadow-black/10">')
    W("              <Image")
    W('                src="/quy-trinh-branding/image1.png"')
    W('                alt=""')
    W("                width={1206}")
    W("                height={654}")
    W('                className="h-auto min-w-[min(100%,1206px)] w-full max-w-full"')
    W("              />")
    W("            </div>")
    W('            <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12 xl:gap-16">')
    W('              <div className="rounded-sm bg-[var(--surface-2)] p-6 shadow-sm shadow-black/10 sm:p-8">')
    W('                <h3 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">')
    W(f"                  {tomtat_h3}")
    W("                </h3>")
    W('                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)]">')
    W("                  <li>")
    W('                    <span className="font-semibold text-[var(--foreground)]">')
    W(f"                      {tomtat_0a}")
    W("                    </span>")
    W(f"                    {tomtat_0b}")
    W("                  </li>")
    W("                  <li>")
    W('                    <span className="font-semibold text-[var(--foreground)]">')
    W(f"                      {tomtat_1a}")
    W("                    </span>")
    W(f"                    {tomtat_1b}")
    W("                  </li>")
    W("                </ul>")
    W('                <p className="mt-6 text-sm font-semibold text-[var(--foreground)]">')
    W(f"                  {mohinh_p}")
    W("                </p>")
    W('                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                  <li>{mohinh_items[0]}</li>")
    W(f"                  <li>{mohinh_items[1]}</li>")
    W(f"                  <li>{mohinh_items[2]}</li>")
    W("                </ul>")
    W("              </div>")
    W('              <div className="space-y-6">')
    W('                <div className="rounded-sm bg-[var(--surface-2)] p-6 shadow-sm shadow-black/10 sm:p-8">')
    W('                  <h3 className="text-lg font-semibold text-[var(--foreground)]">')
    W(f"                    {closing_h3}")
    W("                  </h3>")
    W('                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                    {closing_p1}")
    W("                  </p>")
    W('                  <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">')
    W(f"                    {closing_steps_p}")
    W("                  </p>")
    W('                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                    <li>{closing_steps[0]}</li>")
    W(f"                    <li>{closing_steps[1]}</li>")
    W(f"                    <li>{closing_steps[2]}</li>")
    W(f"                    <li>{closing_steps[3]}</li>")
    W(f"                    <li>{closing_steps[4]}</li>")
    W("                  </ul>")
    W('                  <p className="mt-6 text-sm font-semibold text-[var(--foreground)]">')
    W(f"                    {closing_ensure_p}")
    W("                  </p>")
    W('                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                    <li>{closing_ensure[0]}</li>")
    W(f"                    <li>{closing_ensure[1]}</li>")
    W(f"                    <li>{closing_ensure[2]}</li>")
    W("                  </ul>")
    W("                </div>")
    W('                <div className="rounded-sm bg-[var(--surface-2)] p-6 shadow-sm shadow-black/10 sm:p-8">')
    W('                  <p className="text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                    {bcb_p}")
    W("                  </p>")
    W('                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                    {rlp_p}")
    W("                  </p>")
    W('                  <p className="mt-6 text-sm font-semibold text-[var(--foreground)]">')
    W(f"                    {cycles_p}")
    W("                  </p>")
    W('                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--muted)]">')
    W(f"                    <li>{cycles[0]}</li>")
    W(f"                    <li>{cycles[1]}</li>")
    W(f"                    <li>{cycles[2]}</li>")
    W("                  </ul>")
    W('                  <p className="mt-6 text-sm font-semibold text-[var(--foreground)]">')
    W("                    {docClosingArrowNote}")
    W("                  </p>")
    W("                </div>")
    W("              </div>")
    W("            </div>")
    W("          </div>")
    W("        </section>")
    W("")
    W("        <FinalCta />")
    W("      </main>")
    W("      <SiteFooter />")
    W("    </>")
    W("  );")
    W("}")
    W("")

    out_path = ROOT / "src/app/quy-trinh/page.tsx"
    out_path.write_text("\n".join(lines), encoding="utf-8")
    print("Wrote", out_path)


if __name__ == "__main__":
    main()
