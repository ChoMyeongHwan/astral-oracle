// ==========================================================================
// 2. 중앙 상태 머신 (State Machine Namespace)
// ==========================================================================
window.state = {
  deck: [],
  drawnCards: [],
  singleCard: null,
  currentMode: "main",
  stepDrawCount: 0,
  selectedCards: [],
  reversedMap: [],

  setMode(mode) {
    this.currentMode = mode;
    console.log(`[State] Mode changed to: ${mode}`);
  },

  setDeck(newDeck) {
    this.deck = newDeck;
    this.initializeReversedMap();
    console.log(`[State] Deck set: ${newDeck.length} cards.`);
  },

  initializeReversedMap() {
    this.reversedMap = [];
    for (let i = 0; i < 22; i++) {
      this.reversedMap.push(Math.random() < 0.3);
    }
  },

  toggleCardSelection(index) {
    const existingIdx = this.selectedCards.findIndex(item => item.index === index);
    if (existingIdx !== -1) {
      this.selectedCards.splice(existingIdx, 1);
      this.stepDrawCount = this.selectedCards.length;
      return { action: 'deselected', count: this.selectedCards.length };
    } else {
      if (this.selectedCards.length >= 3) {
        return { action: 'none', count: this.selectedCards.length };
      }
      const card = this.deck[index];
      const isReversed = this.reversedMap[index];
      this.selectedCards.push({ index, card, isReversed });
      this.stepDrawCount = this.selectedCards.length;
      return { action: 'selected', count: this.selectedCards.length };
    }
  },

  confirmSelection() {
    if (this.selectedCards.length !== 3) return false;
    this.drawnCards = [
      { card: this.selectedCards[0].card, isReversed: this.selectedCards[0].isReversed, type: 'past' },
      { card: this.selectedCards[1].card, isReversed: this.selectedCards[1].isReversed, type: 'present' },
      { card: this.selectedCards[2].card, isReversed: this.selectedCards[2].isReversed, type: 'future' }
    ];
    this.selectedCards = [];
    this.stepDrawCount = 3;
    return true;
  },

  resetDrawnCards() {
    this.drawnCards = [];
    this.selectedCards = [];
    this.stepDrawCount = 0;
  },

  setSingleCard(card, isReversed) {
    this.singleCard = { card, isReversed };
  },

  resetSingleCard() {
    this.singleCard = null;
  }
};
