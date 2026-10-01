/* ============================================================
   SALA — sincronização entre o projetor e os celulares.

   Conversa com o Firebase Realtime Database pela API REST
   (fetch + JSON). Não carrega SDK nem biblioteca externa:
   se o wifi da sala bloquear CDNs, isto continua funcionando.

   A leitura ao vivo é por consulta repetida (polling) em vez de
   streaming. É mais simples, aguenta queda de rede sem travar e,
   se der problema na hora, o erro aparece na tela em vez de
   deixar todo mundo esperando em silêncio.
   ============================================================ */
window.Sala = (function () {
  const base = () => String(window.CONFIG_DB || "").trim().replace(/\/+$/, "");
  const ligado = () => /^https?:\/\/.+\..+/.test(base()) || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(base());
  const url = (caminho) => `${base()}/${caminho}.json`;

  async function pedir(caminho, metodo, dados) {
    if (!ligado()) throw new Error("MODO_LOCAL");
    const opc = { method: metodo, cache: "no-store" };
    if (dados !== undefined) {
      opc.headers = { "Content-Type": "application/json" };
      opc.body = JSON.stringify(dados);
    }
    const r = await fetch(url(caminho), opc);
    if (!r.ok) throw new Error(`HTTP ${r.status} — ${(await r.text()).slice(0, 180)}`);
    const txt = await r.text();
    return txt ? JSON.parse(txt) : null;
  }

  const ler = (c) => pedir(c, "GET");
  const gravar = (c, d) => pedir(c, "PUT", d);      // substitui
  const mesclar = (c, d) => pedir(c, "PATCH", d);   // altera só os campos enviados
  const apagar = (c) => pedir(c, "DELETE");

  /* Consulta `caminho` a cada `intervalo` ms e chama onDados quando
     o conteúdo muda. Devolve uma função para parar.
     Falhas de rede não derrubam o laço: avisa e segue tentando. */
  function observar(caminho, onDados, onErro, intervalo = 1500) {
    let vivo = true, anterior = null, timer = null, ocupado = false;
    const tick = async () => {
      if (!vivo || ocupado) return;
      ocupado = true;
      try {
        const d = await ler(caminho);
        const agora = JSON.stringify(d === undefined ? null : d);
        if (agora !== anterior) { anterior = agora; onDados(d); }
        if (onErro) onErro(null);
      } catch (e) {
        if (onErro) onErro(e);
      } finally {
        ocupado = false;
      }
    };
    tick();
    timer = setInterval(tick, intervalo);
    return {
      parar() { vivo = false; clearInterval(timer); },
      agora: tick,
      ritmo(ms) { clearInterval(timer); timer = setInterval(tick, ms); }
    };
  }

  /* Código de sala de 4 letras. Sem vogais nem caracteres que se
     confundem lidos de longe (0/O, 1/I/L, 5/S), porque alguém vai
     ter que digitar isto olhando o projetor. */
  function novoCodigo() {
    const abc = "BCDFGHJKMNPQRTVWXYZ";
    let s = "";
    for (let i = 0; i < 4; i++) s += abc[Math.floor(Math.random() * abc.length)];
    return s;
  }

  function idJogador() {
    const k = "quadro:euId";
    let v = null;
    try { v = localStorage.getItem(k); } catch (e) { /* navegação privada */ }
    if (!v) {
      v = "j" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      try { localStorage.setItem(k, v); } catch (e) { /* segue sem memória */ }
    }
    return v;
  }

  return { ligado, base, ler, gravar, mesclar, apagar, observar, novoCodigo, idJogador };
})();
