/* ============================================================
   FIGURAS das questões, usadas pelo projetor e pelo celular.

   Ficam aqui, num arquivo só, para não existirem duas cópias que
   possam sair de sincronia. O banco de dados nunca transporta HTML:
   ele manda apenas a CHAVE da figura (ex.: "graf") e cada tela
   desenha a sua a partir deste arquivo. Se alguém escrever lixo no
   banco, não há como virar código rodando na tela de ninguém.
   ============================================================ */
window.FIGURAS = {
  /* V × i de dois componentes: A ôhmico (reta), B com R crescente */
  graf: `<svg class="graf" viewBox="0 0 320 186" style="max-width:360px;width:100%;margin:0 0 10px" role="img" aria-label="Gráfico V por i: A é uma reta pela origem e B é uma curva">
<g stroke="#c9d3dd" stroke-width="1">${[0, 0.5, 1, 1.5, 2].map((i) => `<line x1="${50 + i * 120}" y1="20" x2="${50 + i * 120}" y2="150"/>`).join("")}${[0, 5, 10, 15, 20, 25].map((v) => `<line x1="50" y1="${150 - v * 5.2}" x2="290" y2="${150 - v * 5.2}"/>`).join("")}</g>
<line x1="50" y1="150" x2="296" y2="150" stroke="#22283a" stroke-width="2"/><line x1="50" y1="150" x2="50" y2="14" stroke="#22283a" stroke-width="2"/>
<line x1="50" y1="150" x2="290" y2="46" stroke="#4a7bd8" stroke-width="3"/>
<polyline fill="none" stroke="#f0595b" stroke-width="3" stroke-dasharray="7 5" points="${Array.from({ length: 21 }, (_, k) => { const i = k * 0.1; const V = 4 * i + 4 * i * i; return (50 + i * 120).toFixed(1) + "," + (150 - V * 5.2).toFixed(1); }).join(" ")}"/>
<text x="262" y="72" style="fill:#4a7bd8;font-weight:800;font-size:14px">A</text><text x="276" y="30" style="fill:#f0595b;font-weight:800;font-size:14px">B</text>
${[0, 0.5, 1, 1.5, 2].map((i) => `<text x="${50 + i * 120}" y="166" text-anchor="middle">${String(i).replace(".", ",")}</text>`).join("")}
${[0, 5, 10, 15, 20, 25].map((v) => `<text x="42" y="${154 - v * 5.2}" text-anchor="end">${v}</text>`).join("")}
<text x="170" y="180" text-anchor="middle">i (A)</text><text x="6" y="12">V (V)</text></svg>`
};
