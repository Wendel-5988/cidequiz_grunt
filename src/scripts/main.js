const $startGameButton = document.querySelector(".start-quiz")
const $questionContainer = document.querySelector(".question-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionNext = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQUestionIndex = 0
let totalCorrect = 0

function startGame() {
    $startGameButton.classList.add("hide")
    $questionContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()
    
    if (questions.length == currentQUestionIndex) {
        return finishGame()
    }

    $questionNext.textContent = questions[currentQUestionIndex].question
    questions[currentQUestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerCLicked = event.target

    if (answerCLicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if(button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQUestionIndex++
}

function finishGame() {
    const totalQUestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQUestion)

    let message = ""

    switch (true) {
        case (performance >= 90):
            message = "Parabéns! Você gabaritou!"
            break
        case (performance >= 70):
            message = "Muito Bom! Da próxima você acerta todas e terá uma surpresa."
            break
        case (performance >= 50):
            message = "Bom!! Mas da pra melhorar."
            break    
        default:
            message = "Não prestou atenção em nada, né, véi?..."    
    }

    $questionContainer.innerHTML = 
    `

    <p class="final-message">
        <span>${message}</span>
        Acertou ${totalCorrect} de ${totalQUestion} questões!
    </p>
    <button onclick=window.location.reload() class="button">
        Refazer Quiz
    </button>
    `
}








const questions = [
    {
        question: "Quantos tipos de substantivo existem?" ,
        answers: [
            { text: "6", correct: false },
            { text: "7", correct: false },
            { text: "8", correct: false },
            { text: "9", correct: true }
        ]
    },
    {
        question: "'É aquele que designa seres de uma mesma espécie de forma genérica, sem especificar um indivíduo em particular' Essa é a definição do substantivo:" ,
        answers: [
            { text: "Simples", correct: false },
            { text: "Comum", correct: true },
            { text: "Próprio", correct: false },
            { text: "Composto", correct: false }
        ]
    },
    {
        question: "Qual das palavras a seguir é um substantivo Comum de dois gêneros?" ,
        answers: [
            { text: "Criança", correct: false },
            { text: "Anjo", correct: false },
            { text: "Amigo", correct: false },
            { text: "Colega", correct: true }
        ]
    },
    {
        question: "A palavra 'passatempo' é um substantivo:" ,
        answers: [
            { text: "Derivado", correct: false },
            { text: "Composto", correct: true },
            { text: "Simples", correct: false },
            { text: "Comum", correct: false }
        ]
    },
    {
        question: "Marque o substantivo concreto" ,
        answers: [
            { text: "Luz", correct: true },
            { text: "Calor", correct: false },
            { text: "Som", correct: false },
            { text: "Golpe", correct: false }
        ]
    },
    {
        question: "'Quando os radicais se juntam e, nesse processo, sofrem alterações' Gramaticalmente, essa é a definição de:" ,
        answers: [
            { text: "Modificação", correct: false },
            { text: "Justaposição", correct: false },
            { text: "Aglutinação", correct: true },
            { text: "Derivação", correct: false }
        ]
    },
    {
        question: "Qual das alternativas TODOS os substantivos são flexionados à gênero" ,
        answers: [
            { text: "Singular - Plural - Neutro", correct: false },
            { text: "Uniforme - Biforme - Primitivo", correct: false },
            { text: "Comum - Comum de dois gêneros", correct: false },
            { text: "Sobrecomum - Epiceno", correct: true }
        ]
    },
]