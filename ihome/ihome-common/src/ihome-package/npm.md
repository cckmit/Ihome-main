# npm私有库使用nexus部署
地址：http://nexus.polyic.cn

# 配置免密登录
执行npm config edit
把
email=asit-it@polyihome.com
always-auth=true
_auth="YWRtaW46YWRtaW4xMjM="
加在registry=http://nexus.polyic.cn/repository/npm-group/之后，
格式如下：
registry=registry=http://nexus.polyic.cn/repository/npm-group/
email=asit-it@polyihome.com
always-auth=true
_auth="YWRtaW46YWRtaW4xMjM="


# 推送到仓库
npm publish  --registry=http://nexus.polyic.cn/repository/npm-local
【双击npm-publish.bat文件可以执行脚本】

# 拉取地址

http://nexus.polyic.cn/repository/npm-group/

# 可视化查看版本
http://nexus.polyic.cn/#browse/browse:npm-local:ihome-common


# 注意事项
版本号不能重复，每次+1，在README.md写好版本日志

npm install --registry="http://nexus.polyic.cn/repository/npm-local"  ihome-common
npm install --registry="http://nexus.polyic.cn/repository/npm-local"  ihome-common@1.2.96