const serverConf = require('./webpack.server.conf');
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');

const webpackComlier = webpack(serverConf);
const axios =  require('axios');

module.exports = (cb)=>{
    var mfs = new MFS();

webpackComlier.outputFileSystem = mfs;
webpackComlier.watch({}, async (error, stats) => {
    if(error) return console.log(error);
    stats = stats.toJson();
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(err => console.log(er))

    //server Bundle json 文件
    let serverBundlePath = path.join(serverConf.output.path,
        'vue-ssr-server-bundle.json');
    let serverBundle = mfs.readFileSync(serverBundlePath,"utf-8");
    console.log(serverBundle);


    //client Bundle json 文件
    let clientBundle = await axios.get('http://localhost:8082/vue-ssr-client-manifest.json')
    // console.log(clientBundle);

    //模板
    let template = fs.readFileSync(path.join(__dirname,'..','index.html'),'utf-8');
    // console.log(template,'aaa');
    cb(serverBundle, clientBundle, template)




})

}