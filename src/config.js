module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://kawrenn@localhost/dev_tracks',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://kawrenn@localhost/dev_tracks_test',
    // CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://dev-track.now.sh',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000/',
    // API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://dev-track.now.sh',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/',
    JWT_SECRET: process.env.JWT_SECRET || 'secrets-secrets'
}