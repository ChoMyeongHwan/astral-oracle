// ==========================================================================
// 5. 이벤트 핸들러 바인딩 및 부트스트랩 (App Bootstrap Entry)
// ==========================================================================
window.bindMainEvents = function() {
  window.DOM.btnHome.addEventListener("click", () => window.switchMode("main"));
  window.DOM.btnGoThree.addEventListener("click", () => window.switchMode("three"));
  window.DOM.btnGoDaily.addEventListener("click", () => window.switchMode("daily"));
  window.DOM.btnGoGuide.addEventListener("click", () => window.switchMode("guide"));
  
  window.DOM.btnShuffleThree.addEventListener("click", window.startThreeShuffle);
  window.DOM.btnRevealThree.addEventListener("click", window.revealThreeTarot);
  window.DOM.btnNewGameThree.addEventListener("click", window.resetThreeSpread);
  
  window.DOM.btnDrawDaily.addEventListener("click", window.drawDailyTarot);
  window.DOM.btnNewGameDaily.addEventListener("click", window.resetDailyDraw);
  
  window.DOM.cardModal.addEventListener("click", (e) => {
    if (e.target === window.DOM.cardModal || e.target.classList.contains("btn-close")) {
      window.closeCardModal();
    }
  });
  
  const startThree = document.getElementById("btn-start-three");
  const startDaily = document.getElementById("btn-start-daily");
  
  startThree.addEventListener("click", () => window.switchMode("three"));
  startThree.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.switchMode("three");
    }
  });
  
  startDaily.addEventListener("click", () => window.switchMode("daily"));
  startDaily.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.switchMode("daily");
    }
  });
  
  window.DOM.btnBgmToggle.addEventListener("click", window.toggleBGM);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && window.DOM.cardModal.classList.contains("active")) {
      window.closeCardModal();
    }
  });
};

window.init = function() {
  window.cacheDOM();
  window.bindMainEvents();
  window.initializeDeck();
  window.createSpaceBackground();
  window.switchMode("main");
};

document.addEventListener("DOMContentLoaded", window.init);
