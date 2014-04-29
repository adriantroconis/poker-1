requirejs.config({
    baseUrl: 'js/lib',
    paths: {
    	service: '../app/service',
        view: '../app/view',
        model: '../app/model',
        app: '../app',
        socketio: 'http://localhost:8080/socket.io/socket.io'
    }
});