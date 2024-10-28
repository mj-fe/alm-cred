$(() => {
    $('#header').load('layout/navbar.html')
    $('#sidebar').load('layout/sidebar.html')

    $('body').on('click', '.sidebar-toggler', (e) => {
        $('#sidebar').toggleClass('hidden')
    })
})
