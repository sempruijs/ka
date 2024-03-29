// --- Constants and varibels ---

const ASPECT_URL = "content/kenmerkendeAspecten.json"
let SELECTED_CHAPTERS: Array<number> = []
let CHAPTERS: Array<Chapter> | null = null
let showingCorrectness = false
let order: Array<Aspect> | null = null
let currentIndex = 0
let uimode: UIMode = UIMode.ChapterSelect
let learnMode: LearnMode = LearnMode.Id




// --- State ---

function setAspect(): void {
    if (currentIndex < order.length - 1) {
        currentIndex++
    } else {
        order = generateNewOrder(order)
        currentIndex = 0
    }
}

function setUIMode(mode: UIMode) {
    uimode = mode
}

function setLearningMode(mode: LearnMode): void {
    learnMode = mode
}

function setChapter(checkbox: HTMLInputElement) {
    const chapterIndex = Number(checkbox.id)
    if (checkbox.checked) {
        SELECTED_CHAPTERS.push(chapterIndex)
        order = shuffle(listAspectsFromChapters(indexesToChapters(SELECTED_CHAPTERS, CHAPTERS)))
    } else {
        const index = SELECTED_CHAPTERS.indexOf(chapterIndex, 0);
        SELECTED_CHAPTERS.splice(index, 1);

        if (index > 0) {
            order = shuffle(listAspectsFromChapters(indexesToChapters(SELECTED_CHAPTERS, CHAPTERS)))
        }
    }
    showAbleToLearnState(SELECTED_CHAPTERS.length > 0)
}

function startLearning(mode: LearnMode) {
    const allowLearning = SELECTED_CHAPTERS.length > 0
    showingChapterSelectError(!allowLearning)
    if (allowLearning) {
        setLearningMode(mode)
        renderNewAspect(order[currentIndex], learnMode)
        setUIMode(UIMode.Learning)
        renderUIMode(uimode)
    }
}

function backToChapterSelect(): void {
    setUIMode(UIMode.ChapterSelect)
    renderUIMode(uimode)
}

// --- Runtime ---

getChapters(ASPECT_URL)
    .then((chapters: [Chapter]) => {
        CHAPTERS = chapters
        renderUIMode(uimode)
        renderChapterselect(CHAPTERS)
    })

// Runs when the user presses enter
function answerTextfieldOnEnter(event: KeyboardEvent): void {
    if (event.key == "Enter") {
        const userInput = (document.getElementById("answerTextfield") as HTMLInputElement).value
        clearTextField()

        if (!showingCorrectness) {
            showingCorrectness = true
            showCorrectness(userInput, learnMode, order[currentIndex])
            setAspect()
        } else {
            showingCorrectness = false
            hideCorrectness()
            renderNewAspect(order[currentIndex], learnMode)
        }
    }
}

