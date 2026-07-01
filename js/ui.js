// ==========================================================================
// 4. UI 렌더러 및 DOM 컨트롤러 (UI Controller Namespace)
// ==========================================================================
window.DOM = {};
window.lastActiveElement = null;

window.cacheDOM = function() {
  window.DOM = {
    mainContainer: document.getElementById("main-container"),
    threeSpreadSection: document.getElementById("three-spread-section"),
    dailyCardSection: document.getElementById("daily-card-section"),
    guideSection: document.getElementById("guide-section"),
    
    btnHome: document.getElementById("btn-home"),
    btnGoThree: document.getElementById("btn-go-three"),
    btnGoDaily: document.getElementById("btn-go-daily"),
    btnGoGuide: document.getElementById("btn-go-guide"),
    
    btnShuffleThree: document.getElementById("btn-shuffle-three"),
    btnRevealThree: document.getElementById("btn-reveal-three"),
    threeBoard: document.getElementById("three-board"),
    threeResultBox: document.getElementById("three-result-box"),
    threeReadings: document.getElementById("three-readings"),
    
    btnDrawDaily: document.getElementById("btn-draw-daily"),
    dailyCardSlot: document.getElementById("daily-card-slot"),
    dailyResultBox: document.getElementById("daily-result-box"),
    dailyCardTitle: document.getElementById("daily-card-title"),
    dailyCardState: document.getElementById("daily-card-state"),
    dailyCardKeywords: document.getElementById("daily-card-keywords"),
    dailyCardDesc: document.getElementById("daily-card-desc"),
    dailyCardAdvice: document.getElementById("daily-card-advice"),
    
    guideGrid: document.getElementById("guide-grid"),
    cardModal: document.getElementById("card-modal"),
    cardModalTitle: document.getElementById("card-modal-title"),
    cardModalDetails: document.getElementById("card-modal-details"),
    btnNewGameThree: document.getElementById("btn-new-game-three"),
    btnNewGameDaily: document.getElementById("btn-new-game-daily"),
    btnBgmToggle: document.getElementById("btn-bgm-toggle")
  };
};

window.initializeDeck = function() {
  const deck = [...window.TAROT_DB];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  window.state.setDeck(deck);
};

window.switchMode = function(mode) {
  window.state.setMode(mode);
  window.AudioHelper.init();
  
  window.DOM.mainContainer.classList.add("hidden");
  window.DOM.threeSpreadSection.classList.add("hidden");
  window.DOM.dailyCardSection.classList.add("hidden");
  window.DOM.guideSection.classList.add("hidden");
  
  const tabs = [window.DOM.btnHome, window.DOM.btnGoThree, window.DOM.btnGoDaily, window.DOM.btnGoGuide];
  tabs.forEach(tab => tab.classList.remove("active"));
  
  if (mode === "main") {
    window.DOM.mainContainer.classList.remove("hidden");
    window.DOM.btnHome.classList.add("active");
  } else if (mode === "three") {
    window.DOM.threeSpreadSection.classList.remove("hidden");
    window.DOM.btnGoThree.classList.add("active");
    if (window.state.drawnCards.length === 0 && window.state.selectedCards.length === 0) {
      window.resetThreeSpread();
    }
  } else if (mode === "daily") {
    window.DOM.dailyCardSection.classList.remove("hidden");
    window.DOM.btnGoDaily.classList.add("active");
    if (!window.state.singleCard) {
      window.resetDailyDraw();
    }
  } else if (mode === "guide") {
    window.DOM.guideSection.classList.remove("hidden");
    window.DOM.btnGoGuide.classList.add("active");
    window.renderGuideGrid();
  }
};

