// player.js (FINAL version to work with proxy)

// 1. **CHANGE THIS** to your proxy's URL
const MANIFEST_URL = 'https://jiotvpllive.cdn.jio.com'; 

// ... Keep ClearKey config ...

function initApp() {
  // ... initialize player ...

  // **DELETE THIS SECTION** - The proxy now handles the headers!
  /*
  player.getNetworkingEngine().registerRequestFilter((type, request) => {
    if (type === shaka.net.RequestType.MANIFEST || type === shaka.net.RequestType.SEGMENT) {
      request.headers['Cookie'] = COOKIE_VALUE;
      request.headers['User-Agent'] = USER_AGENT;
    }
  });
  */

  // ... load the stream from the proxy ...
  player.load(MANIFEST_URL)
    .then(() => console.log('Stream loaded via proxy.'))
    .catch(error => console.error('Error during load:', error));
}
// ... rest of the code ...
