import {
  SmartHome,
  Lamp,
  AirConditioner,
  Blinds,
  Alarm,
  Kettle,
} from "./classes-module.js";
import { renderLamp } from "./render-lamp-module.js";

const URL = "http://localhost:8000";

document.addEventListener("DOMContentLoaded", function () {
  const mySmartHome = new SmartHome();
  mySmartHome.loadDevicesFromServer();

  const lampsContainer = document.getElementById("lamps-container");
  mySmartHome.lamps.forEach((lamp) => {
    renderLamp(lamp, lampsContainer);
  });

  function deleteDevice(event) {
    const confirm = event.target.dataset.confirm;
    if (confirm === "false") {
      event.target.dataset.confirm = "true";
      event.target.textContent = "Are you sure?";
      event.target.classList.toggle("remove-confirm");
    } else {
      const article = event.target.parentNode.parentNode;
      const deviceId = event.target.dataset.id;
      const index = mySmartHome.lamps.findIndex((device) => +device.id === +deviceId);
      if (index !== -1) {
        mySmartHome.lamps.splice(index, 1);
      }
      article.remove();
      console.log("Deleted");
      console.log(mySmartHome.lamps);
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

  const deleteButtons = document.querySelectorAll(".app__device-remove-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      deleteDevice(event);
    });
  });
  document.addEventListener("click", removeConfirmation);
});

// function renderLamps(arrayOfLamps, outputContainer) {
//   if (arrayOfLamps.length > 0) {
//     arrayOfLamps.forEach((lamp) => {
//       const article = document.createElement("article");
//       article.classList.add("app__device");
//       article.id = `lamp-${lamp.id}`;
//       const status = document.createElement("div");
//       status.classList.add("app_device-status");
//       const name = document.createElement("h3");
//       name.classList.add("app__device-title");
//       name.textContent = lamp.name;

//       outputContainer.insertBefore(article, outputContainer.lastChild);
//     });
//   }
// }

// const lamp = new Lamp("lamp", "off", 100);
// const lamp2 = new Lamp("lamp", "off", 100);
// console.log(lamp.id);
// console.log(lamp2.id);
// console.log(Lamp.id);

// const userNameInput = document.querySelector("#user-name");
// const userPetInput = document.querySelector("#user-pet");
// const btnTestGet = document.querySelector("#get");
// const btnTestPost = document.querySelector("#post");
// const output = document.querySelector(".result");

// function renderUsers(users) {
//   output.innerHTML = "";
//   users.forEach((user) => {
//     const div = document.createElement("div");
//     div.textContent = `Name: ${user.name}, Pet: ${user.pet}`;
//     output.appendChild(div);
//   });
// }

// async function getHandler() {
//   const response = await fetch(url);
//   const data = await response.json();
//   renderUsers(data);
// }

// async function postHandler() {
//   const newUser = {
//     name: userNameInput.value,
//     pet: userPetInput.value,
//   };
//   const response = await fetch(url, {
//     method: "POST",
//     body: JSON.stringify(newUser),
//   });
//   const data = await response.json();
//   renderUsers(data);
// }

// btnTestGet.addEventListener("click", getHandler);
// btnTestPost.addEventListener("click", postHandler);
