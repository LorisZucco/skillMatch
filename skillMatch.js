// ============================================================
// SKILLMATCH JS
// Sistema de análise de compatibilidade entre candidatos e vagas
// ============================================================


// ============================================================
// 1. CLASSE CANDIDATO
// ============================================================

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
Candidato: ${this.nome}
Área: ${this.area}
Habilidades: ${this.habilidades.join(", ")}
Tempo de experiência: ${this.tempoExperiencia} anos
        `;

    }

}


// ============================================================
// 2. CLASSE VAGA
// ============================================================

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
Vaga: ${this.titulo}
Empresa: ${this.empresa}
Área: ${this.areaVaga}
Habilidades necessárias: ${this.habilidadesNecessarias.join(", ")}
Experiência desejada: ${this.tempoExpDesejado} anos
        `;

    }

}


// ============================================================
// 3. HERANÇA
// ============================================================

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
                "Git/GitHub"
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
                "Git/GitHub"
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
                "React"
            ],
            5
        );

    }

}


// ============================================================
// 4. SIMULAÇÃO DE API
// Promise + setTimeout
// ============================================================

function buscarDadosDaAPI() {

    return new Promise((resolve, reject) => {

        console.log("⏳ Carregando dados do servidor...");

        setTimeout(() => {

            const vagas = [

                new VagaAnaliseDados(
                    "Sport Club Internacional"
                ),

                new VagaFrontEnd(
                    "Mercado Livre"
                ),

                new VagaFullStack(
                    "iFood"
                )

            ];


            const candidatos = [

                new Candidato(
                    "Loris Zucco Junior",
                    "Desenvolvimento Front-End",
                    [
                        "JavaScript",
                        "HTML",
                        "CSS",
                        "Git/GitHub"
                    ],
                    [
                        "Dev Jr Senai"
                    ],
                    2
                ),

                new Candidato(
                    "Larry James",
                    "Desenvolvimento Full Stack",
                    [
                        "JavaScript",
                        "Java",
                        "Python",
                        "React",
                        "CSS",
                        "Git/GitHub"
                    ],
                    [
                        "Dev Sr Google"
                    ],
                    25
                )

            ];


            const sucesso = true;


            if (sucesso) {

                resolve({
                    vagas: vagas,
                    candidatos: candidatos
                });

            } else {

                reject(
                    new Error("Erro ao conectar com a API")
                );

            }

        }, 2000);

    });

}


// ============================================================
// 5. CÁLCULO DO SKILL MATCH
//
// Habilidades = 70%
// Experiência = 20%
// Área = 10%
// ============================================================

function calcularSkillMatch(candidato, vaga) {


    // --------------------------------------------------------
    // HABILIDADES COMPATÍVEIS
    // filter() + includes()
    // --------------------------------------------------------

    const habilidadesCompativeis =
        vaga.habilidadesNecessarias.filter(
            habilidade =>
                candidato.habilidades.includes(habilidade)
        );


    // --------------------------------------------------------
    // HABILIDADES FALTANTES
    // filter() + includes()
    // --------------------------------------------------------

    const habilidadesFaltantes =
        vaga.habilidadesNecessarias.filter(
            habilidade =>
                !candidato.habilidades.includes(habilidade)
        );


    // --------------------------------------------------------
    // PERCENTUAL DAS HABILIDADES
    // Peso: 70%
    // --------------------------------------------------------

    const percentualHabilidades =
        (
            habilidadesCompativeis.length /
            vaga.habilidadesNecessarias.length
        ) * 70;


    // --------------------------------------------------------
    // EXPERIÊNCIA
    // Peso: 20%
    // --------------------------------------------------------

    const experienciaAtende =
        candidato.tempoExperiencia >=
        vaga.tempoExpDesejado;


    const notaExperiencia =
        experienciaAtende ? 20 : 0;


    // --------------------------------------------------------
    // ÁREA
    // Peso: 10%
    // --------------------------------------------------------

    let notaArea = 0;


    if (candidato.area === vaga.areaVaga) {

        notaArea = 10;

    } else if (
        candidato.area === "Desenvolvimento Full Stack" &&
        vaga.areaVaga === "Desenvolvimento Front-End"
    ) {

        notaArea = 10;

    } else if (
        candidato.area === "Desenvolvimento Front-End" &&
        vaga.areaVaga === "Desenvolvimento de Software"
    ) {

        notaArea = 10;

    } else if (
        candidato.area === "Desenvolvimento Full Stack" &&
        vaga.areaVaga === "Desenvolvimento de Software"
    ) {

        notaArea = 10;

    }


    // --------------------------------------------------------
    // PERCENTUAL FINAL
    // --------------------------------------------------------

    const percentualFinal =
        parseFloat(
            (
                percentualHabilidades +
                notaExperiencia +
                notaArea
            ).toFixed(1)
        );


    // --------------------------------------------------------
    // CLASSIFICAÇÃO
    // --------------------------------------------------------

    let classificacao;


    if (percentualFinal >= 80) {

        classificacao = "🟢 Alta compatibilidade";

    } else if (percentualFinal >= 50) {

        classificacao = "🟡 Média compatibilidade";

    } else {

        classificacao = "🔴 Baixa compatibilidade";

    }


    // --------------------------------------------------------
    // RECOMENDAÇÃO
    // --------------------------------------------------------

    let recomendacao;


    if (habilidadesFaltantes.length > 0) {

        const habilidadesPrioritarias =
            habilidadesFaltantes
                .slice(0, 2)
                .join(", ");


        recomendacao =
            `Estude: ${habilidadesPrioritarias} para melhorar seu perfil.`;

    } else {

        recomendacao =
            "Você já possui todas as habilidades exigidas para esta vaga!";

    }


    // --------------------------------------------------------
    // RETORNO
    // --------------------------------------------------------

    return {

        candidato: candidato.nome,
        vaga: vaga.titulo,
        empresa: vaga.empresa,

        habilidadesCompativeis:
            habilidadesCompativeis,

        habilidadesFaltantes:
            habilidadesFaltantes,

        percentual:
            percentualFinal,

        experienciaAtende:
            experienciaAtende,

        classificacao:
            classificacao,

        recomendacao:
            recomendacao

    };

}


