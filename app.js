/**
 *  全局定义
 * @param app
 */

class AppBootHook {
    constructor(app) {
        this.app = app;
        app.root_path=__dirname;
    }

    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }

    configDidLoad() {
        // Config, plugin files have been loaded.
    }

    async didLoad() {
        // All files have loaded, start plugin here.
    }

    async willReady() {
        // All plugins have started, can do some thing before app ready
    }

    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
    }

    async serverDidReady() {
        // Server is listening.
        let configs = await this.app.context.model.Config.findAll({where: {systemName: 'Apshop'}});
        let systemConfig={};
        for(let config of configs){
            if(!systemConfig[config.configName])
                systemConfig[config.configName]={};
            systemConfig[config.configName][config.keyWord]=config.configValue
        }
        systemConfig.shop = await this.app.context.model.Shop.findByPk(1,{raw:true});
        this.app.locals=systemConfig;
    }

    async beforeClose() {
        // Do some thing before app close.
    }
}

module.exports = AppBootHook;
