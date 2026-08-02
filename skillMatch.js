// arquivo para primeiro commit e criação da branch develop
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
      `Candidato: ${this.nome}\nÁrea: ${this.area}\nHabilidades: ${this.habilidades.join(", ")}\nExperiências: ${this.experiencias.join(", ")}\nTempo de total de experiência: ${this.tempoExperiencia} anos.`,
    );
  }
}

const candidato1 = new Candidato(
  "Loris Zucco Junior",
  "Desenvolvimento de Software",
  ["JavaScript", 
    "HTML", 
    "CSS", 
    "GIT/GITHUB"],
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
    "GIT/GITHUB",
  ],
  [
    "Desenvolvedor FullStack Sênior Google",
    "Desenvolvedor Fullstack Sênior Microsoft",
    "Desenvolvedor FullStack Sênior",
  ],
  25,
);

candidato1.describe();
console.log("----------------------------");
candidato2.describe();
