/*
 * @Description:
 * @Author: xiaobei
 * @Date: 2020-04-26 18:15:59
 * @LastEditTime: 2020-05-11 18:06:08
 */

const fs = require('fs');
const { resolve, join } = require('path');
const { execFile } = require('child_process');
const os = require('os');
const Aria2 = require("aria2");

const platform = os.platform();
const engineBinMap = {
    'darwin': 'aria2c',
    'win32': 'aria2c.exe',
    'linux': 'aria2c'
}




class DownLoad {

    constructor() {
        this.aria2 = null;
        this.init()
    }

    startEngine() {
        if (!engineBinMap[platform]) {
            throw error('当前系统不支持aria2，请选择其他下载方式')
        }
        const baseEnginePath = resolve(__dirname, `./extra/${platform}/engine/${engineBinMap[platform]}`);
        const baseEngineConfig = resolve(__dirname, `./extra/${platform}/engine/aria2.conf`);
        execFile(baseEnginePath, [`--conf-path=${baseEngineConfig}`], {}, (error, stdout, stderr) => {
            if (error) {
                throw error('启动aria2失败')
            }
        })
        while (!this.aria2) {
            this.startEngineClient();
        }
    }

    startEngineClient() {
        this.aria2 = new Aria2([{
            host: 'localhost',
            port: 6800,
            secure: false,
            secret: '',
            path: '/jsonrpc'
        }]);
        // this.monitor()
    }

    monitor() {
        this.aria2
            .open()
            .then(() => console.log("engine open"))
            .catch(err => console.log("engine error", err));
    }

    async listMethods() {
        return this.aria2.listMethods()
    }


    async addDownLoadTasks(urls, savePath, fileOption, option) {
        if (option) {
            this.power('changeGlobalOption', option)
        }
        const multicall = []
        urls.forEach((url) => {
            const fileConfig = { dir: savePath, ...fileOption }
            multicall.push(["addUri", [url], fileConfig])
        });
        return this.aria2.multicall(multicall)
    }

    checkGlobalStatus() {
        return this.aria2.call('getGlobalStat')
    }

    checkStatusByGuid(gid) {
        return this.aria2.call('tellStatus', gid, ["gid", "status"])
    }

    power(method, option) {
        return this.aria2.call(method, option)
    }

    init() {
        this.startEngine()
    }

}


module.exports = DownLoad