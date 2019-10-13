const express = require('express');
const app = express();
const Vue = require('vue');
const path = require('path');
const vueServerRender = require('vue-server-renderer').createRenderer({
    template:require('fs').readFileSync(path.join(__dirname,'./index.html'),'utf-8')
});

const App = require('./src/entry-server.js');


app.get('*',async(req, res)=>{
    
    res.status(200);
    res.setHeader('Content-type','text/html;charset=utf-8;');
    let app = await App({url:req.url});
    console.log(res);
    vueServerRender.renderToString(app).then(html=>res.end(html))
        .catch(err=>console.log(err,'baocuo'));
    

});
app.listen(2000,()=>{
    console.log('启动成功');
});