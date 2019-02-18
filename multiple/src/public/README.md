# 公共模块


* 配置文件需放在 common/config下，在webpack配置中配置别名：public、common
``` javascript
    function resolve(dir) {
        return path.join(__dirname, '..', dir)
    }

    {
        resolve:{
            alias: {
                'public': path.resolve(__dirname, '../src/public'),
                'common': path.resolve(__dirname, '../src/common'),
            }
        }
    }

```
---
## 配置项

>主项目内`common/config`目录下

### index
* statisticCode         百度统计code
* BrandConfig           品牌配置项

### api
* TDL                   一级域名
* LOADING_DELAY         Loading动画延迟消失时间
* REQUEST_TIME_OUT      请求超时时间

---
## 目录说明

目录名称|说明
-------|--
api|公共库中需要用到的接口
bridge|原生交互相关方法
components|公共组件
css|样式文件
styles|样式文件
fetch|接口请求函数
fonts|公共字体文件
images|公共图片
lib|基础库
mixins|vue混合
plugins|vue插件
service|公共服务
