pipeline {

    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out TinDog source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo 'Running TinDog tests...'
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {

                echo 'Running SonarQube analysis...'

                script {

                    def scannerHome = tool 'SonarScanner'

                    withSonarQubeEnv('SonarQube') {

                        sh """
                            echo "SonarScanner location:"
                            ${scannerHome}/bin/sonar-scanner --version

                            ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=tindog \
                            -Dsonar.projectName=TinDog \
                            -Dsonar.sources=.
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {

                echo 'Waiting for SonarQube Quality Gate...'

                timeout(time: 10, unit: 'MINUTES') {

                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build') {
            steps {

                echo 'Building TinDog...'

                sh 'npm run build'
            }
        }
    }

     stage('Deploy to Vercel') {
        steps {

                echo 'Deploying TinDog to Vercel...'

                withCredentials([
                    string(
                        credentialsId: 'vercel-token',
                        variable: 'VERCEL_TOKEN'
                    ),
                    string(
                        credentialsId: 'vercel-project-id',
                        variable: 'VERCEL_PROJECT_ID'
                    ),
                    string(
                        credentialsId: 'vercel-org-id',
                        variable: 'VERCEL_ORG_ID'
                    )
                ]) {

                    sh '''
                        npx vercel deploy \
                        --prod \
                        --token="$VERCEL_TOKEN" \
                        --yes
                    '''
                }
            }
    }


    post {

        success {
            echo '======================================'
            echo 'TinDog CI/CD Pipeline SUCCESS!'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'TinDog CI/CD Pipeline FAILED!'
            echo '======================================'
        }
    }
}