window.getCardInnerDesignHTML = function(card, extraClass = "", hideDirection = false, isReversed = false) {
  const artHTML = card.imageUrl 
    ? `<img src="${card.imageUrl}" alt="${card.name}" class="card-art-img ${isReversed ? 'reversed-art' : ''}" loading="lazy">`
    : `<div class="card-symbol-art ${isReversed ? 'reversed-art' : ''}">${window.getCardSVG(card.id, card.color)}</div>`;

  const directionBadgeHTML = hideDirection 
    ? "" 
    : `<div class="card-direction-badge">${isReversed ? "역방향" : "정방향"}</div>`;

  return `
    <div class="card-inner-design ${extraClass}" style="color: ${card.color}">
      <div class="card-num">${card.number}</div>
      ${artHTML}
      <div class="card-name-ko">${card.name.split(" ")[0]}</div>
      ${directionBadgeHTML}
    </div>
  `;
};

window.resetThreeSpread = function() {
  window.initializeDeck();
  window.state.resetDrawnCards();
  window.DOM.threeBoard.innerHTML = "";
  window.DOM.threeResultBox.classList.add("hidden");
  window.DOM.btnRevealThree.classList.add("hidden");
  window.DOM.btnShuffleThree.classList.remove("hidden");
  window.DOM.threeReadings.innerHTML = "";
  
  const placeholders = ["과거 (Past)", "현재 (Present)", "미래 (Future)"];
  placeholders.forEach((label) => {
    const slot = document.createElement("div");
    slot.className = "card-slot";
    slot.innerHTML = `
      <div class="slot-placeholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="12" y1="8" x2="12" y2="16"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <span>${label}</span>
        <small>셔플 후 선택하세요</small>
      </div>
    `;
    window.DOM.threeBoard.appendChild(slot);
  });
};

window.startThreeShuffle = function() {
  window.AudioHelper.playShuffle();
  window.DOM.threeBoard.innerHTML = "";
  
  const spreadContainer = document.createElement("div");
  spreadContainer.className = "deck-spread-container";
  
  for (let i = 0; i < 22; i++) {
    const cardBack = document.createElement("div");
    cardBack.className = "card-spread-back animate-fade-in";
    cardBack.style.animationDelay = `${i * 0.02}s`;
    cardBack.style.backgroundImage = "url('images/tarot-card-back.webp')";
    cardBack.tabIndex = 0;
    cardBack.setAttribute("role", "button");
    cardBack.setAttribute("aria-label", `${i + 1}번째 운명의 카드 선택`);
    
    cardBack.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.toggleThreeSelection(i, cardBack);
      }
    });
    
    cardBack.addEventListener("click", () => {
      window.toggleThreeSelection(i, cardBack);
    });
    spreadContainer.appendChild(cardBack);
  }

  spreadContainer.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      spreadContainer.scrollLeft += e.deltaY * 0.9;
    }
  }, { passive: false });

  window.DOM.threeBoard.appendChild(spreadContainer);
  window.DOM.btnShuffleThree.classList.add("hidden");
};

window.toggleThreeSelection = function(index, element) {
  const result = window.state.toggleCardSelection(index);
  
  if (result.action === 'selected') {
    element.classList.add("selected");
    window.AudioHelper.playFlip();
  } else if (result.action === 'deselected') {
    element.classList.remove("selected");
    window.AudioHelper.playFlip();
  }
  
  if (result.count === 3) {
    window.DOM.btnRevealThree.innerHTML = "✨ 3장 선택 완료 (확인하기)";
    window.DOM.btnRevealThree.classList.remove("hidden");
  } else {
    window.DOM.btnRevealThree.classList.add("hidden");
  }
};

