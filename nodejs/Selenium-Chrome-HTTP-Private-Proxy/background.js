
	var config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "http",
        host: "110.89.123.150",
        port: parseInt(40023)
      },
      bypassList: ["foobar.com"]
    }
  };
  chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});
  function callbackFn(details) {
      return {
          authCredentials: {
              username: "jungle",
              password: "zy5525674087"
          }
      };
  }
  chrome.webRequest.onAuthRequired.addListener(
              callbackFn,
              {urls: ["<all_urls>"]},
              ['blocking']
  );
	