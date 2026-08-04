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
    console.log(
      `Candidato: ${this.nome}\nÁrea: ${this.area}\nHabilidades: ${this.habilidades.join(", ")}\nExperiências: ${this.experiencias.join(", ")}\nTempo total de experiência: ${this.tempoExperiencia} anos.`,
    );
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
  constructor(empresa,titulo, areaVaga, habilidadesNecessarias, 
    tempoExpDesejado,) {
      this.empresa = empresa;
      this.titulo = titulo;
      this.areaVaga = areaVaga;
      this.habilidadesNecessarias = habilidadesNecessarias;
      this.tempoExpDesejado = tempoExpDesejado;
    }
   describe() {
    return `
Descrição da vaga

Empresa: ${this.empresa}
Área: ${this.areaVaga}

Habilidades necessárias:
- ${this.habilidadesNecessarias.join("\n- ")}

Experiência desejada: ${this.tempoExpDesejado} anos
`;
}
}

// Vagas
const vaga1 =  new Vaga ("Sport Club Internacional","Analísta de dados Júnior", "Análise de dados", 
  ["Python","SQL/NoSQL","Git/GitHub", "PostgreSQL",], 2 )

  const vaga2 = new Vaga(
  "Mercado Livre","Desenvolvedor Front-end Junior", "Desenvolvimento Front-End", 
  [    "HTML", "CSS", "JavaScript", "React", "Git/GitHub", "Trello"
  ],2)

  const vaga3 =  new Vaga(
    "IFood", "Desenvolvedor FullStack Pleno", "Desenvolvimento de Software",[
      "Java", "SpringBoot","SQL/NoSQL","JavaScript", "HTML", "React","CSS","Bancos de dados Geoespaciais", "API's de Geolocalização","Git/GitHub"
    ],10)

const vagas = [vaga1, vaga2, vaga3]


// testes  
candidato1.describe();
console.log("----------------------------");
candidato2.describe();

vagas.forEach((vaga)=>{
  console.log(vaga.describe())
  console.log("--------------------------------------")
})
    
