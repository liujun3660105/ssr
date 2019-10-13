//服务端这边需要把访问的路径给到vue-router

const createApp = require('./app');
//给外面的express服务使用
module.exports = (context)=>{
    return new Promise((resolve, reject)=>{
        let {app, router} = createApp(context);
        console.log(context);
        router.push(context.url);
        router.onReady(()=>{
            //访问路径，可以匹配到组件
            let matchedComponents = router.getMatchedComponents();
            console.log(matchedComponents);
            if(matchedComponents.length){
                return reject({code:404})
            }
            resolve(app);

        },reject)
    })

}