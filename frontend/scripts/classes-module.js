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
  async saveDevicesToServer(url) {
    this.lamps.forEach((lamp) => {
      if (lamp.status === "on") {
        lamp.turnOnOff();
      }
    });
    const updatedLamps = [];
    for (const lamp of this.lamps) {
      updatedLamps.push({
        id: lamp.id,
        name: lamp.name,
        defaultBrightness: lamp.defaultBrightness,
      });
    }
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(updatedLamps),
    });
  }
  async loadDevicesFromServer(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        console.log("No devices saved on server!");
        return;
      }
      data.forEach((device) => {
        const newLamp = new Lamp(device.name, "off", device.defaultBrightness);
        this.addLamp(newLamp);
      });
      Lamp.id = data[data.length - 1].id;
      console.log("Data received:", data);
    } catch (error) {
      console.log("Error fetching data:", error.message);
    }
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
