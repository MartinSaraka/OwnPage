<template>
  <section class="dev-games">
    <div class="games-header">
      <h2>🎮 Programmer's Playground</h2>
      <p>Choose your challenge and prove your coding skills!</p>
    </div>
    
    <div class="games-tabs">
      <button 
        v-for="(game, index) in games" 
        :key="index"
        @click="activeGame = index"
        :class="['tab-btn', { active: activeGame === index }]"
      >
        {{ game.emoji }} {{ game.name }}
      </button>
    </div>

    <!-- Game 1: Bug Hunt -->
    <div v-if="activeGame === 0" class="game-container">
      <div class="game-header">
        <h3>🐛 Bug Hunt Challenge</h3>
        <div class="game-stats">
          <span>Score: {{ bugGame.score }}/{{ bugGame.totalBugs }}</span>
          <span>Time: {{ bugGame.timeLeft }}s</span>
          <span>Errors: {{ bugGame.errors }}/1</span>
          <span class="bugs-remaining">Bugs: {{ bugGame.totalBugs - bugGame.score }} left</span>
        </div>
      </div>
      
      <div class="bug-game">
        <div v-if="!bugGame.active && !bugGame.started" class="game-start">
          <h4>🔍 Find and squash the bugs!</h4>
          <p>Click on code snippets that contain bugs before time runs out</p>
          <p class="warning">⚠️ You can make <strong>1 mistake</strong> - second wrong click ends the game!</p>
          <button @click="startBugGame" class="start-btn">Start Hunting</button>
        </div>
        
        <div v-if="bugGame.active" class="code-grid">
          <div 
            v-for="snippet in bugGame.codeSnippets" 
            :key="snippet.id"
            @click="checkBug(snippet)"
            :class="['code-snippet', { 
              bug: snippet.hasBug, 
              clicked: snippet.clicked,
              correct: snippet.clicked && snippet.hasBug,
              wrong: snippet.clicked && !snippet.hasBug
            }]"
          >
            <pre>{{ snippet.code }}</pre>
          </div>
        </div>
        
        <div v-if="bugGame.gameOver" class="game-over">
          <h4 v-if="bugGame.gameOverReason === 'error'">💥 Game Over!</h4>
          <h4 v-else-if="bugGame.gameOverReason === 'time'">⏰ Time's Up!</h4>
          <h4 v-else-if="bugGame.gameOverReason === 'complete'">🎯 Perfect Hunt!</h4>
          <h4 v-else>🎯 Hunt Complete!</h4>
          
          <p v-if="bugGame.gameOverReason === 'error'" class="error-msg">
            You made 2 mistakes! Game over - you can only make 1 wrong click.
          </p>
          <p v-else-if="bugGame.gameOverReason === 'time'" class="timeout-msg">
            Time ran out! You found {{ bugGame.score }}/{{ bugGame.totalBugs }} bugs.
          </p>
          <p v-else-if="bugGame.gameOverReason === 'complete'" class="success-msg">
            Excellent! All {{ bugGame.totalBugs }} bugs found with {{ bugGame.errors }} errors.
          </p>
          <p v-else>Bugs Found: {{ bugGame.score }}/{{ bugGame.totalBugs }}</p>
          
          <button @click="resetBugGame" class="restart-btn">Hunt Again</button>
        </div>
      </div>
    </div>

    <!-- Game 2: Type Speed Test -->
    <div v-if="activeGame === 1" class="game-container">
      <div class="game-header">
        <h3>⌨️ Code Typing Challenge</h3>
        <div class="game-stats">
          <span>WPM: {{ typeGame.wpm }}</span>
          <span>Accuracy: {{ typeGame.accuracy }}%</span>
          <span>Time: {{ typeGame.timeLeft }}s</span>
        </div>
      </div>
      
      <div class="type-game">
        <div v-if="!typeGame.active && !typeGame.started" class="game-start">
          <h4>⚡ Type the code as fast as possible!</h4>
          <p>Test your coding speed and accuracy</p>
          <button @click="startTypeGame" class="start-btn">Start Typing</button>
        </div>
        
        <div v-if="typeGame.active" class="typing-area">
          <div class="target-text">
            <span 
              v-for="(char, index) in typeGame.targetText" 
              :key="index"
              :class="['char', {
                current: index === typeGame.currentIndex,
                correct: index < typeGame.currentIndex && typeGame.userInput[index] === char,
                incorrect: index < typeGame.currentIndex && typeGame.userInput[index] !== char
              }]"
            >{{ char }}</span>
          </div>
          <input 
            v-model="typeGame.userInput"
            @input="handleTyping"
            @paste.prevent
            @copy.prevent
            @cut.prevent
            @contextmenu.prevent
            :disabled="!typeGame.active"
            placeholder="Start typing here..."
            class="input-area"
            type="text"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
        
        <div v-if="typeGame.gameOver" class="game-over">
          <h4>⚡ Typing Complete!</h4>
          <p>Final WPM: {{ typeGame.finalWpm }}</p>
          <p>Final Accuracy: {{ typeGame.finalAccuracy }}%</p>
          <button @click="resetTypeGame" class="restart-btn">Type Again</button>
        </div>
      </div>
    </div>

    <!-- Game 3: Memory Match -->
    <div v-if="activeGame === 2" class="game-container">
      <div class="game-header">
        <h3>🧠 Code Memory Match</h3>
        <div class="game-stats">
          <span>Matches: {{ memoryGame.matches }}/{{ memoryGame.totalPairs }}</span>
          <span>Moves: {{ memoryGame.moves }}</span>
          <span>Time: {{ memoryGame.timeLeft }}s</span>
        </div>
      </div>
      
      <div class="memory-game">
        <div v-if="!memoryGame.active && !memoryGame.started" class="game-start">
          <h4>🎯 Match programming concepts!</h4>
          <p>Find pairs of related code snippets and concepts</p>
          <button @click="startMemoryGame" class="start-btn">Start Matching</button>
        </div>
        
        <div v-if="memoryGame.active" class="memory-grid">
          <div 
            v-for="card in memoryGame.cards" 
            :key="card.id"
            @click="flipCard(card)"
            :class="['memory-card', { 
              flipped: card.flipped, 
              matched: card.matched,
              disabled: memoryGame.checking
            }]"
          >
            <div class="card-front">?</div>
            <div class="card-back">{{ card.content }}</div>
          </div>
        </div>
        
        <div v-if="memoryGame.gameOver" class="game-over">
          <h4>🧠 Memory Master!</h4>
          <p>Completed in {{ memoryGame.moves }} moves</p>
          <p>Time taken: {{ 120 - memoryGame.timeLeft }}s</p>
          <button @click="resetMemoryGame" class="restart-btn">Play Again</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue'

