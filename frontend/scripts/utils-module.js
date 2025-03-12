import { Lamp } from "./classes-module.js";
import { renderLamp } from "./render-lamp-module.js";

function removeFromSmartHomeById(arrayOfDevices, id) {
  const index = arrayOfDevices.findIndex((device) => +device.id === +id);
  if (index !== -1) {
    arrayOfDevices.splice(index, 1);
  }
  console.log(arrayOfDevices);
}
function deleteDevice(event, smartHomeInstance) {
  const confirm = event.target.dataset.confirm;
  if (confirm === "false") {
    event.target.dataset.confirm = "true";
    event.target.textContent = "Are you sure?";
    event.target.classList.toggle("remove-confirm");
  } else {
    const article = event.target.parentNode.parentNode;
    const deviceId = event.target.dataset.id;
    if (event.target.dataset.deviceGroup === "lamps") {
      removeFromSmartHomeById(smartHomeInstance.lamps, deviceId);
    } else if (event.target.dataset.deviceGroup !== "lamps") {
      //Delete other device
    }
    article.remove();
  }
}
function removeConfirmation(event) {
  const buttons = document.querySelectorAll(".remove-confirm");
  buttons.forEach((button) => {
    if (button && !button.contains(event.target)) {
      button.dataset.confirm = "false";
      button.textContent = "Delete";
      button.classList.toggle("remove-confirm");
    }
  });
}
function openClosePopup() {
  document.body.classList.toggle("overflow-hidden");
  document
    .querySelector(".app__add-popup")
    .classList.toggle("app__add-popup--active");
}
function creatingNewDeviceHandler(button, outputElement, smartHomeInstance) {
  const addDeviceButton = document.querySelector("#add-device--add");
  const addDeviceInput = document.querySelector("#input__device-name");
  if (!addDeviceButton || !addDeviceInput) return;
  if (button.dataset.deviceGroup === "lamps") {
    addDeviceButton.onclick = () => {
      const newLamp = new Lamp(addDeviceInput.value);
      smartHomeInstance.addLamp(newLamp);
      renderLamp(newLamp, outputElement);
      const newLampDeleteButton = document
        .querySelector(`#lamp-${newLamp.id}`)
        .querySelector(".app__device-remove-button");
      newLampDeleteButton.addEventListener("click", (event) => {
        deleteDevice(event, smartHomeInstance);
      });
      openClosePopup();
      addDeviceInput.value = "";
      console.log(smartHomeInstance.lamps);
    };
  } else if (button.dataset.deviceGroup !== "lamps") {
    //Creation and rendering of another device
  }
}

export {
  removeFromSmartHomeById,
  deleteDevice,
  removeConfirmation,
  openClosePopup,
  creatingNewDeviceHandler,
};