window.renderThreeDeckReveal = function() {
  window.DOM.threeBoard.innerHTML = "";
  window.DOM.btnRevealThree.classList.remove("hidden");
  
  const spreadLabels = ["과거", "현재", "미래"];
  window.state.drawnCards.forEach((item, idx) => {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = "card-wrapper";
    
    const cardEl = document.createElement("div");
    cardEl.className = "tarot-card-flip";
    cardEl.id = `three-card-${idx}`;
    
    const cardBack = document.createElement("div");
    cardBack.className = "tarot-card-side tarot-card-back-side";
    cardBack.style.backgroundImage = "url('images/tarot-card-back.webp')";
    
    const cardFront = document.createElement("div");
    cardFront.className = "tarot-card-side tarot-card-front-side";
    cardFront.style.border = `3px solid ${item.card.color}`;
    
    cardFront.innerHTML = window.getCardInnerDesignHTML(item.card, "", false, item.isReversed);
    
    cardEl.appendChild(cardBack);
    cardEl.appendChild(cardFront);
    cardWrapper.appendChild(cardEl);
    
    const label = document.createElement("div");
    label.className = "spread-slot-label";
    label.textContent = spreadLabels[idx];
    cardWrapper.appendChild(label);
    
    window.DOM.threeBoard.appendChild(cardWrapper);
  });
};

window.revealThreeTarot = function() {
  if (window.state.drawnCards.length === 0) {
    window.state.confirmSelection();
    window.renderThreeDeckReveal();
    window.DOM.btnRevealThree.innerHTML = "✨ 카드 결과 열기 (Reveal)";
    window.DOM.btnRevealThree.classList.remove("hidden");
    return;
  }

  window.AudioHelper.playChime();
  window.DOM.btnRevealThree.classList.add("hidden");
  
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      const card = document.getElementById(`three-card-${i}`);
      if (card) card.classList.add("flipped");
      window.AudioHelper.playFlip();
    }, i * 350);
  }
  
  setTimeout(() => {
    window.DOM.threeResultBox.classList.remove("hidden");
    window.DOM.threeReadings.innerHTML = "";
    const spreadTitles = { past: "과거 (Past)", present: "현재 (Present)", future: "미래 (Future)" };
    
    window.state.drawnCards.forEach(item => {
      const block = document.createElement("div");
      block.className = "reading-block animate-fade-in";
      block.style.borderLeft = `4px solid ${item.card.color}`;
      
      const heading = document.createElement("h4");
      heading.innerHTML = `${spreadTitles[item.type]} ➔ <span style="color: ${item.card.color}">${item.card.name}</span> (${item.isReversed ? "역방향" : "정방향"})`;
      block.appendChild(heading);
      
      const template = document.createElement("p");
      template.className = "text-muted";
      template.textContent = window.INTERPRET_TEMPLATES[item.type];
      block.appendChild(template);
      
      const keywords = document.createElement("div");
      keywords.className = "keywords-row";
      const list = item.isReversed ? item.card.reversedKeywords : item.card.uprightKeywords;
      list.forEach(k => {
        const badge = document.createElement("span");
        badge.className = "keyword-badge";
        badge.textContent = k;
        keywords.appendChild(badge);
      });
      block.appendChild(keywords);
      
      const details = document.createElement("p");
      details.className = "meaning-detail";
      details.textContent = item.isReversed ? item.card.reversedMeaning : item.card.uprightMeaning;
      block.appendChild(details);
      
      const advice = document.createElement("p");
      advice.className = "advice-box";
      advice.innerHTML = `<strong>💡 영혼의 조언:</strong> ${item.card.advice}`;
      block.appendChild(advice);
      
      window.DOM.threeReadings.appendChild(block);
    });
    
    window.DOM.threeResultBox.scrollIntoView({ behavior: "smooth" });
  }, 1100);
};

window.resetDailyDraw = function() {
  window.initializeDeck();
  window.state.resetSingleCard();
  window.DOM.dailyResultBox.classList.add("hidden");
  window.DOM.btnDrawDaily.classList.remove("hidden");
  
  window.DOM.dailyCardSlot.innerHTML = `
    <div class="card-slot-daily" id="daily-deck-back">
      <div class="card-slot-daily-inner">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:3rem; color:var(--text-muted);">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>운명의 카드 한 장</span>
        <small>아래 뽑기 버튼을 터치하세요</small>
      </div>
    </div>
  `;
};

