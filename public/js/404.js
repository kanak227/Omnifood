window.addEventListener('load', function() {
    document.getElementById('loadingOverlay').classList.add('hidden');
});

window.addEventListener('error', function(event) {
    console.error('Error occurred: ', event.message, ' at ', event.filename, ':', event.lineno);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection: ', event.reason);
});