const activeGame = ref(0)

const games = [
  { name: 'Bug Hunt', emoji: '🐛' },
  { name: 'Type Speed', emoji: '⌨️' },
  { name: 'Memory Match', emoji: '🧠' }
]

// Bug Hunt Game
const bugGame = reactive({
  active: false,
  started: false,
  gameOver: false,
  score: 0,
  timeLeft: 45,
  level: 1,
  totalBugs: 0,
  errors: 0,
  maxErrors: 2,
  gameOverReason: '',
  codeSnippets: [] as Array<{
    id: number,
    code: string,
    hasBug: boolean,
    clicked: boolean
  }>
})

const bugCodeSnippets = [
  { code: 'function add(a, b) {\n  return a + b;\n}', hasBug: false },
  { code: 'const arr = [1, 2, 3]\narr.puch(4)', hasBug: true }, // typo in push
  { code: 'if (x = 5) {\n  console.log("x is 5");\n}', hasBug: true }, // assignment instead of comparison
  { code: 'for (let i = 0; i < 10; i++) {\n  console.log(i);\n}', hasBug: false },
  { code: 'const obj = { name: "John" }\nobj.age = 25;', hasBug: false },
  { code: 'function divide(a, b) {\n  return a / b\n}', hasBug: true }, // no zero check
  { code: 'let x = 10;\nwhile (x > 0) {\n  console.log(x);\n}', hasBug: true }, // infinite loop
  { code: 'const nums = [1,2,3];\nnums.map(n => n * 2);', hasBug: false },
  { code: 'JSON.parse("invalid json")', hasBug: true }, // invalid JSON
  { code: 'const user = null;\nuser.name;', hasBug: true }, // null reference
  { code: 'Array.isArray([1,2,3])', hasBug: false },
  { code: 'parseInt("abc", 10)', hasBug: true } // NaN result
]

