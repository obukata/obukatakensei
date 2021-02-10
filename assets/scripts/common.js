(function() {

/*====================================

	variables

====================================*/


/*====================================

	event

====================================*/

	window.addEventListener('DOMContentLoaded', () => {
		Squib.navigation()
	}, false)


/*====================================

	function

====================================*/

	const Squib = {
		navigation() {
			const navIcon = document.querySelector('#js--header-nav-icon')
			const header = document.querySelector('#js--page-header')
			navIcon.addEventListener('click', () => {
				header.classList.toggle('is--nav-open')
			})
		}
	}

})()
