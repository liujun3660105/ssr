//服务端这边需要把访问的路径给到vue-router
import createApp from './app'
//给外面的express服务使用
export default (context)=>{
    return new Promise((resolve, reject)=>{
        let {app, router} = createApp(context);
        router.push(context.url);
        router.onReady(()=>{
            //访问路径，可以匹配到组件
            let matchedComponents = router.getMatchedComponents();
            if(matchedComponents.length){
                return reject({code:404})
            }
            resolve(app);

        },reject)
    })

}