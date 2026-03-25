$(document).ready(function() {
    // Typing Effect
    const textArray = ["BSIT Student", "Web Developer", "Fresh Graduate", "Future Software Engineer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeText() {
        const currentText = textArray[textIndex];
        
        if (isDeleting) {
            $('.typing-text').text(currentText.substring(0, charIndex - 1));
            charIndex--;
            typingDelay = 50;
        } else {
            $('.typing-text').text(currentText.substring(0, charIndex + 1));
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % textArray.length;
            typingDelay = 500;
        }

        setTimeout(typeText, typingDelay);
    }

    typeText();

    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css('box-shadow', '0 5px 20px rgba(255, 51, 51, 0.1)');
        } else {
            $('.navbar').css('box-shadow', 'none');
        }
        
        // Scroll to top button
        if ($(this).scrollTop() > 500) {
            $('#scrollTop').addClass('visible');
        } else {
            $('#scrollTop').removeClass('visible');
        }
    });

    // Smooth scroll for nav links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Active nav link on scroll
    $(window).scroll(function() {
        const scrollPos = $(document).scrollTop();
        $('.nav-links a').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));
            if (refElement.position().top - 100 <= scrollPos && 
                refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-links a').removeClass('active');
                currLink.addClass('active');
            }
        });
    });

    // Mobile menu toggle
    $('.hamburger').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // Close mobile menu on link click
    $('.nav-links a').click(function() {
        $('.nav-links').removeClass('active');
    });

    // Toggle button for about details
    $("#toggleBtn").click(function(){
        const details = $('#about-details');
        const btn = $(this);
        
        if(details.is(':visible')) {
            details.slideUp(500);
            btn.html("Show Details ▼");
        } else {
            details.slideDown(500);
            btn.html("Hide Details ▲");
        }
    });

    // Animate skill bars on scroll
    $(window).scroll(function() {
        $('.skill-progress').each(function() {
            const position = $(this).offset().top;
            const scrollPosition = $(window).scrollTop() + $(window).height();
            
            if(scrollPosition > position + 50) {
                $(this).css('width', '100%');
            }
        });
    });

    // Contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        const btn = $('.btn-submit');
        const originalText = btn.html();
        
        btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
        btn.prop('disabled', true);
        
        // Simulate form submission
        setTimeout(function() {
            btn.html('<i class="fas fa-check"></i> Message Sent!');
            btn.css('background', '#00ff88');
            
            setTimeout(function() {
                btn.html(originalText);
                btn.css('background', '');
                btn.prop('disabled', false);
                $('#contactForm')[0].reset();
            }, 3000);
        }, 2000);
    });

    // Scroll to top
    $('#scrollTop').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    // Add ripple effect to buttons
    $('.btn-primary, .btn-secondary, .btn-demo, .btn-code').click(function(e) {
        const x = e.pageX - $(this).offset().left;
        const y = e.pageY - $(this).offset().top;
        
        const ripple = $('<span class="ripple"></span>').css({
            'position': 'absolute',
            'background': 'rgba(255,255,255,0.3)',
            'border-radius': '50%',
            'transform': 'scale(0)',
            'animation': 'ripple 0.6s linear',
            'left': x,
            'top': y,
            'width': '20px',
            'height': '20px',
            'margin-left': '-10px',
            'margin-top': '-10px',
            'pointer-events': 'none'
        });
        
        $(this).append(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Add ripple keyframes
    $('<style>')
        .prop('type', 'text/css')
        .html('@keyframes ripple { to { transform: scale(4); opacity: 0; } }')
        .appendTo('head');

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('revealed');
            }
        });
    }, observerOptions);

    $('.timeline-item, .cert-card, .project-card, .exp-card').each(function() {
        $(this).css('opacity', '0').css('transform', 'translateY(30px)').css('transition', 'all 0.6s ease');
        observer.observe(this);
    });

    // Add CSS for revealed class
    $('<style>')
        .prop('type', 'text/css')
        .html('.revealed { opacity: 1 !important; transform: translateY(0) !important; }')
        .appendTo('head');
});