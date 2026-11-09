(() => {
  const buttons = [...document.querySelectorAll(".delete-button")];
  const hint = document.querySelector("#hint");
  const reset = document.querySelector("#reset");
  const timers = new WeakMap();

  function play(button) {
    if (button.classList.contains("eating")) return;
    clearTimeout(timers.get(button));
    button.classList.remove("icon-only", "pulse");
    // Force a fresh animation when the same button is activated again.
    void button.offsetWidth;
    button.classList.add("eating");
    hint.textContent = "Nom nom… the bin is eating the label.";
    timers.set(button, window.setTimeout(() => {
      button.classList.remove("eating");
      button.classList.add("icon-only", "pulse");
      hint.textContent = "Label eaten. Only the trash icon remains.";
      timers.set(button, window.setTimeout(() => {
        button.classList.remove("pulse");
      }, 700));
    }, 420));
  }

  buttons.forEach(button => {
    button.addEventListener("mouseenter", () => play(button));
    button.addEventListener("click", () => play(button));
    button.addEventListener("focus", () => play(button));
  });

  reset.addEventListener("click", () => {
    buttons.forEach(button => {
      clearTimeout(timers.get(button));
      button.classList.remove("eating", "icon-only", "pulse");
    });
    hint.textContent = "Hover or click a button. The bin eats its label.";
  });
})();