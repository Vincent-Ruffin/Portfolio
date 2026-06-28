$('.load > img').addClass('visible');
var parallaxMargin = 1000;
var titleMargin = 600;
var contentMargin = 400;
var scrollWidth = window.innerWidth - document.documentElement.clientWidth;
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

/* Menu responsive */
function toggleMenu() {
	if ($('.menu').hasClass('open')) {
		$('.menu a.hamburger').first().css('display','block');
		$('.menu a.hamburger').last().css('display','none');
		$('.menu a:not(.hamburger)').slideUp(300);
		if ($(window).scrollTop() + parseFloat($('nav').css('height')) < parseFloat($('nav').css('height')) * 2) {
			$('nav').addClass('onTop');
		}
		$('.menu').removeClass('open');
	} else {
		$('.menu a.hamburger').first().css('display','none');
		$('.menu a.hamburger').last().css('display','block');
		$('.menu a:not(.hamburger)').slideDown(300);
		$('nav').removeClass('onTop');
		$('.menu').addClass('open');
	}
}

/* Fix menu responsive */
function fixMenu() {
	if ($('body').height() > 780) {
		$('.menu a').css('display', '');
	}
}

/* Affichage bouton toTop */
function toTop(position) {
	if (position >= parseFloat($('nav').css('height')) * 2) {
		$('.toTop').addClass("animate");
	} else {
		$('.toTop').removeClass("animate");
	}
}

/* Progression du menu */
function progress(position) {
	if (position < parseFloat($('nav').css('height')) * 2) {
		if(!$('.menu').hasClass('open')) {
			$('nav').addClass('onTop');
		}
		$('#homeB').addClass('current');
	} else if (position < $('#about').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').addClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').removeClass('current');
	} else if (position < $('#skills').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').addClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').removeClass('current');
	} else if (position < $('#portfolio').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').addClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').removeClass('current');
	} else if (position < $('#contact').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').addClass('current');
		$('#contactB').removeClass('current');
	} else {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').addClass('current');
	}
}

/* Animations page */
function animate(position) {
	// A propos
	if (position >= $('#about').position().top - titleMargin) {
		$('#about h1').addClass('animate');
	}
	if (position >= $('#about').position().top - contentMargin) {
		$('.presentation > .presText, .presentation > img').addClass('animate');
		setTimeout(function() {
			$('#about .button').addClass('animate');
			var timeout = animateText() + 500;
			setTimeout(function() {
				$('#about .button').addClass('bounce');
			}, timeout);
		}, 900);
	}
	if (position >= $('#skills').position().top - parallaxMargin) {
		$('.about-bg, .about-bg > div').addClass('animate');
	}

	// Compétences
	if (position >= $('#skills').position().top - titleMargin) {
		$('#skills h1').addClass('animate');
	}
	if (position >= $('#skills').position().top - contentMargin) {
		$('.computer, .tech, .comp').addClass('animate');
	}
	if (position >= $('#portfolio').position().top - parallaxMargin) {
		$('.skills-bg, .skills-bg > div').addClass('animate');
	}

	// Portofolio
	if (position >= $('#portfolio').position().top - titleMargin) {
		$('#portfolio h1').addClass('animate');
	}
	if (position >= $('#portfolio').position().top - contentMargin) {
		var timeout = 0;
		$('.project').each(function() {
			var that = this;
			setTimeout(function() {
				$(that).addClass('animate');
			}, timeout);
			timeout += 300;
		});
	}
	if (position >= $('#contact').position().top - parallaxMargin) {
		$('.port-bg').addClass('animate');
		var timeout = 0;
		$('.port-bg > div > div').each(function() {
			var that = this;
			setTimeout(function() {
				$(that).addClass('animate');
				var numberSpan = $(that).find('.number');
				if (!numberSpan.hasClass('finish')) {
					var number = numberSpan.text();
					numberSpan.text(0);
					for (let i = 0 ; i <= number ; i++) {
						setTimeout(function() {
							numberSpan.text(i);
						}, i * 100 + 900);
					}
					numberSpan.addClass('finish');
				}
			}, timeout);
			timeout += 250;
		});
	}

	// Contact
	if (position >= $('#contact').position().top - titleMargin) {
		$('#contact h1').addClass('animate');
	}
	if (position >= $('#contact').position().top - contentMargin) {
		$('.contactForm, .contactMe').addClass('animate');
		setTimeout(function() {
			$('#contact .button').addClass('animate');
		}, 1500);
	}
}

