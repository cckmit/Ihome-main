pipeline {
    agent none
	
	environment {
	    NEXUS3_ADDRESS = 'docker.polyic.cn'
		IMAGE_NAME_VERSION = '1.0.0'		
		NODE_NPM_VERSION = '12.18.4-alpine'
		NEXUS3_DOCKER_CREDS = credentials('nexus3')
        CURR_MODULE = 'sales-web'
			
    }
	
    stages {
        stage('node build') { 
			agent {
				docker {
					image '${NEXUS3_ADDRESS}/node-npm:${NODE_NPM_VERSION}' 
					args '-p 3000:3000 --add-host nexus.polyic.cn:192.168.5.121' 
				}
			}	
            steps {
			    echo 'node build ihome-main..'
                sh 'cd ihome/ihome-main && npm install && npm run build' 
				
				echo 'node build ihome-system..'
                sh 'cd ihome/ihome-system && npm install && npm run build'
				
				echo 'node build ihome-sales..'
                sh 'cd ihome/ihome-sales && npm install && npm run build'

				echo 'node build ihome-report..'
                sh 'cd ihome/ihome-report && npm install && npm run build'	
            }
        }
		
		stage('deploy') {
		    agent any
			
			steps {
			    echo 'deploy..'
				
				sh 'rm -rf ../html/web-main/* && cp -r ihome/ihome-main/dist/* ../html/web-main/'
				sh 'rm -rf ../html/web-system/* && cp -r ihome/ihome-system/dist/* ../html/web-system/'
				sh 'rm -rf ../html/web-sales/* && cp -r ihome/ihome-sales/dist/* ../html/web-sales/'
				sh 'rm -rf ../html/web-report/* && cp -r ihome/ihome-report/dist/* ../html/web-report/'
				
            }
        }	
	
    }
	
}