// Class Candidato
class Candidato {
  constructor(nome, area, habilidades, experiencias, tempoExperiencia) {
    this.nome = nome;
    this.area = area;
    this.habilidades = habilidades;
    this.experiencias = experiencias;
    this.tempoExperiencia = tempoExperiencia;
  }
 describe() {
  return `
==============================
Candidato: ${this.nome}
Área: ${this.area}

Habilidades:
- ${this.habilidades.join("\n- ")}

Experiências:
- ${this.experiencias.join("\n- ")}

Tempo total de experiência: ${this.tempoExperiencia} anos
`;
}
}
// Candidatos
const candidato1 = new Candidato(
  "Loris Zucco Junior",
  "Desenvolvimento de Software",
  ["JavaScript", 
    "HTML", 
    "CSS", 
    "Git/GitHub"],
  [
    "Desenvolvedor Júnior FrontEnd Senai etapa despertar",
    "Desenvolvedor Júnior FrontEnd Senai etapa profissionalizar",
  ],
  2,
);

const candidato2 = new Candidato(
  "Larry James",
  "Desenvolvimento de Software",
  [
    "JavaScript",
    "Java",
    "Python",
    "Assembly",
    "C++",
    "HTML",
    "React",
    "SpringBoot",
    "SQL/NoSQL",
    "CSS",
    "Git/GitHub",
  ],
  [
    "Desenvolvedor FullStack Sênior Google",
    "Desenvolvedor Fullstack Sênior Microsoft",
    "Desenvolvedor FullStack Sênior",
  ],
  25,
);

// Class Vaga
class Vaga {
  constructor(
    empresa,
    titulo,
    areaVaga,
    habilidadesNecessarias,
    tempoExpDesejado
  ) {
    this.empresa = empresa;
    this.titulo = titulo;
    this.areaVaga = areaVaga;
    this.habilidadesNecessarias = habilidadesNecessarias;
    this.tempoExpDesejado = tempoExpDesejado;
  }

  describe() {
    return `
==============================
Empresa: ${this.empresa}
Cargo: ${this.titulo}
Área: ${this.areaVaga}

Habilidades necessárias:
- ${this.habilidadesNecessarias.join("\n- ")}

Experiência desejada: ${this.tempoExpDesejado} anos
`;
  }
}

class VagaFrontEnd extends Vaga {
  constructor(empresa) {
    super(
      empresa,
      "Desenvolvedor Front-End Júnior",
      "Desenvolvimento Front-End",
      [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Git/GitHub",
        "Trello",
      ],
      2
    );
  }
}
class VagaAnaliseDados extends Vaga {
  constructor(empresa) {
    super(
      empresa,
      "Analista de Dados Júnior",
      "Análise de Dados",
      [
        "Python",
        "SQL/NoSQL",
        "PostgreSQL",
        "Git/GitHub",
      ],
      2
    );
  }
}
class VagaFullStack extends Vaga {
  constructor(empresa) {
    super(
      empresa,
      "Desenvolvedor Full Stack Pleno",
      "Desenvolvimento de Software",
      [
        "Java",
        "SpringBoot",
        "SQL/NoSQL",
        "JavaScript",
        "HTML",
        "CSS",
        "React",
        "Git/GitHub",
        "APIs REST",
      ],
      5
    );
  }
}
// Vagas
const vaga1 = new VagaAnaliseDados(
  "Sport Club Internacional"
);

const vaga2 = new VagaFrontEnd(
  "Mercado Livre"
);

const vaga3 = new VagaFullStack(
  "iFood"
);
//arrays contendo os elementos para Aplicação do match
const vagas = [vaga1, vaga2, vaga3];
const candidatos = [candidato1, candidato2];


// testes  
candidatos.forEach((candidato) => {
    console.log(candidato.describe());
    console.log("--------------------------------------");
});

vagas.forEach((vaga) => {
    console.log(vaga.describe());
    console.log("--------------------------------------");
});

// functions
function calcularSkillMatch(candidato, vaga) {

    // Habilidades compatíveis
    const habilidadesCompativeis =
        vaga.habilidadesNecessarias.filter((habilidade) => {
            return candidato.habilidades.includes(habilidade);
        });

    // Habilidades que faltam
    const habilidadesFaltantes =
        vaga.habilidadesNecessarias.filter((habilidade) => {
            return !candidato.habilidades.includes(habilidade);
        });

    // Percentual baseado nas habilidades
    const percentual =
        (habilidadesCompativeis.length /
            vaga.habilidadesNecessarias.length) * 100;

    // Verifica experiência
    const experienciaCompativel =
        candidato.tempoExperiencia >= vaga.tempoExpDesejado;

    // Classificação
    let classificacao = "";

    if (percentual >= 90) {
        classificacao = "🟢 Excelente compatibilidade";
    }
    else if (percentual >= 70) {
        classificacao = "🟢 Boa compatibilidade";
    }
    else if (percentual >= 50) {
        classificacao = "🟡 Compatibilidade média";
    }
    else {
        classificacao = "🔴 Baixa compatibilidade";
    }

    // Objeto de retorno
    const resultado = {
        candidato: candidato.nome,
        vaga: vaga.titulo,
        habilidadesCompativeis,
        habilidadesFaltantes,
        percentual: percentual.toFixed(1),
        experienciaCompativel,
        classificacao
    };

    // Relatório
    console.log(`
==================================================
            RELATÓRIO DE SKILL MATCH
==================================================

👤 Candidato:
${resultado.candidato}

💼 Vaga:
${resultado.vaga}

------------------------------------------
Habilidades compatíveis
------------------------------------------
- ${resultado.habilidadesCompativeis.join("\n- ")}

------------------------------------------
Habilidades a desenvolver
------------------------------------------
- ${resultado.habilidadesFaltantes.join("\n- ")}

------------------------------------------
Compatibilidade
------------------------------------------
✔ Percentual: ${resultado.percentual}%

✔ Experiência mínima:
${resultado.experienciaCompativel ? "Atende ao requisito" : "Não atende ao requisito"}

✔ Classificação:
${resultado.classificacao}

==================================================
`);

    return resultado;
}