window.drawDailyTarot = function() {
  window.DOM.btnDrawDaily.classList.add("hidden");
  window.AudioHelper.playShuffle();
  
  setTimeout(() => {
    window.AudioHelper.playFlip();
    const card = window.state.deck[Math.floor(Math.random() * window.state.deck.length)];
    const isReversed = Math.random() < 0.25;
    
    window.state.setSingleCard(card, isReversed);
    window.DOM.dailyCardSlot.innerHTML = "";
    
    const cardEl = document.createElement("div");
    cardEl.className = "tarot-card-flip size-lg";
    cardEl.id = "daily-card-3d";
    
    const cardBack = document.createElement("div");
    cardBack.className = "tarot-card-side tarot-card-back-side";
    cardBack.style.backgroundImage = "url('images/tarot-card-back.webp')";
    
    const cardFront = document.createElement("div");
    cardFront.className = "tarot-card-side tarot-card-front-side";
    cardFront.style.border = `4px solid ${card.color}`;
    
    cardFront.innerHTML = window.getCardInnerDesignHTML(card, "size-lg", false, isReversed);
    
    cardEl.appendChild(cardBack);
    cardEl.appendChild(cardFront);
    window.DOM.dailyCardSlot.appendChild(cardEl);
    
    setTimeout(() => {
      cardEl.classList.add("flipped");
      window.AudioHelper.playChime();
      
      window.DOM.dailyResultBox.classList.remove("hidden");
      window.DOM.dailyCardTitle.textContent = card.name;
      window.DOM.dailyCardTitle.style.color = card.color;
      window.DOM.dailyCardState.textContent = isReversed ? "역방향 (Reversed)" : "정방향 (Upright)";
      
      window.DOM.dailyCardKeywords.innerHTML = "";
      const kList = isReversed ? card.reversedKeywords : card.uprightKeywords;
      kList.forEach(k => {
        const badge = document.createElement("span");
        badge.className = "keyword-badge";
        badge.textContent = k;
        window.DOM.dailyCardKeywords.appendChild(badge);
      });
      
      window.DOM.dailyCardDesc.textContent = isReversed ? card.reversedMeaning : card.uprightMeaning;
      window.DOM.dailyCardAdvice.innerHTML = `<strong>오늘의 행운 비결:</strong> ${card.advice}`;
      
      window.DOM.dailyResultBox.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, 800);
};

window.renderGuideGrid = function() {
  window.DOM.guideGrid.innerHTML = "";
  window.TAROT_DB.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "guide-card-thumb";
    cardEl.style.borderTop = `3px solid ${card.color}`;
    
    const thumbIconHTML = card.imageUrl
      ? `<img src="${card.imageUrl}" alt="${card.name}" loading="lazy" style="width: 2.2rem; height: 3.3rem; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);">`
      : window.getCardSVG(card.id, card.color);
    
    cardEl.innerHTML = `
      <div class="guide-num" style="color: ${card.color}">${card.number}</div>
      <div class="guide-thumb-icon">${thumbIconHTML}</div>
      <div class="guide-name">${card.name.split(" ")[0]}</div>
      <small class="guide-name-eng">${card.englishName}</small>
    `;
    
    cardEl.tabIndex = 0;
    cardEl.setAttribute("role", "button");
    cardEl.setAttribute("aria-label", `${card.name.split(" ")[0]} 카드 상세 보기`);
    
    cardEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.openCardDetailModal(card);
      }
    });
    
    cardEl.addEventListener("click", () => window.openCardDetailModal(card));
    window.DOM.guideGrid.appendChild(cardEl);
  });
};