// ============================================================
// 6. MELHOR VAGA PARA UM CANDIDATO
//
// map() + reduce()
// ============================================================

function encontrarMelhorVaga(candidato, vagas) {


    const resultados =
        vagas.map(vaga => {

            return calcularSkillMatch(
                candidato,
                vaga
            );

        });


    const melhorVaga =
        resultados.reduce(
            (melhor, atual) => {

                return atual.percentual >
                    melhor.percentual
                    ? atual
                    : melhor;

            }
        );


    return melhorVaga;

}


// ============================================================
// 7. MELHOR CANDIDATO PARA UMA VAGA
//
// map() + reduce()
// ============================================================

function encontrarMelhorCandidato(vaga, candidatos) {


    const resultados =
        candidatos.map(candidato => {

            return calcularSkillMatch(
                candidato,
                vaga
            );

        });


    const melhorCandidato =
        resultados.reduce(
            (melhor, atual) => {

                return atual.percentual >
                    melhor.percentual
                    ? atual
                    : melhor;

            }
        );


    return melhorCandidato;

}


// ============================================================
// 8. RANKING DOS CANDIDATOS
//
// map()  -> calcula os resultados
// sort() -> organiza o ranking
// for()  -> percorre o ranking
// ============================================================

function gerarRankingCandidatos(vaga, candidatos) {


    const resultados =
        candidatos.map(candidato => {

            return calcularSkillMatch(
                candidato,
                vaga
            );

        });


    resultados.sort(
        (a, b) =>
            b.percentual - a.percentual
    );


    console.log("\n📊 RANKING DE CANDIDATOS");


    for (
        let i = 0;
        i < resultados.length;
        i++
    ) {

        const resultado =
            resultados[i];


        let medalha;


        if (i === 0) {

            medalha = "🥇";

        } else if (i === 1) {

            medalha = "🥈";

        } else if (i === 2) {

            medalha = "🥉";

        } else {

            medalha = `${i + 1}º`;

        }


        console.log(
            `${medalha} ${resultado.candidato} - ${resultado.percentual}%`
        );

    }


    return resultados;

}


// ============================================================
// 9. CLOSURE
// ============================================================

function criarContadorRelatorios() {


    let quantidadeRelatorios = 0;


    return function () {

        quantidadeRelatorios++;

        return quantidadeRelatorios;

    };

}


const contarRelatorios =
    criarContadorRelatorios();


// ============================================================
// 10. EXECUÇÃO PRINCIPAL
// async/await + try/catch + forEach()
// ============================================================

