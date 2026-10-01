# Quadro Elétrico

Jogo de perguntas da **Etapa 3** da Atividade de Física II – Corrente Elétrica (Univille, Profª Jane M. R. Voigt).

Cada acerto rearma um circuito do quadro de distribuição. Com os 5 circuitos resolvidos, o disjuntor geral arma sozinho e a casa da família volta a ter energia.

A turma joga pelo celular: a cena fica na tela da sala, cada pessoa entra lendo um QR code, escreve o nome e responde no próprio aparelho. O placar atualiza ao vivo.

**Jogar:** https://campospedro719-design.github.io/quadro-eletrico/

## Como jogar na sala

1. Abra o jogo na tela da sala (projetor). Aparecem um **QR code** e um **código de 4 letras**.
2. Cada pessoa aponta a câmera do celular para o QR code, escreve o nome e toca em **Entrar**. Os nomes vão aparecendo no placar da tela grande.
   - Se a câmera não pegar o QR, dá para abrir `.../jogar.html` e digitar o código de 4 letras.
3. Quando a turma estiver dentro, clique em **▶ Iniciar partida**. O botão só libera depois que pelo menos uma pessoa entrar.
4. Uma contagem **5 · 4 · 3 · 2 · 1** toma a tela da sala e aparece também nos celulares.
5. A primeira questão abre sozinha, com **1 minuto** no cronômetro. Vale para todo mundo ao mesmo tempo.
6. A tela da sala mostra quantas pessoas já responderam. A questão se encerra sozinha quando **o minuto acaba** ou quando **todos já responderam** — o que vier primeiro.
7. Aparece a resolução e quem acertou. Cada acerto vale **10 pontos + até 5 de bônus por rapidez**.
8. **Consertar circuito e seguir** → o circuito é rearmado e a questão seguinte abre sozinha. Depois da quinta, a casa energiza.
9. **Reiniciar** zera o placar e o quadro, mantendo quem já entrou.

> O avanço entre as questões é no seu tempo: a resolução fica na tela até você clicar em **Consertar circuito e seguir**, para dar espaço de explicar.

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

| Nº | Circuito | Conceitos |
|---|---|---|
| 1 | Tomadas | Resistência, resistividade, condutividade |
| 2 | Iluminação | Gráfico V × i, resistor, efeito Joule, ddp |
| 3 | Chuveiro | Corrente, carga elétrica, carga elementar |
| 4 | DR 30 mA | Conservação da carga (lei dos nós) |
| 5 | Alimentador | Densidade de corrente, condutor, efeito Joule |

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | Tela da sala (projetor): a cena, o QR code, o placar e o controle das questões |
| `jogar.html` | Tela do celular: entra com o nome e responde |
| `classico.html` | Versão offline, com equipes marcadas na mão (plano B) |
| `config.js` | O único arquivo a editar: o endereço do banco de dados |
| `sala.js` | Sincronização entre a tela da sala e os celulares |
| `figuras.js` | Figuras das questões (o gráfico V × i), usadas pelas duas telas |
| `qr.svg` | QR code que abre o `jogar.html`; serve para projetar ou imprimir |

As respostas certas ficam só no `index.html`: os celulares recebem apenas o enunciado e as alternativas, e o gabarito só é liberado na hora de revelar.

## Grupo

Alessandro Campos · Derick Kuhn · Gustavo Petry · Pedro Campos Lofi · Pedro Henrique Cunha
