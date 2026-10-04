# Quadro Elétrico

Jogo de perguntas da **Etapa 3** da Atividade de Física II – Corrente Elétrica (Univille, Profª Jane M. R. Voigt).

A sala inteira joga junta contra uma **meta coletiva**: se a turma, somada, acertar pelo menos **45%** das respostas, o disjuntor geral arma e a casa da família volta a ter energia. Abaixo disso, o geral desarma e a casa fica no escuro.

A turma joga pelo celular: a cena fica na tela da sala, cada pessoa entra lendo um QR code, escreve o nome e responde no próprio aparelho. O placar atualiza ao vivo.

**Jogar:** https://campospedro719-design.github.io/quadro-eletrico/

## Como jogar na sala

1. Abra o jogo na tela da sala (projetor). Aparecem um **QR code** e um **código de 4 letras**.
2. Cada pessoa aponta a câmera do celular para o QR code, escreve o nome e toca em **Entrar**. Os nomes vão aparecendo no placar da tela grande.
   - Se a câmera não pegar o QR, dá para abrir `.../jogar.html` e digitar o código de 4 letras.
3. Quando a turma estiver dentro, clique em **▶ Iniciar partida**. O botão só libera depois que pelo menos uma pessoa entrar.
4. Uma contagem **5 · 4 · 3 · 2 · 1** toma a tela da sala e aparece também nos celulares.
5. **Todo mundo responde a mesma questão ao mesmo tempo.** Ela aparece na tela da sala e nos celulares, com **1 minuto**. Não existe botão de pular: depois de responder, o celular espera.
6. A questão fecha sozinha quando **o tempo acaba** ou quando **todos responderam**. Aí aparece o resultado, na tela da sala e nos celulares: cada alternativa (A, B, C, D) ganha uma barra com a **% da turma** que escolheu aquela opção, e a certa fica em **verde forte**. Quem não respondeu conta no total como erro. A tela da sala mostra também a resolução.
7. Depois de **7 segundos**, abre a **cena do circuito** (10 s), num cômodo da casa. Se a maioria acertou, o eletricista conserta; se a maioria errou, leva o choque:

   | Circuito | Cômodo | Deu certo | Deu errado |
   |---|---|---|---|
   | Tomadas | sala de estar | instala a tomada e o abajur acende | curto-circuito, faísca e fumaça |
   | Iluminação | quarto | sobe na escada, troca a lâmpada e o quarto acende | a lâmpada pisca e queima |
   | Chuveiro | banheiro | água quente, vapor, 38 °C | água fria (15 °C) e choque |
   | DR 30 mA | cozinha | o DR desarma com a fuga de 40 mA e protege a casa | o DR não desarma: choque |
   | Alimentador | entrada de energia | a energia corre pelo cabo e as janelas acendem | o cabo esquenta (efeito Joule) |

   Em seguida vem a próxima questão, sozinha.
8. Depois da 5ª cena, o jogo soma os acertos da sala inteira e tenta armar o disjuntor geral:
   - **turma ≥ 45%** → a casa energiza;
   - **turma < 45%** → o geral desarma, os circuitos caem de novo e a casa continua no escuro.
9. Depois aparece o **relatório da turma**: o medidor com o % de acerto contra a meta, uma tabela com a marcação de cada pessoa em cada questão, o gabarito, a pontuação, uma linha com o % de acerto da turma em cada questão, e depois o enunciado e a resolução de cada uma. Os celulares mostram se a luz voltou e o resultado de cada um.
10. **Reiniciar** zera tudo, mantendo quem já entrou. **Ver relatório** reabre a tabela.

> Se alguém largar o celular no meio e travar a turma, **Encerrar agora** fecha a prova e mostra o resultado com o que já foi respondido.

### Meta da turma

A conta é **acertos da sala inteira ÷ (pessoas × 5 questões)**. Quem deixa o minuto acabar sem responder conta como erro. Exemplo: 20 pessoas → 100 respostas → precisa de pelo menos 45 certas.

