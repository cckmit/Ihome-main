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
					args '-p 3000:3000' 
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
				echo 'docker build mkdir html..'
				script {
					out = sh(script: "[ -f html ]  && echo 'true' || echo 'false' ", returnStdout: true)
					if(out == "true") {
						println "file download successfully."
						sh 'rm -rf html'
					}
				}

				sh 'mkdir html'
				
				echo 'docker build copy ihome-main..'
				sh 'cd html && mkdir web-main && cp ../ihome/ihome-main/ web-main'
				
				echo 'docker build copy ihome-system..'
				sh 'cd html && mkdir web-system && cp ../ihome/ihome-system/ web-system'
				
				echo 'docker build copy ihome-sales..'
				sh 'cd html && mkdir web-sales && cp ../ihome/ihome-sales/ web-sales'
				
				echo 'docker build..'
				sh 'docker build -f Dockerfile -t ${NEXUS3_ADDRESS}/${CURR_MODULE}:${IMAGE_NAME_VERSION} html/'
            }
        }		
    }
	
	post {
        always {
            echo 'delete html'
			sh 'rm -rf html'
        }
    }
	
}