window.openCardDetailModal = function(card) {
  window.AudioHelper.playFlip();
  window.DOM.cardModalTitle.textContent = `${card.number}. ${card.name} (메이저 아르카나)`;
  window.DOM.cardModalTitle.style.color = card.color;
  
  window.DOM.cardModalDetails.innerHTML = `
    <div class="modal-card-art-container">
      ${window.getCardInnerDesignHTML(card, "", true)}
    </div>
    <div class="modal-desc-sections">
      <div class="modal-section-block">
        <h5>정방향 (Upright)</h5>
        <div class="keywords-row">
          ${card.uprightKeywords.map(k => `<span class="keyword-badge">${k}</span>`).join('')}
        </div>
        <p>${card.uprightMeaning}</p>
      </div>
      <div class="modal-section-block" style="border-top: 1px dashed var(--border-color); padding-top: 1rem; margin-top: 1rem;">
        <h5>역방향 (Reversed)</h5>
        <div class="keywords-row">
          ${card.reversedKeywords.map(k => `<span class="keyword-badge" style="background-color:rgba(239,68,68,0.1); color:#f87171;">${k}</span>`).join('')}
        </div>
        <p>${card.reversedMeaning}</p>
      </div>
      <div class="modal-section-block" style="border-top: 1px dashed var(--border-color); padding-top: 1rem; margin-top: 1rem; background:rgba(212,175,55,0.05); padding: 0.75rem; border-radius: 8px;">
        <h5 style="color:var(--accent);">조언 (Advice)</h5>
        <p style="font-style: italic; color:var(--text-primary);">${card.advice}</p>
      </div>
    </div>
  `;
  
  window.lastActiveElement = document.activeElement;
  window.DOM.cardModal.classList.add("active");
  
  setTimeout(() => {
    const closeBtn = window.DOM.cardModal.querySelector(".btn-close");
    if (closeBtn) closeBtn.focus();
  }, 80);
};

window.closeCardModal = function() {
  window.DOM.cardModal.classList.remove("active");
  if (window.lastActiveElement) {
    window.lastActiveElement.focus();
  }
};

window.toggleBGM = function() {
  if (window.BGMHelper.isPlaying) {
    window.BGMHelper.stop();
    window.DOM.btnBgmToggle.innerHTML = "🔇 신비로운 BGM 켜기";
    window.DOM.btnBgmToggle.classList.remove("active");
  } else {
    window.BGMHelper.start();
    window.DOM.btnBgmToggle.innerHTML = "🔊 BGM 끄기";
    window.DOM.btnBgmToggle.classList.add("active");
  }
};

window.createSpaceBackground = function() {
  const container = document.querySelector(".space-background");
  if (!container) return;
  const starsContainer = container.querySelector(".twinkle-stars") || container;
  starsContainer.innerHTML = "";
  const starCount = 75;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 2.2 + 0.8;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    star.style.animationDuration = `${Math.random() * 3 + 2.5}s`;
    const colors = ["#ffffff", "#e0f2fe", "#bae6fd", "#f5d0fe", "#fef08a"];
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    starsContainer.appendChild(star);
  }
};

