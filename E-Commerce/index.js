const navbar = document.querySelector('#navbar');
const content = document.querySelector('#content');

navbar.addEventListener('click', function(event) {
	const page = event.target.getAttribute('href').substr(1);
	const currentPage = content.querySelector('.visibile');
	if (currentPage) {
		currentPage.classList.remove('visibile');
		currentPage.classList.add('invisibile');
	}
	content.querySelector('#' + page).classList.add('visibile');
	content.querySelector('#' + page).classList.remove('invisibile');
});
