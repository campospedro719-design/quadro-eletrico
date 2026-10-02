/* ============================================================
   CENAS dos circuitos — a animação de 10 s que aparece na tela da
   sala depois de cada questão.

   Cada circuito tem um cômodo da casa. O eletricista entra, trabalha
   no ponto certo e o resultado depende da turma:
     .ok    → a maioria acertou: o circuito funciona
     .falha → a maioria errou: faísca, choque, fumaça

   As cenas usam o mesmo sistema de coordenadas da cena principal
   (viewBox 1200 × 510, chão em y = 470), então o boneco desenhado por
   person() no index.html encaixa sem ajuste. A linha do tempo (quem
   anda, quando trabalha, quando acende) fica no index.html; aqui só
   o desenho e as frases.

   Referências de altura: o eletricista em pé alcança com a mão
   x = alvo + 40, y ≈ 360. Com `sobe` ele fica mais alto (escada).
   ============================================================ */
window.CENAS = (function () {
  const K = "#22283a";

  const piso = (cor) =>
    `<rect y="458" width="1200" height="12" fill="#8a5a33"/><rect y="470" width="1200" height="40" fill="${cor || "#b07a4a"}"/>`;

  const faisca = (x, y) => `<g class="faisca" transform="translate(${x},${y})">
    <polyline points="0,0 16,-14 10,2 28,-6" stroke="#ffd23f" stroke-width="5" fill="none" stroke-linejoin="round"/>
    <polyline points="0,0 -18,-12 -10,2 -30,-2" stroke="#ffd23f" stroke-width="5" fill="none" stroke-linejoin="round"/>
    <polyline points="0,0 8,18 -2,12 4,32" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round"/>
    <circle r="9" fill="#fff" opacity=".9"/></g>`;

  /* o translate fica num <g> de fora: a animação da fumaça mexe no
     transform do <g> de dentro e apagaria a posição */
  const fumaca = (x, y) => `<g transform="translate(${x},${y})"><g class="fumaca">
    <circle cx="0" cy="0" r="12" fill="#9aa1ab"/><circle cx="14" cy="-8" r="10" fill="#b7bcc4"/><circle cx="-10" cy="-14" r="9" fill="#c9ced6"/></g></g>`;

  /* ---------- 1. TOMADAS · sala de estar ---------- */
  const tomadas = () => `
    <rect width="1200" height="470" fill="#f6e7c8"/>${piso()}
    <rect x="250" y="110" width="150" height="100" rx="6" fill="#8fd3e6" stroke="${K}" stroke-width="6"/>
    <path d="M262 198 L 300 150 L 330 180 L 355 160 L 388 198 Z" fill="#3fbf7f"/>
    <!-- sofá -->
    <rect x="80" y="330" width="360" height="90" rx="22" fill="#4a7bd8" stroke="${K}" stroke-width="5"/>
    <rect x="70" y="380" width="380" height="70" rx="16" fill="#3a63b8" stroke="${K}" stroke-width="5"/>
    <rect x="95" y="448" width="14" height="18" fill="${K}"/><rect x="410" y="448" width="14" height="18" fill="${K}"/>
    <!-- abajur de chão -->
    <g class="luz-on"><circle cx="880" cy="285" r="150" fill="#ffd23f" opacity=".35"/></g>
    <line x1="880" y1="300" x2="880" y2="462" stroke="${K}" stroke-width="7"/>
    <ellipse cx="880" cy="464" rx="38" ry="8" fill="${K}"/>
    <path d="M845 300 L 915 300 L 898 248 L 862 248 Z" fill="#f0595b" stroke="${K}" stroke-width="5" stroke-linejoin="round"/>
    <circle class="lampada" cx="880" cy="308" r="10" stroke="${K}" stroke-width="3"/>
    <!-- caixa 4×2 na parede, fios soltos e o espelho da tomada -->
    <rect x="596" y="340" width="34" height="46" rx="3" fill="#6b5640" stroke="${K}" stroke-width="3"/>
    <g class="fios"><path d="M606 360 q -18 6 -10 22 q 8 10 -6 18" stroke="#f0595b" stroke-width="4" fill="none"/>
      <path d="M620 360 q 18 8 8 22 q -8 10 6 20" stroke="#4a7bd8" stroke-width="4" fill="none"/>
      <path d="M613 362 q 0 16 2 30" stroke="#3fbf7f" stroke-width="4" fill="none"/></g>
    <g class="espelho">
      <rect x="590" y="334" width="46" height="58" rx="7" fill="#fff" stroke="${K}" stroke-width="4"/>
      <polygon points="613,348 625,355 625,369 613,376 601,369 601,355" fill="#e9edf2" stroke="${K}" stroke-width="2.5"/>
      <circle cx="607" cy="364" r="2.8" fill="${K}"/><circle cx="619" cy="364" r="2.8" fill="${K}"/><circle cx="613" cy="355" r="2.8" fill="${K}"/>
    </g>
    <!-- plugue do abajur, só aparece quando a tomada funciona -->
    <g class="plugue"><path d="M636 368 C 700 372 720 462 790 462 L 880 462" stroke="${K}" stroke-width="5" fill="none"/>
      <rect x="628" y="356" width="18" height="22" rx="4" fill="#fff" stroke="${K}" stroke-width="3"/>
      <path class="corrente" d="M636 368 C 700 372 720 462 790 462 L 880 462" stroke="#ffd23f" stroke-width="3" fill="none" stroke-dasharray="10 14"/></g>
    <circle class="queimado" cx="613" cy="362" r="26" fill="#2b2b2b" opacity=".55"/>`;

  /* ---------- 2. ILUMINAÇÃO · quarto ---------- */
  const iluminacao = () => `
    <rect width="1200" height="470" fill="#c9d6ea"/>${piso("#9c7650")}
    <rect x="880" y="80" width="170" height="130" rx="6" fill="#1c2a4a" stroke="${K}" stroke-width="6"/>
    <circle cx="1000" cy="120" r="20" fill="#f6efc4"/><circle cx="992" cy="114" r="18" fill="#1c2a4a"/>
    <line x1="965" y1="80" x2="965" y2="210" stroke="${K}" stroke-width="4"/>
    <!-- cama -->
    <rect x="760" y="360" width="330" height="70" rx="12" fill="#f0595b" stroke="${K}" stroke-width="5"/>
    <rect x="1060" y="300" width="34" height="160" rx="6" fill="#9a6a3a" stroke="${K}" stroke-width="5"/>
    <rect x="1010" y="335" width="60" height="30" rx="12" fill="#fff" stroke="${K}" stroke-width="4"/>
    <rect x="770" y="428" width="14" height="34" fill="#9a6a3a" stroke="${K}" stroke-width="3"/>
    <!-- interruptor -->
    <rect x="330" y="310" width="34" height="52" rx="6" fill="#fff" stroke="${K}" stroke-width="4"/>
    <rect class="tecla" x="340" y="322" width="14" height="28" rx="3" fill="#d7dde5" stroke="${K}" stroke-width="2.5"/>
    <!-- luz e pendente -->
    <g class="luz-on"><circle cx="560" cy="250" r="230" fill="#ffd23f" opacity=".32"/>
      <path d="M545 262 L 380 470 L 740 470 L 575 262 Z" fill="#fff6c2" opacity=".35"/></g>
    <line x1="560" y1="0" x2="560" y2="218" stroke="${K}" stroke-width="4"/>
    <rect x="549" y="214" width="22" height="18" rx="3" fill="#9aa5b4" stroke="${K}" stroke-width="3"/>
    <circle class="lampada" cx="560" cy="250" r="18" stroke="${K}" stroke-width="4"/>
    <g class="trinca"><path d="M550 242 l 8 8 l -4 6 l 10 6" stroke="${K}" stroke-width="2.5" fill="none"/></g>
    <!-- escada -->
    <g stroke="${K}" stroke-width="6" stroke-linecap="round">
      <line x1="482" y1="466" x2="505" y2="350"/><line x1="560" y1="466" x2="537" y2="350"/>
      <line x1="493" y1="410" x2="549" y2="410"/><line x1="499" y1="380" x2="543" y2="380"/>
    </g><rect x="494" y="342" width="54" height="10" rx="3" fill="#9aa5b4" stroke="${K}" stroke-width="4"/>`;

  /* ---------- 3. CHUVEIRO · banheiro ---------- */
  const gotas = () => Array.from({ length: 9 }, (_, i) =>
    `<line class="gota" x1="${652 + i * 9}" y1="304" x2="${652 + i * 9}" y2="318" stroke="#4a7bd8" stroke-width="4" stroke-linecap="round" style="animation-delay:${(i % 4) * 0.18}s"/>`).join("");
  const chuveiro = () => `
    <defs><pattern id="azulejo" width="44" height="44" patternUnits="userSpaceOnUse">
      <rect width="44" height="44" fill="#d8eef5"/><path d="M44 0 V44 H0" stroke="#a9cfdc" stroke-width="3" fill="none"/></pattern></defs>
    <rect width="1200" height="470" fill="url(#azulejo)"/>${piso("#7aa6b8")}
    <!-- box de vidro e toalha -->
    <rect x="800" y="40" width="10" height="430" fill="#a9cfdc" stroke="${K}" stroke-width="3"/>
    <rect x="890" y="140" width="80" height="150" rx="8" fill="#f0595b" stroke="${K}" stroke-width="5"/>
    <rect x="870" y="130" width="120" height="14" rx="6" fill="#9aa5b4" stroke="${K}" stroke-width="4"/>
    <!-- cano, fiação e o chuveiro -->
    <rect x="684" y="0" width="16" height="230" fill="#9aa5b4" stroke="${K}" stroke-width="3"/>
    <path d="M610 0 V 262" stroke="#f0595b" stroke-width="5"/><path d="M620 0 V 262" stroke="${K}" stroke-width="5"/>
    <rect x="598" y="256" width="38" height="34" rx="5" fill="#fff" stroke="${K}" stroke-width="4"/>
    <path d="M636 273 H 650" stroke="${K}" stroke-width="5"/>
    <rect x="648" y="226" width="88" height="62" rx="16" fill="#fff" stroke="${K}" stroke-width="5"/>
    <ellipse cx="692" cy="296" rx="52" ry="12" fill="#d7dde5" stroke="${K}" stroke-width="5"/>
    <g class="agua">${gotas()}</g>
    <g class="vapor"><circle cx="660" cy="250" r="22" fill="#fff" opacity=".8"/><circle cx="720" cy="230" r="26" fill="#fff" opacity=".8"/><circle cx="780" cy="260" r="20" fill="#fff" opacity=".8"/></g>
    <!-- termômetro -->
    <g transform="translate(1040,210)"><rect x="-10" y="0" width="20" height="120" rx="10" fill="#fff" stroke="${K}" stroke-width="4"/>
      <circle cy="130" r="16" fill="#fff" stroke="${K}" stroke-width="4"/>
      <rect class="nivel" x="-4" y="40" width="8" height="90" fill="#4a7bd8"/><circle class="bulbo" cy="130" r="10" fill="#4a7bd8"/>
      <text class="so-antes" x="0" y="-14" text-anchor="middle" font-size="26" fill="${K}">?</text>
      <text class="so-ok" x="0" y="-14" text-anchor="middle" font-size="26" fill="#a32c2e">38 °C</text>
      <text class="so-falha" x="0" y="-14" text-anchor="middle" font-size="26" fill="#2f62c4">15 °C</text></g>
    <!-- banquinho -->
    <rect x="505" y="398" width="110" height="16" rx="5" fill="#ff9f43" stroke="${K}" stroke-width="4"/>
    <line x1="520" y1="412" x2="514" y2="466" stroke="${K}" stroke-width="7"/><line x1="600" y1="412" x2="606" y2="466" stroke="${K}" stroke-width="7"/>`;

  /* ---------- 4. DR 30 mA · cozinha ---------- */
  const dr = () => `
    <rect width="1200" height="470" fill="#fdf1d8"/>${piso("#c9b79c")}
    <rect x="700" y="360" width="290" height="100" rx="6" fill="#9a6a3a" stroke="${K}" stroke-width="5"/>
    <rect x="690" y="348" width="310" height="16" rx="4" fill="#d7dde5" stroke="${K}" stroke-width="4"/>
    <rect x="770" y="280" width="110" height="68" rx="8" fill="#5f6f86" stroke="${K}" stroke-width="5"/>
    <rect x="782" y="292" width="70" height="44" rx="4" fill="#22283a"/><circle class="micro" cx="866" cy="300" r="5" fill="#3fbf7f"/>
    <!-- geladeira com fuga para a carcaça -->
    <rect x="1010" y="190" width="150" height="272" rx="14" fill="#eef1f5" stroke="${K}" stroke-width="5"/>
    <line x1="1010" y1="290" x2="1160" y2="290" stroke="${K}" stroke-width="4"/><rect x="1028" y="230" width="10" height="40" rx="4" fill="${K}"/>
    <g class="fuga"><polyline points="1020,440 1000,452 1012,456 990,470" stroke="#ffd23f" stroke-width="5" fill="none" stroke-linejoin="round"/>
      <text x="980" y="440" text-anchor="end" font-size="20" fill="#a32c2e">fuga 40 mA</text></g>
    <!-- fiação: fase e neutro saindo do DR -->
    <path d="M640 330 V 150 H 1085 V 190" stroke="#f0595b" stroke-width="5" fill="none"/>
    <path d="M650 330 V 162 H 1075 V 190" stroke="#4a7bd8" stroke-width="5" fill="none"/>
    <text x="700" y="140" font-size="20" fill="#a32c2e">fase 10,00 A →</text>
    <text x="700" y="190" font-size="20" fill="#2f62c4">← neutro 9,96 A</text>
    <!-- caixa do DR -->
    <rect x="586" y="320" width="84" height="96" rx="8" fill="#5f6f86" stroke="${K}" stroke-width="4"/>
    <rect x="600" y="330" width="44" height="76" rx="5" fill="#fff" stroke="${K}" stroke-width="3"/>
    <rect x="612" y="342" width="20" height="36" rx="4" fill="${K}"/>
    <rect class="alavanca" x="614" y="344" width="16" height="16" rx="3" fill="#3fbf7f"/>
    <rect x="648" y="384" width="16" height="16" rx="3" fill="#ffd23f" stroke="${K}" stroke-width="2"/>
    <text x="656" y="397" text-anchor="middle" font-size="11" fill="${K}">T</text>
    <text x="640" y="438" text-anchor="middle" font-size="18" fill="${K}">DR 30 mA</text>
    <g class="escudo" transform="translate(-160,-150)"><path d="M300 210 L 360 230 L 360 290 Q 360 330 300 350 Q 240 330 240 290 L 240 230 Z" fill="#3fbf7f" stroke="${K}" stroke-width="5"/>
      <path d="M272 282 L 294 304 L 332 258" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="380" y="270" font-size="26" fill="#1b7a49">40 mA &gt; 30 mA</text>
      <text x="380" y="304" font-size="26" fill="#1b7a49">o DR desarmou a tempo</text></g>`;

  /* ---------- 5. ALIMENTADOR · entrada da casa ---------- */
  const alimentador = () => `
    <rect width="1200" height="470" fill="#8fd3e6"/><rect y="458" width="1200" height="52" fill="#8fcf5f"/>
    <g fill="#fff" opacity=".9"><ellipse cx="420" cy="70" rx="50" ry="18"/><ellipse cx="455" cy="58" rx="32" ry="18"/></g>
    <!-- poste e transformador -->
    <rect x="140" y="80" width="20" height="390" fill="#9a6a3a" stroke="${K}" stroke-width="5"/>
    <rect x="100" y="86" width="100" height="14" rx="3" fill="#9a6a3a" stroke="${K}" stroke-width="4"/>
    <rect x="166" y="140" width="44" height="60" rx="8" fill="#9aa5b4" stroke="${K}" stroke-width="5"/>
    <!-- casa -->
    <rect x="740" y="190" width="440" height="280" fill="#f6e3c2" stroke="${K}" stroke-width="6"/>
    <polygon points="720,196 960,70 1200,196" fill="#f0595b" stroke="${K}" stroke-width="6" stroke-linejoin="round"/>
    <rect class="janela" x="790" y="240" width="90" height="74" rx="6" stroke="${K}" stroke-width="5"/>
    <rect class="janela" x="1040" y="240" width="90" height="74" rx="6" stroke="${K}" stroke-width="5"/>
    <rect x="930" y="340" width="70" height="130" rx="6" fill="#4a7bd8" stroke="${K}" stroke-width="5"/>
    <!-- padrão de entrada com o quadro -->
    <rect x="600" y="400" width="46" height="70" fill="#c8754a" stroke="${K}" stroke-width="4"/>
    <rect x="586" y="320" width="76" height="82" rx="8" fill="#d7dde5" stroke="${K}" stroke-width="5"/>
    <rect x="600" y="334" width="48" height="24" rx="3" fill="#1f2a24"/>
    <text class="so-antes so-falha" x="624" y="351" text-anchor="middle" font-size="13" fill="#ff6b6b">0 A</text>
    <text class="so-ok" x="624" y="351" text-anchor="middle" font-size="13" fill="#7dffb0">25 A</text>
    <g class="so-ok"><rect x="200" y="380" width="300" height="44" rx="12" fill="#fff" stroke="${K}" stroke-width="4"/>
      <text x="350" y="410" text-anchor="middle" font-size="22" fill="${K}">J = i/A ≈ 4,2 × 10⁶ A/m²</text></g>
    <g class="so-falha"><rect x="200" y="380" width="300" height="44" rx="12" fill="#ffe3e3" stroke="${K}" stroke-width="4"/>
      <text x="350" y="410" text-anchor="middle" font-size="22" fill="#a32c2e">Efeito Joule: P = i²R</text></g>
    <path d="M662 360 H 740" stroke="${K}" stroke-width="6"/>
    <!-- o cabo alimentador: 6 mm², 25 A -->
    <path class="cabo" d="M200 100 Q 420 300 624 320" stroke="${K}" stroke-width="9" fill="none"/>
    <path class="fluxo" d="M200 100 Q 420 300 624 320" stroke="#ffd23f" stroke-width="5" fill="none" stroke-dasharray="16 18"/>
    <text x="300" y="150" font-size="22" fill="${K}">cobre 6 mm² · 25 A</text>`;

  return {
    1: { comodo: "sala de estar", alvo: 560, sobe: 0, desenho: tomadas,
         fx: faisca(613, 362) + fumaca(600, 320),
         ok: "Tomada instalada!", falha: "Bzzzt! Curto-circuito!" },
    2: { comodo: "quarto", alvo: 520, sobe: 120, desenho: iluminacao,
         fx: faisca(560, 250) + fumaca(570, 210),
         ok: "Luz no quarto!", falha: "A lâmpada queimou!" },
    3: { comodo: "banheiro", alvo: 560, sobe: 70, desenho: chuveiro,
         fx: faisca(617, 272) + fumaca(640, 220),
         ok: "Banho quente!", falha: "Ai! Água fria e choque!" },
    4: { comodo: "cozinha", alvo: 560, sobe: 0, desenho: dr,
         fx: faisca(1000, 452) + faisca(600, 360),
         ok: "O DR protegeu a casa!", falha: "Não desarmou: choque!" },
    5: { comodo: "entrada de energia", alvo: 560, sobe: 0, desenho: alimentador,
         fx: fumaca(420, 230) + fumaca(520, 280) + faisca(624, 320),
         ok: "Energia chegando!", falha: "O cabo esquentou!" },
  };
})();
