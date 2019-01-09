/**
 * 初始化model
 * @type
 */
const fs=require('fs');
module.exports = {
    schedule: {
        interval: '24h',
        type: 'worker', // 指定所有的 worker 都需要执行
        immediate:true,
        disable:true,
    },
    task: async function (ctx) {
        fs.readdir(ctx.app.root_path+'/app/domain',function (err,files){
            if(err){
                console.log('读取domain目录失败：',err);
            }else{
                for(let i=0;i<files.length;i++){
                    let file=files[i];
                    let name=file.split('.')[0];
                    let name_r=ctx.helper.toCamelCaseVar(name.replace('ap_',''));
                    let path=ctx.app.root_path+'/app/model/'+name_r+'.js';
                    let data=`/**
 * ${name_r} Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ${name_r} = app.model.import('../domain/${name}');
    return ${name_r};
};`;
                    fs.writeFileSync(path,data);
                    console.log('写入文件：',path);
                }
            }

        })
    }
};