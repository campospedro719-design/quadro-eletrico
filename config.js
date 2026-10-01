/* ============================================================
   CONFIGURAÇÃO — este é o ÚNICO arquivo que você precisa editar.

   Cole abaixo, entre as aspas, o endereço do seu Firebase
   Realtime Database. Ele tem esta cara:

     https://quadro-eletrico-xxxxx-default-rtdb.firebaseio.com

   Enquanto estiver vazio, o jogo funciona em MODO LOCAL:
   tudo roda numa só tela, sem celulares e sem placar ao vivo.
   ============================================================ */

window.CONFIG_DB = "https://quadro-eletrico-85799-default-rtdb.firebaseio.com";

/* Meta da turma: a casa só volta a ter luz se a sala inteira, somada,
   acertar pelo menos esta fração das questões (0.45 = 45%).
   Quem deixa o minuto acabar sem responder conta como erro. */
window.META_TURMA = 0.45;