/* Animations textes */
function animateText() {
	var timeout = 0;
	$('.presentation > .presText span').each(function() {
		var that = this;
		setTimeout(function() {
			$(that).removeClass('resetColor');
		}, timeout);
		timeout += 500;
	});
	return timeout;
}

/* Parallax */
function isInViewport(node) {
	var rect = node.getBoundingClientRect();
	return (
	  (rect.height > 0 || rect.width > 0) &&
	  rect.bottom >= 0 &&
	  rect.right >= 0 &&
	  rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
	  rect.left <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function parallax() {
	var scroll = $(window).scrollTop();
	$('.parallax').each(function(index, element) {
	  var topY = $(this).offset().top;
	  var height = $(this).height();
  
	  if(isInViewport(this)) {
		var diff = scroll - topY;
		var ratio = Math.round((diff / height) * 100);
		$(this).css('background-position','center ' + parseInt(-(ratio * 0.6)) + 'px');
	  }
	});
}

/* Fix Écran d'accueil */
function fixAccueil() {
	if($('#home').width() > $('#home').height() * 1.5) {
		$('#home').removeClass('run-animation-port').addClass('run-animation');
	} else {
		$('#home').removeClass('run-animation').addClass('run-animation-port');
	}
}

/* Appel des différentes fonctions */
$(window).on('load', function() {
	// Écran de chargement
	$('body').css('overflow', 'auto');
	$('.load').css('width', '100vw');
	$('.load').fadeOut();
	scrollWidth = window.innerWidth - document.documentElement.clientWidth;

	var position = $(window).scrollTop() + parseFloat($('nav').css('height'));

	progress(position);
	toTop(position);
	animate(position);
	if (iOS) {
		$('.parallax').css('background-attachment', 'scroll');
		$('#home').removeClass('run-animation');
		$('#home').css('background-size', 'cover');
	} else {
		parallax();
		fixAccueil();
	}
});

$(window).scroll(function() {
	var position = $(window).scrollTop() + parseFloat($('nav').css('height')) + 2;

	progress(position);
	toTop(position);
	animate(position);
	if (!iOS) {
		parallax();
	}
});

$(window).resize(function() {
	if (!iOS) {
		fixAccueil();
	}
	fixMenu();
});

/* Défilement fluide */
$('nav a[href^="#"], .scrollDown, .toTop a').click(function() {
    var id = $(this).attr('href');
	if (id === '#') {
		return;
	}

	if($(this).parent().hasClass('open')) {
		toggleMenu();
	}

	jQuery.easing.def = 'easeInOutExpo';
	$('html, body').animate({
		scrollTop: ($(id).offset().top - parseFloat($('nav').css('height')))
	}, 1500);
	return false;
});

/* Affichages project (et Mentions légales) */
// Ouverture
$('a.project, a.ment').click(function() {
	var id = $(this).attr('href');

	$('body').css('overflow','hidden');
	$('body, nav').css('padding-right', scrollWidth);
	$('footer').css('width', '100vw').css('padding-right', '+=' + scrollWidth + 'px');
	$('.toTop').css('right', '+=' + scrollWidth + 'px');
	$(id + ', .overlayBg').fadeIn(300);
	$(id).scrollTop(0);
	return false;
});

// Fermeture
$('a.close').click(function() {
	var id = $(this).attr('href');

	$(id + ' .overlayVid').trigger('pause');
	$(id + ', .overlayBg').fadeOut(300);
	setTimeout(function() {
		$(id).scrollTop(0);
	}, 299);
	setTimeout(function() {
		$('.toTop').css('right', '-=' + scrollWidth + 'px');
		$('footer').css('padding-right', '-=' + scrollWidth + 'px').css('width', '');
		$('body, nav').css('padding-right', 0);
		$('body').css('overflow','auto');
	}, 300);
	return false;
});

// Précédent
$('a.prec').click(function() {
	var idPrec = $(this).attr('href');
	var idCurr = '#' + $(this).parent().parent().attr('id');
	var width = window.innerWidth;

	$(idPrec).css('left', '-' + width + 'px');
	$(idPrec).css('overflow', 'hidden');
	$(idPrec).css('padding-right', scrollWidth);
	$(idPrec).show();

	$(idCurr + ' .overlayVid').trigger('pause');

	$(idPrec).animate({
		left: '0px'
	}, 300, function() {
		$(idPrec).css('padding-right', 0);
		$(idPrec).css('overflow', 'auto');
	});

	$(idCurr).animate({
		left: width + 'px'
	}, 300, function() {
		$(idCurr).scrollTop(0);
		$(idCurr).hide();
		$(idCurr).css('left', 0);
	});
	return false;
});

// Suivant
$('a.next').click(function() {
	var idNext = $(this).attr('href');
	var idCurr = '#' + $(this).parent().parent().attr('id');
	var width = window.innerWidth;

	$(idNext).css('left', width + 'px');
	$(idNext).show();

	$(idNext).animate({
		left: '0px'
	}, 300);

	$(idCurr).css('overflow', 'hidden');
	$(idCurr).css('padding-right', scrollWidth);
	$(idCurr + ' .overlayVid').trigger('pause');

	$(idCurr).animate({
		left: '-' + width + 'px'
	}, 300, function() {
		$(idCurr).scrollTop(0);
		$(idCurr).hide();
		$(idCurr).css('left', 0);
		$(idCurr).css('padding-right', 0);
		$(idCurr).css('overflow', 'auto');
	});
	return false;
});

/* Formulaire de contact */
$('.contactForm').on('submit', function(e) {
	e.preventDefault();

	var name = $('#name').val();
	var email = $('#email').val();
	var subject = $('#subject').val();
	var message = $('#message').val();

	$.ajax({
		url:'https://formspree.io/mbjorpvb',
		method: 'POST',
		data: {
			Nom: name,
			_replyto: email,
			Email: email,
			Message: message,
			_subject: subject,
			Sujet: subject,
		},
		dataType:"json",
		success:function() {
			$('.status').addClass('animate');
			$('#name').val('');
			$('#email').val('');
			$('#subject').val('');
			$('#message').val('');
			$('#checkRGPD').prop('checked', false);
			setTimeout(function() {
				$('.status').removeClass('animate');
			}, 4000);
		}
	})
});

/* Rotations */
$('#title').on('mouseover', function() {
	if (!$('#title').hasClass('rotate')) {
		$('#title').addClass('rotate');
		if($('#title').hasClass('colored')) {
			$('#title').removeClass('colored');
		} else {
			$('#title').addClass('colored');
		}
		setTimeout(function() {
			$('#title').removeClass('rotate');
		}, 1200);
	}
});

$('.computer').on('mouseover', function() {
	if (!$('.computer').hasClass('rotate')) {
		$('.computer').addClass('rotate');
		setTimeout(function() {
			$('.computer').removeClass('rotate');
		}, 3000);
	}
});

/* ── Barre de progression de lecture ── */
(function () {
	var bar = document.querySelector('.scroll-progress');
	if (!bar) return;
	function updateProgress() {
		var total = document.documentElement.scrollHeight - window.innerHeight;
		if (total <= 0) return;
		bar.style.width = (window.scrollY / total * 100) + '%';
	}
	window.addEventListener('scroll', updateProgress, { passive: true });
	updateProgress();
})();

/* ── Scroll reveal via Intersection Observer ── */
(function () {
	if (!('IntersectionObserver' in window)) {
		/* Fallback pour vieux navigateurs : tout afficher directement */
		document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
			.forEach(function (el) { el.classList.add('visible'); });
		return;
	}

	var io = new IntersectionObserver(function (entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				io.unobserve(entry.target);
			}
		});
	}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

	/* Stagger automatique sur les cartes portfolio */
	document.querySelectorAll('.port .project.reveal').forEach(function (el, i) {
		el.style.transitionDelay = (i % 3 * 0.13) + 's';
		io.observe(el);
	});

	/* Timeline, contact et autres reveals */
	document.querySelectorAll(
		'.timeline-content.reveal-left, .timeline-content.reveal-right, ' +
		'.contact-info.reveal-left, .contactForm.reveal-right, ' +
		'.reveal-scale'
	).forEach(function (el) { io.observe(el); });
})();

