'use strict'

const utils = require('./evasions/_utils/withUtils')

class Plugin {
    async onPageCreated(page, options) {
        utils(page).evaluateOnNewDocument((utils, options) => {
            const originalFunction = HTMLCanvasElement.prototype.toDataURL.bind({ arguments: ["image/png"] });


            let random1 = Math.random().toString(36).toUpperCase().slice(2, -1)
            let random2 = Math.random().toString(36).toUpperCase().slice(2, -1)
            let random3 = Math.random().toString(36).toUpperCase().slice(2, -1)
            let random4 = Math.random().toString(36).toUpperCase().slice(2, -1)
            let random5 = Math.random().toString(36).toUpperCase().slice(2, -1)
            let random = random1 + random2 + random3 + random4 + random5;
            
            const getCanvasProxyHandler = {
                apply: function (target, ctx, args) {
                    
                    let canvas_element = ctx.cloneNode()
                    let canvas_context = canvas_element.getContext("2d")
                    
                    
                    // let image = new Image()
                    // image.src = result;
                    // canvas_context.drawImage(image, 0, 0)
                    canvas_context.textBaseline = 'alphabetic'
                    canvas_context.fillStyle = '#f60'
                    canvas_context.fillRect(100, 1, Math.floor(Math.random() * 80), Math.floor(Math.random() * 80))

                    var result = target.apply( ctx, args)
          
                    
                    result = result.slice(0, 100) + random + result.slice(130,-1);


                    // const imageData = canvas_context.getImageData(0, 0, 100, 199);
                    // console.log(imageData)
                    // for (let i = 0; x < imageData.data.length; i++) {
                    //     console.log(imageData.data[i])
                    //     imageData.data[i] = 0
                    // }

                   try{
                    //    let new_result = originalFunction.apply(canvas_context, args)
                    //    console.log(new_result)
                       return result
                   }catch(err){
                
                        console.log("canvas error:",err)
                        return []
                   }

                   
                }
            }

            utils.replaceWithProxy(HTMLCanvasElement.prototype, 'toDataURL', getCanvasProxyHandler)
        }, options)
    }
}

module.exports = (page, options) => {
    let plugin = new Plugin()
    plugin.onPageCreated(page, options)

    return plugin
}
