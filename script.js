const serviceLists = document.querySelectorAll('.nav-dropdown');
const menuIcon = document.querySelector("#menu-icon");
const menuContent = document.querySelector("#hamburger-menu");



menuIcon.addEventListener('click', function() {
    menuContent.classList.toggle('active');
    menuIcon.classList.toggle('bx-menu');
    menuIcon.classList.toggle('bxs-x-square')
});



//add display to child of nav-dropdown
serviceLists.forEach(list => {
    list.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    list.addEventListener('mouseleave', function() {
        this.classList.remove('active');
    })
});