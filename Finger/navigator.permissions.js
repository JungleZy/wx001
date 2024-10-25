'use strict'

const utils = require('./evasions/_utils/withUtils')

class Plugin {
    async onPageCreated(page, options) {
      // https://cloud.tencent.com/developer/article/1751469
      // await page.evaluateOnNewDocument(() => {
      //   Object.defineProperty(navigator, 'plugins', {
      //     get: () => [
      //       {
      //         0: { type: "application/x-google-chrome-pdf", suffixes: "pdf", description: "Portable Document Format", enabledPlugin: Plugin },
      //         description: "Portable Document Format",
      //         filename: "internal-pdf-viewer",
      //         length: 1,
      //         name: "Chrome PDF Plugin"
      //       },
      //       {
      //         0: { type: "application/pdf", suffixes: "pdf", description: "", enabledPlugin: Plugin },
      //         description: "",
      //         filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai",
      //         length: 1,
      //         name: "Chrome PDF Viewer"
      //       },
      //       {
      //         0: { type: "application/x-nacl", suffixes: "", description: "Native Client Executable", enabledPlugin: Plugin },
      //         1: { type: "application/x-pnacl", suffixes: "", description: "Portable Native Client Executable", enabledPlugin: Plugin },
      //         description: "",
      //         filename: "internal-nacl-plugin",
      //         length: 2,
      //         name: "Native Client"
      //       }
      //     ],
      //   });
      // });
     

        utils(page).evaluateOnNewDocument((utils, options) => {
            const isSecure = document.location.protocol.startsWith('https')

            if (isSecure) {
              utils.replaceGetterWithProxy(Notification, 'permission', {
                apply() {
                  return 'default'
                }
              })
            }
      
            if (!isSecure) {
              const handler = {
                apply(target, ctx, args) {
                  const param = (args || [])[0]
      
                  const isNotifications =
                    param && param.name && param.name === 'notifications'
                  if (!isNotifications) {
                    return utils.cache.Reflect.apply(...arguments)
                  }
      
                  return Promise.resolve(
                    Object.setPrototypeOf(
                      {
                        state: 'denied',
                        onchange: null
                      },
                      PermissionStatus.prototype
                    )
                  )
                }
              }
      
              utils.replaceWithProxy(Permissions.prototype, 'query', handler)
            }
        }, options)
    }
}

module.exports = (page, options) => {
    let plugin = new Plugin()
    plugin.onPageCreated(page, options)

    return plugin
}
