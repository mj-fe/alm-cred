window.addEventListener('load', function () {
    const page = window.location.pathname
    console.log({ page })

    switch (page) {
        case '/index.html':
            console.log('nao logado')
            break;

        default:
            break;
    }
});