window.getCardSVG = function(cardId, color) {
  let path = "";
  if (cardId === 0) {
    path = `<circle cx="12" cy="8" r="3" stroke="${color}" stroke-width="2"/>
            <path d="M12 11v8M9 19h6M6 14l6-3 6 3" stroke="${color}" stroke-width="2"/>`;
  } else if (cardId === 1) {
    path = `<path d="M7 12c-2.5-3 2.5-3 0 0s2.5 3 0 0z M17 12c-2.5-3 2.5-3 0 0s2.5 3 0 0z" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M12 6l5 12M12 6L7 18" stroke="${color}" stroke-width="1.5"/>
            <circle cx="12" cy="5" r="1" fill="${color}"/>`;
  } else if (cardId === 2) {
    path = `<path d="M12 4a8 8 0 0 1 8 8 8 8 0 0 1-8 8 6 6 0 0 0 0-16z" fill="${color}"/>`;
  } else if (cardId === 3) {
    path = `<path d="M5 8l3 5 4-7 4 7 3-5v8H5V8z" stroke="${color}" stroke-width="2" fill="none"/>
            <circle cx="12" cy="18" r="2" fill="${color}"/>`;
  } else if (cardId === 4) {
    path = `<path d="M8 6h8v4H8z" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M6 10l3 10h6l3-10" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M12 3v3M9 4.5h6" stroke="${color}" stroke-width="1.5"/>`;
  } else if (cardId === 5) {
    path = `<path d="M12 4v16M8 8h8M6 12h12M9 16h6" stroke="${color}" stroke-width="2.5"/>`;
  } else if (cardId === 6) {
    path = `<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${color}"/>`;
  } else if (cardId === 7) {
    path = `<path d="M12 4L4 8v6c0 5.25 8 10 8 10s8-4.75 8-10V8l-8-4z" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M8 11h8M10 14h4" stroke="${color}" stroke-width="1.5"/>`;
  } else if (cardId === 8) {
    path = `<circle cx="12" cy="11" r="5" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M8 15s2 2 4 2 4-2 4-2M10 9a1 1 0 1 1 0-2M14 9a1 1 0 1 1 0-2" stroke="${color}" stroke-width="2"/>`;
  } else if (cardId === 9) {
    path = `<path d="M12 4v4M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M12 11h.01M9 18h6M7 20h10" stroke="${color}" stroke-width="2"/>`;
  } else if (cardId === 10) {
    path = `<circle cx="12" cy="12" r="8" stroke="${color}" stroke-width="2" fill="none"/>
            <circle cx="12" cy="12" r="2" fill="${color}"/>
            <path d="M12 4v16M4 12h16M6.34 6.34l11.32 11.32M6.34 17.66L17.66 6.34" stroke="${color}" stroke-width="1.5"/>`;
  } else if (cardId === 11) {
    path = `<path d="M12 4v16M6 8h12M6 8l2 6h-4z M18 8l2 6h-4z" stroke="${color}" stroke-width="2" fill="none"/>`;
  } else if (cardId === 12) {
    path = `<path d="M12 4v10M8 8l4 6 4-6 M9 18l3-4 3 4" stroke="${color}" stroke-width="2" fill="none"/>`;
  } else if (cardId === 13) {
    path = `<rect x="8" y="7" width="8" height="8" rx="3" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M10 19v-4h4v4M8 15h8M10 10h.01M14 10h.01" stroke="${color}" stroke-width="2"/>`;
  } else if (cardId === 14) {
    path = `<path d="M12 4l3 5H9l3-5zM12 20l-3-5h6l-3 5z" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M12 9v6" stroke="${color}" stroke-width="1.5" stroke-dasharray="2,2"/>`;
  } else if (cardId === 15) {
    path = `<path d="M7 6c2-4 8-4 10 0M12 8v8M9 12h6" stroke="${color}" stroke-width="2" fill="none"/>
            <circle cx="9" cy="12" r="1" fill="${color}"/>
            <circle cx="15" cy="12" r="1" fill="${color}"/>`;
  } else if (cardId === 16) {
    path = `<path d="M6 20l2-14h8l2 14" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M12 3l-2 3h4l-2-3z" fill="${color}"/>
            <path d="M5 8l14 4" stroke="${color}" stroke-width="2.5"/>`;
  } else if (cardId === 17) {
    path = `<path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" fill="${color}"/>`;
  } else if (cardId === 18) {
    path = `<circle cx="12" cy="12" r="8" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M12 4a8 8 0 0 1 8 8 8 8 0 0 1-8 8" fill="${color}"/>`;
  } else if (cardId === 19) {
    path = `<circle cx="12" cy="12" r="5" fill="${color}"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2 2" stroke="${color}" stroke-width="2"/>`;
  } else if (cardId === 20) {
    path = `<path d="M8 8v4c0 3 4 5 4 5s4-2 4-5V8" stroke="${color}" stroke-width="2" fill="none"/>
            <path d="M12 4v4M12 17v3" stroke="${color}" stroke-width="2"/>`;
  } else if (cardId === 21) {
    path = `<ellipse cx="12" cy="12" rx="7" ry="9" stroke="${color}" stroke-width="2" fill="none" stroke-dasharray="4,2"/>
            <path d="M12 7l1 5-1 5" stroke="${color}" stroke-width="1.5"/>`;
  }
  return `
    <svg viewBox="0 0 24 24" fill="none" class="racket-icon">
      ${path}
    </svg>
  `;
};
