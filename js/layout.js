const KEYS = {
    token: 'token'
}
const BASENAME = window.location.protocol === 'http:' ? '' : '/alm-cred'

$(() => {
    const token = localStorage.getItem(KEYS.token)

    // Load navbar
    $('#header').load('layout/navbar.html', () => {
        const backTo = $('#header').attr('back-to')
        const isLoggedIn = Boolean(JSON.parse(token))

        $('#logo-link').attr('href', isLoggedIn ? `${BASENAME}/home.html` : BASENAME)

        if (backTo) {
            $('.sidebar-toggler').addClass('d-none')

            if (backTo == 'history') {
                $('body').on('click', '#back-btn', (e) => {
                    history.back()
                })
            } else {
                $('#back-btn').attr('href', backTo)
            }

            $('#back-btn').removeClass('d-none')
        }
    })

    // Load sidebar
    $('#sidebar').load('layout/sidebar.html', () => {
        // Sidebar toggle
        $('body').on('click', '.sidebar-toggler', (e) => {
            $('#sidebar').toggleClass('hidden')
        })
    })

    // Login
    $('body').on('click', '#fake-login', (e) => {
        window.localStorage.setItem(KEYS.token, JSON.stringify(fakeToken()))
        window.location.href = `${window.location.origin}${BASENAME}/home.html`
    })

    // Logout
    $('body').on('click', '#logout', (e) => {
        window.localStorage.removeItem(KEYS.token)
        window.location.href = `${window.location.origin}${BASENAME}`
    })

    // Radio button
    $('body').on('change', '[data-update-on-change]', (e) => {
        const { updateOnChange, updateValue } = e.target.dataset
        const elementToUpdate = $(e.currentTarget).closest(updateOnChange)

        $('.radio-button').removeClass('selected')

        if (e.target.checked) {
            elementToUpdate.addClass(updateValue)
        } else {
            elementToUpdate.removeClass(updateValue)
        }
    })

    $('body').on('input', '[data-focus-next]', (e) => {
        const { focusNext, focusWhenLength } = e.target.dataset

        if (e.target.value.length == focusWhenLength)
            $(focusNext).focus()
    })
})

function fakeToken(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const token = Array.from({ length }, () => {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    })

    return token.join('');
}
