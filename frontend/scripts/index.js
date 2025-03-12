import {
  SmartHome,
  // AirConditioner,
  // Blinds,
  // Alarm,
  // Kettle,
} from "./classes-module.js";
import { renderLamp } from "./render-lamp-module.js";
import {
  deleteDevice,
  removeConfirmation,
  openClosePopup,
  creatingNewDeviceHandler,
} from "./utils-module.js";

export const URL = "http://localhost:8080";

document.addEventListener("DOMContentLoaded", function () {
  const lampsContainer = document.getElementById("lamps-container");
  const mySmartHome = new SmartHome();
  mySmartHome.loadDevicesFromServer(`${URL}/lamps`).then(() => {
    mySmartHome.lamps.forEach((lamp) => {
      renderLamp(lamp, lampsContainer);
    });
    const deleteButtonsArray = lampsContainer.querySelectorAll(
      ".app__device-remove-button"
    );
    deleteButtonsArray.forEach((button) => {
      button.addEventListener("click", (event) => {
        deleteDevice(event, mySmartHome);
      });
    });
  });

  const closePopupButton = document.querySelector("#add-device--close");
  closePopupButton.addEventListener("click", openClosePopup);

  const addDeviceButtonsArray = document.querySelectorAll(".add-device");
  addDeviceButtonsArray.forEach((button) => {
    button.addEventListener("click", openClosePopup);
    creatingNewDeviceHandler(button, lampsContainer, mySmartHome);
  });

  document.addEventListener("click", removeConfirmation);
  window.addEventListener("unload", () => {
    mySmartHome.saveDevicesToServer(`${URL}/lamps`);
  });
});
