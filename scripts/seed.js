const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
 
const pasta = path.join(__dirname, '..', 'data');
fs.mkdirSync(pasta, { recursive: true });
 
const db = new Database(path.join(pasta, 'rituais.db'));
 
db.exec(`
  DROP TABLE IF EXISTS rituais;
  CREATE TABLE rituais (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nome        TEXT NOT NULL,
    elemento    TEXT NOT NULL,
    circulo     TEXT NOT NULL,
    execucao    TEXT NOT NULL,
    alcance     TEXT NOT NULL,
    alvo        TEXT NOT NULL,
    duracao     TEXT NOT NULL,
    resistencia TEXT,
    descricao   TEXT NOT NULL,
    imagem      TEXT NOT NULL
  );
`);
 
// URLs das imagens hospedadas na wiki Ordem Paranormal (Fandom).
const wiki = 'https://static.wikia.nocookie.net/ordemparanormal/images';

const rituais = [
  ['Espirais da Perdição', 'Morte', 1, 'padrão', 'curto', '1 ser', 'cena', 'Vontade anula', 'Espirais surgem no corpo do alvo, tornando seus movimentos lentos. O alvo sofre -1d20 em testes de ataque.', `${wiki}/d/d3/S%C3%ADmbolo_Espirais_da_Perdi%C3%A7%C3%A3o.png/revision/latest/scale-to-width-down/400?cb=20230131222419&path-prefix=pt-br`],
  ['Distorcer Aparência', 'Sangue', 1, 'padrão',  'pessoal', 'você', 'cena', 'Vontade desacredita', 'Você modifica sua aparência de modo a parecer outra pessoa. Isso inclui, essencialmente, qualquer detalhe relevante. Você recebe +10 de Enganação para disfarce, mas não recebe nenhuma habilidade de sua nova forma.', `${wiki}/2/29/S%C3%ADmbolo_Distorcer_Apar%C3%AAncia.png/revision/latest/scale-to-width-down/400?cb=20221020232047&path-prefix=pt-br`],
  ['Inexistir', 'Conhecimento', 4, 'padrão', 'toque', '1 ser', 'instantânea', 'Vontade parcial', 'Você toca o alvo com intenção de apagá-lo da Realidade, reescrevendo seu corpo e sua mente para o nada. o alvo recebe 10d10+10 pontos de dano de Conhecimento, metade caso passe no teste de resistência', `${wiki}/5/5b/S%C3%ADmbolo_Inexistir.png/revision/latest/scale-to-width-down/400?cb=20221022050942&path-prefix=pt-br`],
  ['Tela de Ruído', 'Energia', 2, 'padrão', 'pessoal', 'você', 'instantânea', 'nenhuma', 'Você recebe 30 de PV temporário, apenas contra danos físicos.', `${wiki}/c/cf/S%C3%ADmbolo_Tela_de_Ru%C3%ADdo.png/revision/latest?cb=20240829211534&path-prefix=pt-br`],
  ['Cicatrização', 'Morte', 1, 'padrão', 'toque', '1 ser', 'instantânea', 'nenhuma', 'Você acelera o tempo ao redor das feridas do alvo, que cicatrizam instantaneamente. O alvo recupera 3d8+3 PV, mas envelhece 1 ano automaticamente.', `${wiki}/9/94/S%C3%ADmbolo_Cicatriza%C3%A7%C3%A3o.png/revision/latest/scale-to-width-down/400?cb=20221029020038&path-prefix=pt-br`],
  ['Decadência', 'Morte', 1, 'padrão', 'toque', '1 ser', 'instantânea', 'fortitude reduz à metade', 'Espirais de trevas envolvem a sua mão e definham o alvo, que sofre 2d8+2 pontos de dano de Morte.', `${wiki}/a/a0/S%C3%ADmbolo_Decad%C3%AAncia_Livro_de_Regras.png/revision/latest/scale-to-width-down/400?cb=20221111004550&path-prefix=pt-br`],
  ['Armadura de Sangue', 'Sangue', 1, 'padrão', 'pessoal', 'você', 'cena', 'nenhuma', 'Seu sangue escorre para fora do corpo, cobrindo-o sob a forma de uma carapaça que fornece +5 em Defesa. Esse bônus é cumulativo com outros rituais, mas não com bônus fornecido por equipamentos.', `${wiki}/6/6c/S%C3%ADmbolo_Armadura_de_Sangue.png/revision/latest/scale-to-width-down/400?cb=20221022182139&path-prefix=pt-br`],
  ['Ódio Incontrolável', 'Sangue', 1, 'padrão', 'toque', '1 pessoa', 'cena', 'nenhuma', 'O alvo entra em frenesi, aumentando sua agressividade e capacidade de luta. Ele recebe +2 em testes de ataque e rolagens de dano corpo a corpo e resistência a balístico, corte, impacto e perfuração 5. Enquanto o efeito durar, não pode fazer ações que exijam calma e concentração e deve sempre atacar um alvo em sua rodada, mesmo que seja um aliado.', `${wiki}/0/08/S%C3%ADmbolo_%C3%93dio_Incontrol%C3%A1vel.png/revision/latest/scale-to-width-down/400?cb=20211126134718&path-prefix=pt-br`],
  ['Enfeitiçar', 'Conhecimento', 1, 'padrão', 'curto', '1 ser', 'cena', 'vontade anula', 'Este ritual torna o alvo prestativo. Ele não fica sob seu controle, mas percebe suas palavras e ações da maneira mais favorável possível. Você recebe +10 em testes de Diplomacia com ele. Um alvo hostil ou envolvido em combate recebe +5 em testes de resistência.', `${wiki}/a/a2/S%C3%ADmbolo_Enfeiti%C3%A7ar.png/revision/latest/scale-to-width-down/400?cb=20221021185104&path-prefix=pt-br`],
  ['Ouvir Sussurros', 'Conhecimento', 1, 'completa', 'pessoal', 'você', 'instantânea', 'nenhuma', 'O ritual conecta você aos sussurros, memórias ecoadas pelo Outro Lado, que podem ser consultadas. Você faz uma pergunta sobre algo que pretende fazer em breve e recebe uma resposta com "sim", "não" ou "sim e não".', `${wiki}/5/5d/S%C3%ADmbolo_Comunica%C3%A7%C3%A3o_com_Esp%C3%ADritos.png/revision/latest/scale-to-width-down/400?cb=20211126133045&path-prefix=pt-br`],
  ['Eletrocussão', 'Energia', 1, 'padrão', 'curto', '1 ser ou objeto', 'instantânea', 'fortitude parcial', 'Você manifesta e dispara uma corrente elétrica contra o alvo, que sofre 3d6 pontos de dano de eletricidade e fica vulnerável por uma rodada. Se passar no teste de resistência, sofre apenas metade do dano e evita a condição. Se usado contra objetos eletrônicos, este ritual causa o dobro de dano e ignora a resistência.', `${wiki}/5/5b/S%C3%ADmbolo_Eletrocuss%C3%A3o.png/revision/latest/scale-to-width-down/400?cb=20221020232111&path-prefix=pt-br`]
];

const inserir = db.prepare(
  'INSERT INTO rituais (nome, elemento, circulo, execucao, alcance, alvo, duracao, resistencia, descricao, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);
 
for (const ritual of rituais) {
  inserir.run(...ritual);
}
 
console.log(`${rituais.length} rituais inseridos!`);
db.close();