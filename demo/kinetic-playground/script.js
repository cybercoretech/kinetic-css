/* Kinetic CSS Playground interactions.
   Kinetic CSS itself has no runtime dependency.
*/

(() => {
  "use strict";

  const root = document.documentElement;

  // Theme: Kinetic CSS uses data-k-theme.
  const themeSelect = document.querySelector("#theme-select");

  themeSelect.addEventListener("change", () => {
    root.dataset.kTheme = themeSelect.value;
  });

  // Density: set the framework token directly.
  // This also avoids the default root token overriding density selectors
  // in the current published stylesheet.
  const densitySelect = document.querySelector("#density-select");

  const densityValues = {
    compact: ".78",
    comfortable: "1",
    spacious: "1.22"
  };

  function setDensity(value) {
    root.dataset.kDensity = value;
    root.style.setProperty("--k-density", densityValues[value]);
  }

  densitySelect.addEventListener("change", () => {
    setDensity(densitySelect.value);
  });

  setDensity(densitySelect.value);

  // Container query card preview.
  const resizeStage = document.querySelector("#resize-stage");

  document.querySelectorAll("[data-preview-width]").forEach(button => {
    button.addEventListener("click", () => {
      resizeStage.style.inlineSize = button.dataset.previewWidth;
    });
  });

  // Accessible tabs using the Kinetic tab component classes.
  const tabButtons = [...document.querySelectorAll(".demo-tabs [role='tab']")];
  const tabPanels = [...document.querySelectorAll(".demo-tabs [role='tabpanel']")];

  function activateTab(button) {
    tabButtons.forEach(tab => {
      const selected = tab === button;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    tabPanels.forEach(panel => {
      const selected = panel.id === button.getAttribute("aria-controls");
      panel.hidden = !selected;
      panel.classList.toggle("is-active", selected);
    });
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => activateTab(button));

    button.addEventListener("keydown", event => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabButtons.length) % tabButtons.length;

      tabButtons[nextIndex].focus();
      activateTab(tabButtons[nextIndex]);
    });
  });

  if (tabButtons.length) activateTab(tabButtons[0]);

  // Native Kinetic dialog.
  const dialog = document.querySelector("#demo-dialog");
  const dialogTrigger = document.createElement("button");

  dialogTrigger.type = "button";
  dialogTrigger.className = "k-button k-button--outline";
  dialogTrigger.textContent = "Try the native dialog";
  dialogTrigger.addEventListener("click", () => dialog.showModal());

  const heroActions = document.querySelector(".hero-copy .k-cluster");
  heroActions.append(dialogTrigger);

  document.querySelector("#close-dialog").addEventListener("click", () => {
    dialog.close();
  });

  // Kinetic toast component.
  const toastContainer = document.querySelector("#toast-container");
  let toastTimer;

  function showToast(message) {
    toastContainer.replaceChildren();

    const toast = document.createElement("div");
    toast.className = "k-toast";
    toast.setAttribute("role", "status");
    toast.textContent = message;

    toastContainer.append(toast);

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  const toastButton = document.createElement("button");
  toastButton.type = "button";
  toastButton.className = "k-button k-button--outline";
  toastButton.textContent = "Show a Kinetic toast";
  toastButton.addEventListener("click", () => {
    showToast("Your Kinetic CSS interaction worked!");
  });

  heroActions.append(toastButton);
})();
