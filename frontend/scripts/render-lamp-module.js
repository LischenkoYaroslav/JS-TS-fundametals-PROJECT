import { Lamp } from "./classes-module.js";

function renderLamp(lamp, outputContainer) {
  if (!lamp instanceof Lamp) return;
  // Create the main article element
  const article = document.createElement("article");
  article.classList.add("app__device");
  article.id = `lamp-${lamp.id}`;

  // Create the device status section
  const deviceStatus = document.createElement("div");
  deviceStatus.classList.add("app_device-status");

  // Create the title
  const title = document.createElement("h3");
  title.classList.add("app__device-title");
  title.textContent = lamp.name;

  // Create the toggle switch
  const toggleSwitch = document.createElement("div");
  toggleSwitch.classList.add("toggle-switch");

  // Create the checkbox input
  const toggleInput = document.createElement("input");
  toggleInput.classList.add("toggle-input");
  toggleInput.id = `toggle-${lamp.id}`;
  toggleInput.type = "checkbox";
  toggleInput.checked = lamp.status === "on" ? true : false;
  toggleInput.addEventListener("change", () => {
    lamp.turnOnOff();
    toggleInput.checked = toggleInput.checked ? true : false;
    brightnessPropertyValue.innerText = lamp.brightness;
    defaultBrightnessPropertyValue.innerText = lamp.defaultBrightness;
  });

  // Create the label
  const toggleLabel = document.createElement("label");
  toggleLabel.classList.add("toggle-label");
  toggleLabel.setAttribute("for", `toggle-${lamp.id}`);

  // Append title and toggle switch to the device status section
  toggleSwitch.appendChild(toggleInput);
  toggleSwitch.appendChild(toggleLabel);
  deviceStatus.appendChild(title);
  deviceStatus.appendChild(toggleSwitch);

  // Create the device properties section
  const deviceProperties = document.createElement("div");
  deviceProperties.classList.add("app__device-properties");

  // Create the brightness property
  const brightnessProperty = document.createElement("p");
  brightnessProperty.classList.add("app__device-value-text");
  brightnessProperty.innerText = "Brightness ";
  const brightnessPropertyValue = document.createElement("span");
  brightnessPropertyValue.innerText = lamp.brightness;
  brightnessPropertyValue.classList.add("app__device-value");
  brightnessProperty.appendChild(brightnessPropertyValue);

  // Create the default brightness property
  const defaultBrightnessProperty = document.createElement("p");
  defaultBrightnessProperty.classList.add("app__device-value-text");
  defaultBrightnessProperty.innerHTML = "Default Brightness ";
  const defaultBrightnessPropertyValue = document.createElement("span");
  defaultBrightnessPropertyValue.innerText = lamp.defaultBrightness;
  defaultBrightnessPropertyValue.classList.add("app__device-value");
  defaultBrightnessProperty.appendChild(defaultBrightnessPropertyValue);

  // Append the properties to the device properties section
  deviceProperties.appendChild(brightnessProperty);
  deviceProperties.appendChild(defaultBrightnessProperty);

  // Create the device control section
  const deviceControl = document.createElement("div");
  deviceControl.classList.add("app__device-control");

  // Create the control description
  const controlDescription = document.createElement("h5");
  controlDescription.classList.add("app__device-control-description");
  controlDescription.textContent = "Adjust Brightness";

  // Create the control buttons
  const controlButtons = document.createElement("div");
  controlButtons.classList.add("app__device-control-buttons");

  // Create the increase button
  const increaseButton = document.createElement("button");
  increaseButton.classList.add(
    "app__device-control-button",
    "control-button--increase"
  );
  increaseButton.textContent = "+";
  increaseButton.addEventListener("click", () => {
    lamp.increaseBrightness();
    brightnessPropertyValue.innerText = lamp.brightness;
  });

  // Create the decrease button
  const decreaseButton = document.createElement("button");
  decreaseButton.classList.add(
    "app__device-control-button",
    "control-button--decrease"
  );
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", () => {
    lamp.decreaseBrightness();
    brightnessPropertyValue.innerText = lamp.brightness;
  });

  // Append buttons to control buttons section
  controlButtons.appendChild(increaseButton);
  controlButtons.appendChild(decreaseButton);

  // Append description and buttons to the device control section
  deviceControl.appendChild(controlDescription);
  deviceControl.appendChild(controlButtons);

  // Create the remove section
  const removeSection = document.createElement("div");
  removeSection.classList.add("app__device-remove");

  // Create the remove button
  const removeButton = document.createElement("button");
  removeButton.classList.add("app__device-remove-button");
  removeButton.setAttribute("data-confirm", "false");
  removeButton.setAttribute("data-device-group", "lamps");
  removeButton.setAttribute("data-id", lamp.id);
  removeButton.textContent = "Delete";

  // Append the remove button to the remove section
  removeSection.appendChild(removeButton);

  // Append all sections to the main article
  article.appendChild(deviceStatus);
  article.appendChild(deviceProperties);
  article.appendChild(deviceControl);
  article.appendChild(removeSection);

  // Append the article to the body (or a specific container)
  const lastchild = outputContainer.lastElementChild;
  outputContainer.insertBefore(article, lastchild);
}

export { renderLamp };