/* ── Canvas particules home (réseau losanges dynamiques) ── */
(function () {
	var canvas = document.getElementById('home-canvas');
	if (!canvas) return;
	var ctx = canvas.getContext('2d');

	var W, H, dots = [];
	var N      = 180;       // nombre de points
	var DIST   = 150;       // distance max de connexion
	var SPEED  = 0.4;       // vitesse des points
	var COLOR  = '93,138,168';

	function resize() {
		var rect = canvas.parentElement.getBoundingClientRect();
		W = canvas.width  = rect.width;
		H = canvas.height = rect.height;
	}

	function mkDot() {
		var angle = Math.random() * Math.PI * 2;
		var spd   = SPEED * (0.5 + Math.random() * 0.5);
		return {
			x:  Math.random() * W,
			y:  Math.random() * H,
			vx: Math.cos(angle) * spd,
			vy: Math.sin(angle) * spd,
			r:  1.4 + Math.random() * 1.2
		};
	}

	function init() {
		resize();
		dots = [];
		for (var i = 0; i < N; i++) dots.push(mkDot());
	}

	function draw() {
		ctx.clearRect(0, 0, W, H);

		/* Déplacement + rebond */
		dots.forEach(function (d) {
			d.x += d.vx;
			d.y += d.vy;
			if (d.x < 0)  { d.x = 0;  d.vx *= -1; }
			if (d.x > W)  { d.x = W;  d.vx *= -1; }
			if (d.y < 0)  { d.y = 0;  d.vy *= -1; }
			if (d.y > H)  { d.y = H;  d.vy *= -1; }
		});

		/* Connexions — forme losanges naturellement */
		for (var i = 0; i < dots.length; i++) {
			for (var j = i + 1; j < dots.length; j++) {
				var dx   = dots[i].x - dots[j].x;
				var dy   = dots[i].y - dots[j].y;
				var dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < DIST) {
					var alpha = (1 - dist / DIST) * 0.35;
					ctx.beginPath();
					ctx.strokeStyle = 'rgba(' + COLOR + ',' + alpha + ')';
					ctx.lineWidth   = 0.9;
					ctx.moveTo(dots[i].x, dots[i].y);
					ctx.lineTo(dots[j].x, dots[j].y);
					ctx.stroke();
				}
			}
		}

		/* Points */
		dots.forEach(function (d) {
			ctx.beginPath();
			ctx.fillStyle = 'rgba(' + COLOR + ',0.55)';
			ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
			ctx.fill();
		});

		requestAnimationFrame(draw);
	}

	window.addEventListener('resize', init);
	init();
	draw();
})();

/* ── Animation cinématique home ── */
(function () {
	var typed = document.querySelector('.student-typed');
	if (!typed) return;

	var text = 'Chef de Projet';
	var i = 0;

	/* Typing démarre après l'entrée du nom (~1s) */
	setTimeout(function typeNext() {
		if (i < text.length) {
			typed.textContent += text[i++];
			setTimeout(typeNext, 62);
		} else {
			/* Curseur disparaît après 2.5s */
			setTimeout(function () {
				var cursor = document.querySelector('.student-cursor');
				if (cursor) {
					cursor.style.transition = 'opacity 0.4s';
					cursor.style.opacity = '0';
				}
			}, 2500);
		}
	}, 980);

	/* Tags — spring pop en cascade après le typing */
	document.querySelectorAll('.home-tags span').forEach(function (tag, i) {
		setTimeout(function () {
			tag.style.animation = 'tagPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
		}, 1850 + i * 115);
	});
})();