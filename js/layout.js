const KEYS = {
    token: 'token'
}

$(() => {
    const token = localStorage.getItem(KEYS.token)

    $('#header').load('layout/navbar.html', () => {
        const backTo = $('#header').attr('back-to')
        const isLoggedIn = Boolean(JSON.parse(token))

        $('#logo-link').attr('href', isLoggedIn ? 'home.html' : '/')

        if (backTo) {
            $('.sidebar-toggler').addClass('d-none')
            $('#back-btn').attr('href', backTo).removeClass('d-none')
        }
    })

    $('#sidebar').load('layout/sidebar.html')

    $('body').on('click', '.sidebar-toggler', (e) => {
        $('#sidebar').toggleClass('hidden')
    })

    $('body').on('click', '#fake-login', (e) => {
        window.localStorage.setItem(KEYS.token, JSON.stringify(fakeToken()))
        window.location.href = `${window.location.origin}/home.html`
    })
})

function fakeToken(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const token = Array.from({ length }, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    })

    return token.join('');
}
