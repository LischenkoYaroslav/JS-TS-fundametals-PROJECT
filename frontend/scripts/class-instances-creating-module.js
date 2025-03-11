import {
  Device,
  Lamp,
  AirConditioner,
  Blinds,
  Alarm,
  Kettle,
} from "./classes-module.js";

const lampsArray = [];

function addNewLamp(name, status = "off", brightness = 100) {
  const lamp = new Lamp(name, status, brightness);
  lampsArray.push(lamp);
  console.log(lampsArray);
}

export { addNewLamp };
