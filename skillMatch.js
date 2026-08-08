// ==========================================
// 1. CLASSES E HERANÇA (Critério: POO)
// ==========================================

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
Candidato: ${this.nome} | Área: ${this.area}
Habilidades: ${this.habilidades.join(", ")}
Tempo de Exp: ${this.tempoExperiencia} anos`;
    }
}

class Vaga {
    constructor(empresa, titulo, areaVaga, habilidadesNecessarias, tempoExpDesejado) {
        this.empelsea = empresa; // Corrigido de empelsea para empresa
        this.empresa = empresa;
        this.titulo = titulo;
        this.areaVaga = areaVaga;
        this.habilidadesNecessarias = habilidadesNecessarias;
        this.tempoExpDesejado = tempoExpDesejado;
    }

    describe() {
        return `Vaga: ${this.titulo} (${this.empresa}) | Necessário: ${this.habilidadesNecessarias.length} skills`;
    }
}

// Herança de Classes (Critério: Herança)
class VagaFrontEnd extends Vaga {
    constructor(empresa) {
        super(empresa, "Desenvolvedor Front-End Júnior", "Desenvolvimento Front-End", 
              ["HTML", "CSS", "JavaScript", "React", "Git/GitHub"], 2);
    }
}

class VagaAnaliseDados extends Vaga {
    constructor(empresa) {
        super(empresa, "Analista de Dados Júnior", "Análise de Dados", 
              ["Python", "SQL/NoSQL", "PostgreSQL", "Git/GitHub"], 2);
    }
}

class VagaFullStack extends Vaga {
    constructor(empresa) {
        super(empresa, "Desenvolvedor Full Stack Pleno", "Desenvolvimento de Software", 
              ["Java", "SpringBoot", "SQL/NoSQL", "JavaScript", "React"], 5);
    }
}

// ==========================================
// 2. SIMULAÇÃO DE API (Critério: Assincronismo)
// ==========================================

const buscarDadosDaAPI = () => {
    return new Promise((resolve, reject) => {
        console.log("⏳ Carregando dados do servidor...");
        setTimeout(() => {
            const vagasMock = [new VagaAnaliseDados("Sport Club Internacional"), new VagaFrontEnd("Mercado Livre"), new VagaFullStack("iFood")];
            const candidatosMock = [
                new Candidato("Loris Zucco Junior", "Desenvolvimento Front-End", ["JavaScript", "HTML", "CSS", "Git/GitHub"], ["Dev Jr Senai"], 2),
                new Candidato("Larry James", "Desenvolvimento Full Stack", ["JavaScript", "Java", "Python", "React", "CSS", "Git/GitHub"], ["Dev Sr Google"], 25)
            ];
            // Simular chance de erro para testar o try/catch
            const sucesso = true; 
            sucesso ? resolve({ vagas: vagasMock, candidatos: candidatosMock }) : reject("Erro ao conectar com a API");
        }, 2000);
    });
};

// =  =======================================
// 3. LÓGICA DE MATCH (Critério: Lógica e Métodos Array)
// ==========================================

function calcularSkillMatch(candidato, vaga) {
    // Uso de Filter e Includes (Critério: Manipulação de Arrays)
    const habilidadesCompativeis = vaga.habilidadesNecessarias.filter(h => candidato.habilidades.includes(h));
    const habilidadesFaltantes = vaga.habilidadesNecessarias.filter(h => !candidato.habilidades.includes(h));

    // Cálculo do percentual de habilidades (Peso 70%)
    const percentualHabilidades = (habilidadesCompativeis.length / vaga.habilidadesNecessarias.length) * 70;

    // Cálculo da Experiência (Peso 20%)
    const notaExperiencia = candidato.tempoExperiencia >= vaga.tempoExpDesejado ? 20 : 0;
    const experienciaAtende = candidato.tempoExperiencia >= vaga.tempoExpDesejado;

    // Cálculo da Área (Peso 10%)
    const areasCompativeis = {
        "Desenvolvimento Front-End": ["Desenlow, Desenvolvimento Full Stack"], // Simplificado para o exemplo
        "Desenvolvimento Full Stack": ["Desenvolvimento Front-End", "Desenvolvimento Back-End", "Desenvolvimento Full Stack"],
        "Análise de Dados": ["Análise de Dados"]
    };
    // Verificação simplificada de área
    const notaArea = (candidato.area === vaga.areaVaga || candidato.area === "Desenvolvimento Full Stack") ? 10 : 0;

    const percentualFinal = parseFloat((percentualHabilidades + notaExperiencia + notaArea).toFixed(1));

    // Classificação (Critério: Condicionais)
    let classificacao = "";
    if (percentualFinal >= 85) classificacao = "🟢 Excelente compatibilidade";
    else if (percentualFinal >= 60) classificacao = "🟡 Boa compatibilidade";
    else if (percentualFinal >= 40) classificacao = "🟠 Compatibilidade média";
    else classificacao = "🔴 Baixa compatibilidade";

    // Recomendação de Estudo (Critério: Lógica de Negócio)
    const recomendacao = habilidadesFaltantes.length > 0 
        ? `Estude: ${habilidadesFaltantes.slice(0, 2).join(", ")} para melhorar seu perfil.`
        : "Você já possui o perfil ideal para esta vaga!";

    return {
        candidato: candidato.nome,
        vaga: vaga.titulo,
        habilidadesCompativeis,
        habilidadesFaltantes,
        percentual: percentualFinal,
        experienciaAtende: experienciaAtende,
        classificacao,
        recomendacao
    };
}

// ==========================================
// 4. EXECUÇÃO PRINCIPAL (Critério: Async/Await e Try/Catch)
// ==========================================

async function executarSistema() {
    try {
        const dados = await buscarDadosDaAPI();
        console.log("✅ Dados carregados com sucesso!\n");

        dados.candidatos.forEach(candidato => {
            console.log(`--- Analisando Candidato: ${candidato.nome} ---`);
            
            dados.vagas.forEach(vaga => {
                const resultado = calcularSkillMatch(candidato, vaga);
                
                // Relatório formatado
                console.log(`
==================================================
            RELATÓRIO DE SKILL MATCH
==================================================
👤 Candidato: ${resultado.candidato}
💼 Vaga:      ${resultado.vaga}

------------------------------------------
✅ Compatíveis: ${resultado.habilidadesCompativeis.join(", ")}
❌ Faltantes:   ${resultado.habilidadesFaltantes.length > 0 ? resultado.habilidadesFaltantes.join(", ") : "Nenhuma"}
------------------------------------------
📊 Score Final: ${resultado.percentual}%
💪 Experiência: ${resultado.experienciaAtende ? "✅ Atende" : "❌ Não atende"}
🏷️ Classificação: ${resultado.classificacao}
💡 Recomendação: ${resultado.recomendacao}
==================================================\n`);
            });
        });

    } catch (error) {
        console.error("❌ ERRO CRÍTICO NO SISTEMA:", error);
    }
}

// Iniciar o programa
executarSistema();
