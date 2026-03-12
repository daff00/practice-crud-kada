pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                // Memanggil Secret File dari Jenkins Credentials
                withCredentials([file(credentialsId: 'kada-express-api', variable: 'SECRET_ENV')]) {
                    // Menyalin isi file rahasia ke file bernama .env di workspace
                    sh 'cp $SECRET_ENV .env'
                    
                    // Menjalankan docker compose
                    sh 'docker compose down'
                    sh 'docker compose up --build -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline berhasil! REST API sudah berjalan.'
        }
        failure {
            echo 'Pipeline gagal. Silakan cek log Jenkins.'
        }
        always {
            // Opsional tapi sangat disarankan: 
            // Menghapus file .env dari workspace Jenkins setelah selesai demi keamanan
            sh 'rm -f .env'
        }
    }
}