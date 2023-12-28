# youtube-notifs

## Examples
<details open>
  <summary>TypeScript Example</summary>

  ```ts
  import { PollingNotifier, VolatileStorage } from "youtube-notifs";

  const notifier = new PollingNotifier({
      interval: 15,
      storage: new VolatileStorage()
  });

  notifier.onNewVideos = (videos) => {
      console.dir(videos);
  }

  notifier.subscribe(["UCS0N5baNlQWJCUrhCEo8WlA"]);

  notifier.start();
  ```
</details>
<details>
  <summary>JavaScript Example</summary>

  ```js
  const { PollingNotifier, VolatileStorage } = require("youtube-notifs");

  const notifier = new PollingNotifier({
      interval: 15,
      storage: new VolatileStorage()
  });

  notifier.onNewVideos = (videos) => {
      console.dir(videos);
  }

  notifier.subscribe(["UCS0N5baNlQWJCUrhCEo8WlA"]);

  notifier.start();
  ```
</details>