let bugGameTimer: NodeJS.Timeout | null = null

function startBugGame() {
  bugGame.started = true
  bugGame.active = true
  bugGame.score = 0
  bugGame.errors = 0
  bugGame.timeLeft = 45
  bugGame.gameOver = false
  bugGame.gameOverReason = ''
  
  // Generate random snippets
  const shuffled = [...bugCodeSnippets].sort(() => Math.random() - 0.5).slice(0, 8)
  bugGame.codeSnippets = shuffled.map((snippet, index) => ({
    id: index,
    code: snippet.code,
    hasBug: snippet.hasBug,
    clicked: false
  }))
  
  bugGame.totalBugs = bugGame.codeSnippets.filter(s => s.hasBug).length
  
  bugGameTimer = setInterval(() => {
    if (bugGame.timeLeft > 0) {
      bugGame.timeLeft--
    } else {
      endBugGame('time')
    }
  }, 1000)
}

function checkBug(snippet: any) {
  if (snippet.clicked || !bugGame.active) return
  snippet.clicked = true
  
  if (snippet.hasBug) {
    bugGame.score++
    if (bugGame.score === bugGame.totalBugs) {
      endBugGame('complete')
    }
  } else {
    // Wrong click - increment errors
    bugGame.errors++
    if (bugGame.errors >= bugGame.maxErrors) {
      endBugGame('error')
    }
  }
}

function endBugGame(reason: string = '') {
  bugGame.active = false
  bugGame.gameOver = true
  bugGame.gameOverReason = reason
  if (bugGameTimer) {
    clearInterval(bugGameTimer)
    bugGameTimer = null
  }
}

function resetBugGame() {
  bugGame.started = false
  bugGame.gameOver = false
  bugGame.gameOverReason = ''
  bugGame.score = 0
  bugGame.errors = 0
  bugGame.codeSnippets = []
}

// Type Speed Game
const typeGame = reactive({
  active: false,
  started: false,
  gameOver: false,
  timeLeft: 60,
  wpm: 0,
  accuracy: 100,
  finalWpm: 0,
  finalAccuracy: 100,
  currentIndex: 0,
  userInput: '',
  targetText: 'const fibonacci = (n) => { if (n <= 1) return n; return fibonacci(n - 1) + fibonacci(n - 2); }; const quickSort = (arr) => { if (arr.length <= 1) return arr; const pivot = arr[0]; const left = arr.slice(1).filter(x => x < pivot); const right = arr.slice(1).filter(x => x >= pivot); return [...quickSort(left), pivot, ...quickSort(right)]; };'
})

let typeGameTimer: NodeJS.Timeout | null = null

function startTypeGame() {
  typeGame.started = true
  typeGame.active = true
  typeGame.timeLeft = 60
  typeGame.userInput = ''
  typeGame.currentIndex = 0
  typeGame.gameOver = false
  
  typeGameTimer = setInterval(() => {
    if (typeGame.timeLeft > 0) {
      typeGame.timeLeft--
      calculateWPM()
    } else {
      endTypeGame()
    }
  }, 1000)
}

function handleTyping() {
  if (!typeGame.active) return
  
  typeGame.currentIndex = typeGame.userInput.length
  calculateWPM()
  
  if (typeGame.userInput === typeGame.targetText) {
    endTypeGame()
  }
}

function calculateWPM() {
  const timeElapsed = (60 - typeGame.timeLeft) / 60
  const wordsTyped = typeGame.userInput.length / 5
  typeGame.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0
  
  let correct = 0
  for (let i = 0; i < typeGame.userInput.length; i++) {
    if (typeGame.userInput[i] === typeGame.targetText[i]) {
      correct++
    }
  }
  typeGame.accuracy = typeGame.userInput.length > 0 ? Math.round((correct / typeGame.userInput.length) * 100) : 100
}

function endTypeGame() {
  typeGame.active = false
  typeGame.gameOver = true
  typeGame.finalWpm = typeGame.wpm
  typeGame.finalAccuracy = typeGame.accuracy
  if (typeGameTimer) {
    clearInterval(typeGameTimer)
    typeGameTimer = null
  }
}

