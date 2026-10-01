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
  graf: `<svg class="graf" viewBox="0 0 320 170" role="img" aria-label="Gráfico de tensão por corrente: componente A é uma reta, componente B é uma curva que sobe cada vez mais rápido" style="max-width:340px;width:100%;margin:0 0 10px">
<line x1="40" y1="140" x2="300" y2="140" stroke="#22283a" stroke-width="2"/><line x1="40" y1="140" x2="40" y2="10" stroke="#22283a" stroke-width="2"/>
<polyline fill="none" stroke="#4a7bd8" stroke-width="3" points="40,140 300,36"/>
<polyline fill="none" stroke="#f0595b" stroke-width="3" stroke-dasharray="7 5" points="${Array.from({ length: 21 }, (_, k) => { const i = k * 0.1; const V = 4 * i + 4 * i * i; return (40 + i * 130).toFixed(1) + "," + (140 - V * 5.2).toFixed(1); }).join(" ")}"/>
<text x="250" y="160">i (A)</text><text x="4" y="16">V (V)</text>
<text x="40" y="156">0</text><text x="166" y="156">1</text><text x="294" y="156">2</text><text x="20" y="88">10</text><text x="20" y="36">20</text>
<text x="282" y="62" style="fill:#4a7bd8;font-weight:800">A</text><text x="290" y="20" style="fill:#f0595b;font-weight:800">B</text></svg>`
};