A meta fica no `config.js` (`window.META_TURMA = 0.45`). Para mudar para 50%, por exemplo, troque para `0.5`.

A linha **acerto da turma** do relatório mostra o % de cada questão: em verde as que ficaram acima da meta, em vermelho as que ficaram abaixo. Serve para ver qual conceito precisa ser retomado.

### Pontuação individual (ranking)

Cada acerto vale **10 pontos + até 5 de bônus por rapidez** (quanto mais rápido dentro do minuto, maior o bônus). A conta só é feita no fim — durante a prova o placar não existe para ninguém.

## Ligar o placar ao vivo (uma vez só)

O GitHub Pages só entrega arquivos, não sincroniza nada. Para os celulares conversarem com a tela da sala é preciso um banco de dados gratuito:

1. Entre em https://console.firebase.google.com e clique em **Adicionar projeto** (nome livre, pode desligar o Google Analytics).
2. No menu da esquerda: **Criar** → **Realtime Database** → **Criar banco de dados**. Escolha a região e comece em **modo de teste**.
3. Copie o endereço que aparece no topo, parecido com `https://seu-projeto-default-rtdb.firebaseio.com`.
4. Cole esse endereço no arquivo `config.js`, entre as aspas, e envie para o GitHub.
5. Na aba **Regras** do Realtime Database, use:

```json
{
  "rules": {
    "salaAtiva": { ".read": true, ".write": true },
    "salas":     { ".read": true, ".write": true }
  }
}
```

⚠️ Essas regras deixam o banco **aberto**: qualquer pessoa que descubra o endereço pode ler e escrever ali. Para um jogo de sala de aula está de bom tamanho, mas não guarde nada pessoal nesse projeto do Firebase.

Enquanto o `config.js` estiver vazio, o jogo avisa na tela e funciona em **modo local** — só na tela da sala, sem celulares.

## Se a internet falhar na hora

Abra **`classico.html`**. É a versão original, que roda offline: a turma se divide em 4 equipes com plaquinhas A/B/C/D, e quem apresenta marca na mão quem acertou. Não depende de celular, de wifi nem do Firebase.

## Questões

| Nº | Circuito | Conceito explicado | Pergunta | Resposta |
|---|---|---|---|---|
| 1 | Tomadas | R = ρ·L/A | Fio de 2,5 mm² ou de 6 mm²: qual tem menor resistência? | 6 mm² |
| 2 | Iluminação | Resistor ôhmico | No gráfico V × i, qual componente é ôhmico? | Apenas o A (reta) |
| 3 | Chuveiro | Efeito Joule | O que faz a resistência do chuveiro esquentar a água? | Colisões dos elétrons: energia elétrica vira calor |
| 4 | DR 30 mA | Lei dos nós | Quando o DR desarma? | Quando volta menos corrente pelo neutro (fuga) |
| 5 | Alimentador | i = Δq/Δt e P = R·i² | 0,2 Ω, 1200 C em 1 min: qual a potência dissipada? | 80 W |

As questões 1 a 4 são conceituais, sem cálculo. A questão 5 é a única de cálculo.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | Tela da sala (projetor): a cena, o QR code, o placar e o controle das questões |
| `jogar.html` | Tela do celular: entra com o nome e responde |
| `classico.html` | Versão offline, com equipes marcadas na mão (plano B) |
| `config.js` | O único arquivo a editar: o endereço do banco de dados e a meta da turma |
| `sala.js` | Sincronização entre a tela da sala e os celulares |
| `figuras.js` | Figuras das questões (o gráfico V × i), usadas pelas duas telas |
| `cenas.js` | As 5 cenas dos circuitos (cômodos da casa), mostradas depois de cada questão |
| `qr.svg` | QR code que abre o `jogar.html`; serve para projetar ou imprimir |

As respostas certas ficam só no `index.html`: os celulares recebem apenas o enunciado e as alternativas, e o gabarito só é liberado na hora de revelar.

## Grupo

Alessandro Campos · Derick Kuhn · Gustavo Petry · Pedro Campos Lofi · Pedro Henrique Cunha
