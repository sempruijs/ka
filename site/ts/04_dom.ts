function clearTextField(): void {
    let textField = (document.getElementById("answerTextfield") as HTMLInputElement)
    textField.value = ""
}


function hideCorrectness(): void {
    clearColorCorrectness()
    document.getElementById("correctness").innerHTML = ""
}

function showCorrectness(userInput: string, mode: LearnMode, aspect: Aspect): void {
    const correctness = isCorrect(aspect, userInput, mode)
    const message = messageAboutCorrectness(correctness, aspect, mode)
    showCorrectnessWithColor(correctness)

    document.getElementById("correctness").innerHTML = message
}

function showCorrectnessWithColor(correctness: boolean): void {
    let learningContainer = document.getElementById("body")
    learningContainer.className = correctness ? "correct-answer" : "incorrect-answer"
}

function clearColorCorrectness(): void {
    let learningContainer = document.getElementById("body")
    learningContainer.className = ""
}

function renderNewAspect(aspect: Aspect, mode: LearnMode): void {
    const renderText = mode == LearnMode.Id ? aspect.value : aspect.id
    document.getElementById("question").innerHTML = renderText
}

function renderUIMode(mode: UIMode): void {
    const learningClass = mode == UIMode.ChapterSelect ? "hidden" : ""
    const chapterSelectClass = mode == UIMode.ChapterSelect ? "" : "hidden"

    document.getElementById("chapter-select-container").className = chapterSelectClass
    document.getElementById("learning-container").className = learningClass
}

function showingChapterSelectError(visable: boolean): void {
    document.getElementById("error").innerHTML = visable ? "Selecteer minstens 1 hoofdstuk" : ""
}

function showAbleToLearnState(ableToLearn: boolean): void {
    // document.getElementById("start-learning").className = ableToLearn ? "highlighted-button" : ""
    const buttons = document.querySelectorAll(".start-learning")
    // buttons.forEach( button => {button.className = ableToLearn ? "highlighted-button" : "" + " start-learning"})
    const highlightString = ableToLearn ? "highlighted-button" : ""
    buttons.forEach(button => { button.className = "start-learning " + highlightString })
}


function renderChapterselect(chapters: Array<Chapter>) {
    const container = document.getElementById("checkbox-container")
    const ul = document.createElement("ul")

    for (let i = 0; i < chapters.length; i++) {
        const li = document.createElement("li")
        // create checkbox
        const checkbox = document.createElement("input")
        checkbox.id = i.toString()
        checkbox.className = "chapter-checkbox"
        checkbox.type = "checkbox"
        checkbox.setAttribute("onclick", "setChapter(this)")

        // create label for checkbox
        const label = document.createElement("label")
        label.setAttribute("for", i.toString())
        label.innerHTML = chapters[i].title


        li.appendChild(checkbox)
        li.appendChild(label)

        ul.appendChild(li)
    }

    container.appendChild(ul)
}
