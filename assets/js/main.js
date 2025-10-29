(function () {
	var toggle = document.querySelector('.nav-toggle');
	var nav = document.querySelector('.site-nav');
	if (!toggle || !nav) return;
	toggle.addEventListener('click', function () {
		var expanded = toggle.getAttribute('aria-expanded') === 'true';
		toggle.setAttribute('aria-expanded', String(!expanded));
		nav.classList.toggle('open');
	});
})();

// Dropdown toggle for touch devices
(function () {
	var nav = document.querySelector('.site-nav');
	if (!nav) return;
	nav.addEventListener('click', function (e) {
		var target = e.target;
		if (target && target.classList && target.classList.contains('dropdown-toggle')) {
			e.preventDefault();
			var parent = target.closest('.has-dropdown');
			if (!parent) return;
			var menu = parent.querySelector('.dropdown-menu');
			if (!menu) return;
			if (nav.classList.contains('open')) {
				menu.style.display = menu.style.display === 'grid' || menu.style.display === 'block' ? 'none' : 'grid';
			}
		}
	});
})();

// Register service worker for offline/slow network support
(function () {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', function () {
			navigator.serviceWorker.register('./sw.js');
		});
	}
})();


