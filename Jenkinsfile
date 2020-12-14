pipeline {
    agent none
	
	environment {
	    NEXUS3_ADDRESS = 'docker.polyic.cn'
		IMAGE_NAME_VERSION = '1.0.0'		
		NODE_NPM_VERSION = '12.18.4-alpine'
		
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
            }
        }
		
		stage('docker build') {
		    agent any
			
			steps {
				echo 'docker build mkdir dockerdir..'
				sh 'rm -rf dockerdir && mkdir -p dockerdir/html'
				
				echo 'docker build copy ihome-main..'
				sh 'mkdir dockerdir/html/web-main && cp -r ihome/ihome-main/dist/* dockerdir/html/web-main'
				
				echo 'docker build copy ihome-system..'
				sh 'mkdir dockerdir/html/web-system && cp -r ihome/ihome-system/dist/* dockerdir/html/web-system'
				
				echo 'docker build copy ihome-sales..'
				sh 'mkdir dockerdir/html/web-sales && cp -r ihome/ihome-sales/dist/* dockerdir/html/web-sales'
								
				echo 'docker build..'
				sh 'docker build -f Dockerfile -t ${NEXUS3_ADDRESS}/${CURR_MODULE}:${IMAGE_NAME_VERSION} dockerdir/'
            }
        }	

		stage('docker deploy') {
		    agent any
		
            steps {
                echo 'docker deploy..'
				sh 'export TMP_NEXUS3_DOCKER_PWD="${NEXUS3_DOCKER_CREDS_PSW}" && echo "$TMP_NEXUS3_DOCKER_PWD" | docker login ${NEXUS3_ADDRESS} -u ${NEXUS3_DOCKER_CREDS_USR} --password-stdin'
                sh 'docker push ${NEXUS3_ADDRESS}/${CURR_MODULE}:${IMAGE_NAME_VERSION}'
            }
        }	
    }
	
}