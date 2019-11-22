module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://kawrenn@localhost/dev_tracks',
    TEST_DB_URL: process.env.TEST_DB_URL || 'postgresql://kawrenn@localhost/dev_tracks_test',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://dev-track-nn2ba4gpp.now.sh/',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/'
}