const express = require('express');
const app = express();
const Vue = require('vue');
const vueServerRender = require('vue-server-renderer').createRenderer()
//vue实例

const vueApp=new Vue({
    data:{
        message:'hello,vue-ssr'
    },
    template:`
        <div>
            <h1>欢迎学习vue-ssr</h1>
            <p>{{message}}</p>
        </div>
    `
})


app.get('*',(req, res)=>{
    
    res.status(200);
    res.setHeader('Content-type','text/html;charset=utf-8;');
    vueServerRender.renderToString(vueApp).then(html=>res.end(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        </head>
        <body>
        ${html}
    
        </body>
        </html>
        `
        ))
        .catch(err=>console.log(err))
    

});
app.listen(2000,()=>{
    console.log('启动成功');
});