async function executarSistema() {


    try {


        const dados =
            await buscarDadosDaAPI();


        console.log(
            "\n✅ Dados carregados com sucesso!\n"
        );


        console.log(
            "=================================================="
        );

        console.log(
            "              SKILLMATCH JS"
        );

        console.log(
            "       ANÁLISE DE COMPATIBILIDADE"
        );

        console.log(
            "=================================================="
        );


        // ====================================================
        // ANÁLISE POR CANDIDATO
        // ====================================================

        dados.candidatos.forEach(candidato => {


            console.log(`

==================================================
👤 CANDIDATO: ${candidato.nome}
==================================================

📚 Área:
${candidato.area}

🛠️ Habilidades:
${candidato.habilidades.join(", ")}

⏱️ Experiência:
${candidato.tempoExperiencia} anos

--------------------------------------------------
ANÁLISE DAS VAGAS
--------------------------------------------------
            `);


            dados.vagas.forEach(vaga => {


                const resultado =
                    calcularSkillMatch(
                        candidato,
                        vaga
                    );


                const numeroRelatorio =
                    contarRelatorios();


                console.log(`

📄 Relatório #${numeroRelatorio}

💼 Vaga:
${resultado.vaga}

🏢 Empresa:
${resultado.empresa}

📊 Score Final:
${resultado.percentual}%

💪 Experiência:
${
    resultado.experienciaAtende
        ? "✅ Atende ao requisito"
        : "❌ Não atende ao requisito"
}

🏷️ Classificação:
${resultado.classificacao}

✅ Habilidades compatíveis:
${
    resultado.habilidadesCompativeis.length > 0
        ? resultado.habilidadesCompativeis.join(", ")
        : "Nenhuma"
}

❌ Habilidades faltantes:
${
    resultado.habilidadesFaltantes.length > 0
        ? resultado.habilidadesFaltantes.join(", ")
        : "Nenhuma"
}

💡 Recomendação:
${resultado.recomendacao}

--------------------------------------------------
                `);

            });


            // ------------------------------------------------
            // MELHOR VAGA PARA O CANDIDATO
            // ------------------------------------------------

            const melhorVaga =
                encontrarMelhorVaga(
                    candidato,
                    dados.vagas
                );


            console.log(`

🏆 MELHOR VAGA PARA ${candidato.nome}

💼 Vaga:
${melhorVaga.vaga}

🏢 Empresa:
${melhorVaga.empresa}

📊 Maior aderência:
${melhorVaga.percentual}%

🏷️ Classificação:
${melhorVaga.classificacao}

==================================================
            `);

        });


        // ====================================================
        // ANÁLISE POR VAGA
        // ====================================================

        console.log(`

==================================================
🏆 ANÁLISE POR VAGA
==================================================
        `);


        dados.vagas.forEach(vaga => {


            console.log(`

==================================================
💼 VAGA: ${vaga.titulo}
🏢 EMPRESA: ${vaga.empresa}
📚 ÁREA: ${vaga.areaVaga}
==================================================
            `);


            // ------------------------------------------------
            // RANKING
            // ------------------------------------------------

            gerarRankingCandidatos(
                vaga,
                dados.candidatos
            );


            // ------------------------------------------------
            // MELHOR CANDIDATO
            // ------------------------------------------------

            const melhorCandidato =
                encontrarMelhorCandidato(
                    vaga,
                    dados.candidatos
                );


            console.log(`

🏆 MELHOR CANDIDATO PARA ESTA VAGA

👤 Candidato:
${melhorCandidato.candidato}

📊 Compatibilidade:
${melhorCandidato.percentual}%

💪 Experiência:
${
    melhorCandidato.experienciaAtende
        ? "✅ Atende ao requisito"
        : "❌ Não atende ao requisito"
}

🏷️ Classificação:
${melhorCandidato.classificacao}

💡 Recomendação:
${melhorCandidato.recomendacao}

==================================================
            `);

        });


        // ====================================================
        // RESUMO FINAL
        // ====================================================

        console.log(`

==================================================
📋 RESUMO FINAL
==================================================
        `);


        dados.candidatos.forEach(candidato => {


            const melhorVaga =
                encontrarMelhorVaga(
                    candidato,
                    dados.vagas
                );


            console.log(`
👤 ${candidato.nome}

🏆 Melhor oportunidade:
${melhorVaga.vaga}

🏢 Empresa:
${melhorVaga.empresa}

📊 Compatibilidade:
${melhorVaga.percentual}%

🏷️ Classificação:
${melhorVaga.classificacao}

--------------------------------------------------
            `);

        });


        console.log(
            "=================================================="
        );


        console.log(
            "\n✅ Análise concluída com sucesso!"
        );


    } catch (error) {


        console.error(
            "\n❌ ERRO CRÍTICO NO SISTEMA:",
            error
        );

    }

}


// ============================================================
// 11. INICIAR O PROGRAMA
// ============================================================

executarSistema();