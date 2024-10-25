window.addEventListener('DOMContentLoaded', () => {
    const togglers = document.querySelectorAll('.sidebar-toggler')

    togglers?.forEach(btn => {
        btn?.addEventListener('click', (e) => {
            const sidebar = document.querySelector('#sidebar')

            sidebar.classList.toggle('hidden')
        })
    })
})
