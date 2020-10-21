
执行npm config edit
把
email=asit-it@polyihome.com
always-auth=true
_auth="bnBtYWRtaW46MTIzNDU2"
加在registry=http://nexus.polyic.cn/repository/npm-local/之后，
格式如下：
registry=http://nexus.polyic.cn/repository/npm-local/
email=asit-it@polyihome.com
always-auth=true
_auth="bnBtYWRtaW46MTIzNDU2"


#推送到仓库
npm publish  --registry=http://nexus.polyic.cn/repository/npm-local