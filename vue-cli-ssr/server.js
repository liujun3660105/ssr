const devServer = require('./build/dev-server');
const express = require('express');
const app = express();
const vueRender = require('vue-server-renderer');
const path = require('path');


app.get('*',async(req, res)=>{
    
    res.status(200);
    res.setHeader('Content-type','text/html;charset=utf-8;');
    console.log('tiaoshi1')
    devServer(function(serverBundle, clientBundle, template){
        let renderer = vueRender.createBundleRenderer(serverBundle,{
            template,
            clientManifest:clientBundle.data,
            runInNewContext:false
        });
        console.log('tiaoshi2');
        console.log(req.url);
        renderer.renderToString({url:req.url}).then((html)=>{
            // 
            res.end(html);
            // console.log(html,'bbb');
        }).catch(err=>console.log(err,'baocuo'));

    });

    

});
app.listen(2001,()=>{
    console.log('启动成功');
});