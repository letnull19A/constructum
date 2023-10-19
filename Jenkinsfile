pipeline {
    agent any

    stages {
        stage('Cloning') {
            steps {
                git branch: 'dev', credentialsId: 'cdb6cfb0-9d1c-460f-9fcb-8e39cbe72f22', url: 'git@github.com:letnull19A/constructum.git'
            }
        }
        stage('Installation packages in packages') {
            steps {
                dir('packages/constructum-interfaces') {
                    nodejs('nodejs') {
                        sh 'npm i'
                    }
                }
            }
        }
        stage('Build packages') {
            steps {
                dir('packages/constructum-interfaces') {
                    nodejs('nodejs') {
                        sh 'npm run build'
                    }
                }
                dir('packages/constructum-schemes') {
                    nodejs('nodejs') {
                        sh 'npm i && npm run build'
                    }
                }
                dir('packages/constructum-dbs') {
                    nodejs('nodejs') {
                        sh 'npm i && npm run build'
                    }
                }
                dir('packages/constructum-identify') {
                    nodejs('nodejs') {
                        sh 'npm i && npm run build'
                    }
                }
                dir('packages/constructum-compiler') {
                    nodejs('nodejs') {
                        sh 'npm i && npm run build'
                    }
                }
            }
        }
        stage('Testing packages') {
            steps {
                dir ('tests') {
                    nodejs('nodejs') {
                        sh 'npm i'
                    }
                }
            }
        }
        stage('Build docker images') {
            steps {
                dir ('/') {
                    sh 'docker image build -f ./gateway/Dockerfile -t ctor-gateway .'
                    sh 'docker image build -f api.Dockerfile -t constructum-api .'
                    sh 'docker image build -f auth.Dockerfile -t constructum-auth .'
                    sh 'docker image build -f compiler.Dockerfile -t constructum-compiler .'
                    sh 'docker image build -f identify.Dockerfile -t constructum-identify .'
                    sh 'docker image build -f client.Dockerfile -t constructum-client .'
                }
            }
        }
        stage('Test deploy') {
            steps {
                sh 'docker compose -p ctor-test down'
                sh 'docker compose -f docker-compose.test.yml -p ctor-test up -d'
            }
        }
        stage('Testing nginx + application') {
            steps {
                dir ('tests') {
                    nodejs('nodejs') {
                        sh 'npm run test'
                    }
                }
            }
        }
        stage('Deploy + integration') {
            steps {
                sh 'docker compose -p ctor-test down'
                sh 'docker compose -p ctor up -d'
            }
        }
    }
}