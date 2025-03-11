class SmartHome {
  constructor() {
    this.lamps = [];
    this.airConditioners = [];
    this.blinds = [];
    this.kettles = [];
  }
  addLamp(device) {
    this.lamps.push(device);
  }
  addAirConditioner(device) {
    this.airConditioners.push(device);
  }
  addBlinds(device) {
    this.blinds.push(device);
  }
  addKettle(device) {
    this.kettles.push(device);
  }
  saveDevicesToServer() {}
  loadDevicesFromServer() {
    let lamp1 = new Lamp("Bedroom Lamp 2", "on", 20);
    let lamp2 = new Lamp("Bathroom");
    let lamp3 = new Lamp("Soft lights", "off");
    this.addLamp(lamp1);
    this.addLamp(lamp2);
    this.addLamp(lamp3);
  }
}

class Device {
  name;
  status;
  constructor(name, status) {
    this.name = name;
    this.status = status;
  }
  turnOnOff() {
    this.status = this.status === "on" ? "off" : "on";
  }
}

class Lamp extends Device {
  static id = 0;
  brightness;
  #maxBrightness = 100;
  #minBrightness = 0;
  defaultBrightness = 100;
  constructor(name, status = "off", brightness = 100) {
    super(name, status);
    this.id = ++Lamp.id;
    this.defaultBrightness = brightness;
    this.brightness = status === "on" ? brightness : 0;
  }
  increaseBrightness() {
    const newBrightness = this.brightness + 10;
    if (this.status === "off") {
      return console.log("Lamp is turned off");
    }
    if (newBrightness <= this.#maxBrightness) {
      this.brightness = newBrightness;
      console.log(`${this.name} current brightness is ${this.brightness}`);
    } else {
      console.log("Max brightness reached");
      this.brightness = this.#maxBrightness;
    }
  }
  decreaseBrightness() {
    const newBrightness = this.brightness - 10;
    if (this.status === "off") {
      return console.log("Lamp is turned off");
    }
    if (newBrightness >= this.#minBrightness) {
      this.brightness = newBrightness;
      console.log(`${this.name} current brightness is ${this.brightness}`);
    } else {
      console.log("Min brightness reached");
      this.brightness = this.#minBrightness;
    }
  }
  setDefaultBrightness() {
    this.defaultBrightness = this.brightness;
    console.log(
      `${this.name} default brightness is set to ${this.defaultBrightness}`
    );
  }
  turnOnOff() {
    super.turnOnOff();
    if (this.status === "on") {
      this.brightness = this.defaultBrightness;
    } else {
      if (this.defaultBrightness !== this.brightness) {
        this.defaultBrightness = this.brightness;
        console.log(`Default brightness is set to ${this.defaultBrightness}`);
      }
      this.brightness = 0;
    }
    console.log(`${this.name} is turned ${this.status}`);
  }
  get maxBrightness() {
    return this.#maxBrightness;
  }
  get minBrightness() {
    return this.#minBrightness;
  }
}

class AirConditioner extends Device {}

class Blinds extends Device {}

class Alarm extends Device {}

class Kettle extends Device {}

export { SmartHome, Device, Lamp, AirConditioner, Blinds, Alarm, Kettle };