function resetTypeGame() {
  typeGame.started = false
  typeGame.gameOver = false
  typeGame.userInput = ''
  typeGame.currentIndex = 0
}

// Memory Game
const memoryGame = reactive({
  active: false,
  started: false,
  gameOver: false,
  timeLeft: 120,
  matches: 0,
  moves: 0,
  totalPairs: 8,
  checking: false,
  cards: [] as Array<{
    id: number,
    content: string,
    pairId: number,
    flipped: boolean,
    matched: boolean
  }>,
  flippedCards: [] as any[]
})

const memoryPairs = [
  ['HTML', '<div>'],
  ['CSS', '.class'],
  ['JS', 'function()'],
  ['React', 'useState'],
  ['Vue', 'reactive'],
  ['Node', 'require()'],
  ['Git', 'commit'],
  ['SQL', 'SELECT']
]

let memoryGameTimer: NodeJS.Timeout | null = null

function startMemoryGame() {
  memoryGame.started = true
  memoryGame.active = true
  memoryGame.timeLeft = 120
  memoryGame.matches = 0
  memoryGame.moves = 0
  memoryGame.gameOver = false
  
  // Create card pairs
  const cards = []
  memoryPairs.forEach((pair, pairIndex) => {
    pair.forEach((content, index) => {
      cards.push({
        id: pairIndex * 2 + index,
        content,
        pairId: pairIndex,
        flipped: false,
        matched: false
      })
    })
  })
  
  // Shuffle cards
  memoryGame.cards = cards.sort(() => Math.random() - 0.5)
  
  memoryGameTimer = setInterval(() => {
    if (memoryGame.timeLeft > 0) {
      memoryGame.timeLeft--
    } else {
      endMemoryGame()
    }
  }, 1000)
}

function flipCard(card: any) {
  if (card.flipped || card.matched || memoryGame.checking) return
  
  card.flipped = true
  memoryGame.flippedCards.push(card)
  
  if (memoryGame.flippedCards.length === 2) {
    memoryGame.checking = true
    memoryGame.moves++
    
    setTimeout(() => {
      const [card1, card2] = memoryGame.flippedCards
      
      if (card1.pairId === card2.pairId) {
        card1.matched = true
        card2.matched = true
        memoryGame.matches++
        
        if (memoryGame.matches === memoryGame.totalPairs) {
          endMemoryGame()
        }
      } else {
        card1.flipped = false
        card2.flipped = false
      }
      
      memoryGame.flippedCards = []
      memoryGame.checking = false
    }, 1000)
  }
}

function endMemoryGame() {
  memoryGame.active = false
  memoryGame.gameOver = true
  if (memoryGameTimer) {
    clearInterval(memoryGameTimer)
    memoryGameTimer = null
  }
}

function resetMemoryGame() {
  memoryGame.started = false
  memoryGame.gameOver = false
  memoryGame.cards = []
  memoryGame.flippedCards = []
}

onBeforeUnmount(() => {
  if (bugGameTimer) clearInterval(bugGameTimer)
  if (typeGameTimer) clearInterval(typeGameTimer)
  if (memoryGameTimer) clearInterval(memoryGameTimer)
})
</script>

<style scoped>
.dev-games {
  margin: 4rem 0;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 27, 75, 0.8));
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.games-header {
  text-align: center;
  margin-bottom: 2rem;
}

.games-header h2 {
  color: #fff;
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}

.games-header p {
  color: #e2e8f0;
  margin: 0;
}

.games-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tab-btn:hover {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
}

.tab-btn.active {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border-color: transparent;
  color: white;
}

