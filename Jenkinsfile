pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Mengambil kode terbaru dari GitHub
                checkout scm
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                // Mengambil file .env dari Jenkins Credentials dan men-deploy dengan Docker
                withCredentials([file(credentialsId: 'kada-express-env', variable: 'SECRET_ENV')]) {
                    sh 'cp $SECRET_ENV .env'
                    
                    // Mematikan kontainer lama lalu build & run kontainer baru
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
            // Menghapus file .env untuk keamanan
            sh 'rm -f .env'
        }
    }
}