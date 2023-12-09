// Check if user is authenticated. If not, redirect to index.html
if (!sessionStorage.getItem('userEmail')) {
    console.log('User not authenticated. Redirecting to index.html');
    // User not authenticated, redirect to index.html
    window.location.href = './index.html';
} else {
    document.querySelector(".name").innerText = `Fornavn: ${sessionStorage.getItem('userName')}`;
    document.querySelector(".email").innerText = `E-mail: ${sessionStorage.getItem('userEmail')}`;
    document.querySelector(".lastname").innerText = `Efternavn: ${sessionStorage.getItem('userLastname')}`;
    //Add ^ to my favorites when done
}





// Logout functionality
const logoutButton = document.querySelector('#logout-button')
logoutButton.addEventListener('click', function() {
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userName');
    window.location.href = './index.html';
})
