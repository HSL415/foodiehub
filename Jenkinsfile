pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo '🔨 Building with Maven...'
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                dir('backend') {
                    bat 'mvn test'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                echo '🐳 Building Docker image...'
                dir('backend') {
                    bat 'docker build -t foodiehub-backend:latest .'
                }
            }
        }
        
        stage('Success') {
            steps {
                echo '✅ Pipeline completed successfully!'
                echo '🎉 FoodieHub build finished!'
            }
        }
    }
    
    post {
        success {
            echo '✅ Build Status: SUCCESS'
        }
        failure {
            echo '❌ Build Status: FAILED'
        }
        always {
            echo '🏁 Pipeline execution completed'
        }
    }
}