.game-container {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.game-header h3 {
  color: #fff;
  margin: 0;
  font-size: 1.3rem;
}

.game-stats {
  display: flex;
  gap: 1rem;
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  flex-wrap: wrap;
}

.game-stats span {
  padding: 0.4rem 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.4rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.9rem;
}

.game-stats .bugs-remaining {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
  color: #c4b5fd;
}

.game-start {
  text-align: center;
  padding: 2rem;
  color: #fff;
}

.game-start h4 {
  margin-top: 0;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.game-start p {
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.game-start .warning {
  color: #fbbf24;
  font-weight: 600;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 0.5rem;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.start-btn, .restart-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.start-btn:hover, .restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
}

/* Bug Hunt Game */
.code-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.code-snippet {
  background: rgba(30, 27, 75, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.code-snippet:hover {
  border-color: rgba(139, 92, 246, 0.4);
  background: rgba(30, 27, 75, 0.9);
}

.code-snippet.clicked.correct {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.2);
}

.code-snippet.clicked.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.2);
}

.code-snippet pre {
  color: #e2e8f0;
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  white-space: pre-wrap;
}

/* Type Speed Game */
.typing-area {
  margin: 1rem 0;
}

.target-text {
  background: rgba(30, 27, 75, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
  font-size: 0.9rem;
  color: #f1f5f9;
  font-weight: 500;
}

.char {
  background-color: transparent;
}

.char.current {
  background-color: rgba(139, 92, 246, 0.5);
}

.char.correct {
  background-color: rgba(16, 185, 129, 0.3);
  color: #10b981;
}

.char.incorrect {
  background-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.input-area {
  width: 100%;
  height: 3rem;
  background: rgba(30, 27, 75, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  padding: 0 1rem;
  color: #e2e8f0;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
}

.input-area:focus {
  outline: none;
  border-color: rgba(139, 92, 246, 0.4);
}

/* Memory Game */
.memory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.memory-card {
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  perspective: 1000px;
}

.memory-card.disabled {
  cursor: not-allowed;
}

.card-front, .card-back {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 600;
  backface-visibility: hidden;
  transition: transform 0.6s;
}

.card-front {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(168, 85, 247, 0.8));
  color: white;
  font-size: 1.5rem;
}

.card-back {
  background: rgba(30, 27, 75, 0.9);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  text-align: center;
  transform: rotateY(180deg);
}

.memory-card.flipped .card-front {
  transform: rotateY(180deg);
}

.memory-card.flipped .card-back {
  transform: rotateY(0deg);
}

.memory-card.matched .card-back {
  background: rgba(16, 185, 129, 0.3);
  border-color: #10b981;
}

.game-over {
  text-align: center;
  padding: 2rem;
  color: #fff;
}

.game-over h4 {
  margin-top: 0;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.game-over p {
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.game-over .error-msg {
  color: #f87171;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-weight: 600;
}

.game-over .timeout-msg {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem;
}

.game-over .success-msg {
  color: #34d399;
  background: rgba(52, 211, 153, 0.1);
  border: 1px solid rgba(52, 211, 153, 0.3);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .dev-games {
    margin: 3rem 0;
    padding: 1.8rem 1.2rem;
  }
  
  .games-header h2 {
    font-size: 1.75rem;
    margin-bottom: 0.8rem;
  }
  
  .games-header p {
    font-size: 0.95rem;
  }
  
  .games-tabs {
    gap: 0.8rem;
    margin-bottom: 1.8rem;
  }
  
  .tab-btn {
    padding: 0.8rem 1.3rem;
    font-size: 0.9rem;
  }
  
  .game-container {
    padding: 1.3rem;
  }
  
  .game-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
    margin-bottom: 1.8rem;
  }
  
  .game-header h3 {
    font-size: 1.3rem;
  }
  
  .game-stats {
    gap: 0.7rem;
    justify-content: center;
  }
  
  .game-stats span {
    padding: 0.5rem 0.9rem;
    font-size: 0.85rem;
  }
  
  .game-start {
    padding: 2rem 1rem;
  }
  
  .game-start h4 {
    font-size: 1.25rem;
  }
  
  .game-start p {
    font-size: 0.95rem;
  }
  
  .start-btn, .restart-btn {
    padding: 0.8rem 1.8rem;
    font-size: 0.95rem;
  }
  
  .memory-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
    max-width: 100%;
  }
  
  .code-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .code-snippet {
    padding: 1.2rem;
  }
  
  .code-snippet pre {
    font-size: 0.82rem;
  }
  
  .input-area {
    height: 3rem;
    font-size: 0.9rem;
    padding: 0 1rem;
  }
  
  .target-text {
    font-size: 0.88rem;
    line-height: 1.5;
    padding: 1.2rem;
  }
  
  .memory-card .card-front {
    font-size: 1.4rem;
  }
  
  .memory-card .card-back {
    font-size: 0.75rem;
  }
  
  .game-over {
    padding: 1.8rem 1.2rem;
  }
  
  .game-over h4 {
    font-size: 1.3rem;
  }
  
  .game-over p {
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .dev-games {
    padding: 1.5rem 1rem;
    margin: 2rem 0;
  }
  
  .games-header h2 {
    font-size: 1.5rem;
  }
  
  .games-header p {
    font-size: 0.9rem;
  }
  
  .games-tabs {
    gap: 0.7rem;
    margin-bottom: 1.5rem;
  }
  
  .tab-btn {
    padding: 0.7rem 1.1rem;
    font-size: 0.85rem;
  }
  
  .game-container {
    padding: 1.2rem;
  }
  
  .game-header {
    margin-bottom: 1.5rem;
  }
  
  .game-header h3 {
    font-size: 1.2rem;
  }
  
  .game-stats {
    gap: 0.6rem;
  }
  
  .game-stats span {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .game-start {
    padding: 1.5rem 0.8rem;
  }
  
  .game-start h4 {
    font-size: 1.15rem;
  }
  
  .game-start p {
    font-size: 0.9rem;
  }
  
  .start-btn, .restart-btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
  
  .code-grid {
    gap: 0.9rem;
  }
  
  .code-snippet {
    padding: 1rem;
  }
  
  .code-snippet pre {
    font-size: 0.8rem;
  }
  
  .input-area {
    height: 2.8rem;
    font-size: 0.85rem;
  }
  
  .target-text {
    font-size: 0.85rem;
    padding: 1rem;
  }
  
  .memory-grid {
    gap: 0.7rem;
    max-width: 100%;
  }
  
  .memory-card .card-front {
    font-size: 1.3rem;
  }
  
  .memory-card .card-back {
    font-size: 0.7rem;
  }
  
  .game-over {
    padding: 1.5rem 1rem;
  }
  
  .game-over h4 {
    font-size: 1.2rem;
  }
  
  .game-over p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .dev-games {
    padding: 1.2rem 0.8rem;
    margin: 1.5rem 0;
  }
  
  .games-header h2 {
    font-size: 1.35rem;
  }
  
  .games-header p {
    font-size: 0.85rem;
  }
  
  .games-tabs {
    gap: 0.5rem;
    margin-bottom: 1.3rem;
  }
  
  .tab-btn {
    padding: 0.65rem 1rem;
    font-size: 0.8rem;
  }
  
  .game-container {
    padding: 1rem;
  }
  
  .game-header {
    margin-bottom: 1.3rem;
  }
  
  .game-header h3 {
    font-size: 1.1rem;
  }
  
  .game-stats {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  
  .game-stats span {
    padding: 0.35rem 0.65rem;
    font-size: 0.75rem;
  }
  
  .game-start {
    padding: 1.3rem 0.7rem;
  }
  
  .game-start h4 {
    font-size: 1.05rem;
  }
  
  .game-start p {
    font-size: 0.85rem;
  }
  
  .game-start .warning {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
  
  .start-btn, .restart-btn {
    padding: 0.7rem 1.3rem;
    font-size: 0.85rem;
  }
  
  .code-grid {
    gap: 0.8rem;
  }
  
  .code-snippet {
    padding: 0.9rem;
  }
  
  .code-snippet pre {
    font-size: 0.75rem;
  }
  
  .input-area {
    height: 2.6rem;
    font-size: 0.8rem;
    padding: 0 0.8rem;
  }
  
  .target-text {
    font-size: 0.8rem;
    padding: 0.9rem;
    line-height: 1.4;
  }
  
  .memory-grid {
    gap: 0.6rem;
    grid-template-columns: repeat(4, 1fr);
  }
  
  .memory-card .card-front {
    font-size: 1.15rem;
  }
  
  .memory-card .card-back {
    font-size: 0.65rem;
    padding: 0.2rem;
  }
  
  .game-over {
    padding: 1.3rem 0.8rem;
  }
  
  .game-over h4 {
    font-size: 1.1rem;
  }
  
  .game-over p {
    font-size: 0.85rem;
  }
  
  .game-over .error-msg,
  .game-over .timeout-msg,
  .game-over .success-msg {
    font-size: 0.85rem;
    padding: 0.65rem;
  }
}
</style>
