const { setInterval } = require("timers/promises");
const {
  getDefaultOutputDevice,
  getOutputDeviceVolume,
  setOutputDeviceVolume,
} = require("macos-audio-devices");
const nodeNotifier = require("node-notifier");

const main = async () => {
  for await (const _ of setInterval(1000)) {
    const defaultOutputDevice = await getDefaultOutputDevice();

    if (defaultOutputDevice.name === "FiiO KA3") {
      const { id, name } = defaultOutputDevice;

      const outputDeviceVolume = await getOutputDeviceVolume(id);
      if (outputDeviceVolume > 0.5) {
        await setOutputDeviceVolume(id, 0.25);

        nodeNotifier.notify({
          title: name,
          message: "Volume has been automatically adjusted.",
        });
      }
    }
  }
};

main();
