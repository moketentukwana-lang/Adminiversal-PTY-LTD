```javascript
/* =========================================================
   ADMINIVERSAL
   COMPLETE WEBSITE JAVASCRIPT
   Universal Support. Simplified Administration.
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navigationWrapper = document.querySelector(".navigation-wrapper");
    const navigationLinks = document.querySelectorAll(".nav-links a");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const sections = document.querySelectorAll("main section[id]");
    const currentYear = document.querySelector("#current-year");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function openMenu() {

        if (!menuToggle || !navigationWrapper) {
            return;
        }

        navigationWrapper.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");

        updateBodyScroll();
    }


    function closeMenu() {

        if (!menuToggle || !navigationWrapper) {
            return;
        }

        navigationWrapper.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");

        updateBodyScroll();
    }


    function toggleMenu() {

        if (!navigationWrapper) {
            return;
        }

        if (
            navigationWrapper.classList.contains("active")
        ) {

            closeMenu();

        } else {

            openMenu();

        }
    }


    /* =====================================================
       MOBILE MENU BUTTON
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMenu();

            }
        );

    }


    /* =====================================================
       CLOSE MENU WHEN NAVIGATION LINK IS CLICKED
    ===================================================== */

    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMenu();

            }
        );

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (!navigationWrapper || !menuToggle) {
                return;
            }

            const clickedInsideNavigation =
                navigationWrapper.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                navigationWrapper.classList.contains("active") &&
                !clickedInsideNavigation &&
                !clickedMenuButton
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navigationWrapper &&
                navigationWrapper.classList.contains("active")
            ) {

                closeMenu();

                if (menuToggle) {
                    menuToggle.focus();
                }

            }

        }
    );


    /* =====================================================
       RESPONSIVE BREAKPOINT
    ===================================================== */

    const mobileMediaQuery =
        window.matchMedia("(max-width: 760px)");


    function handleResponsiveChange() {

        if (!mobileMediaQuery.matches) {

            closeMenu();

        }

    }


    if (mobileMediaQuery.addEventListener) {

        mobileMediaQuery.addEventListener(
            "change",
            handleResponsiveChange
        );

    } else {

        mobileMediaQuery.addListener(
            handleResponsiveChange
        );

    }


    /* =====================================================
       PREVENT BODY SCROLL WHILE MOBILE MENU IS OPEN
    ===================================================== */

    function updateBodyScroll() {

        if (
            window.innerWidth <= 760 &&
            navigationWrapper &&
            navigationWrapper.classList.contains("active")
        ) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";

        }

    }


    window.addEventListener(
        "resize",
        updateBodyScroll
    );


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    !targetID.startsWith("#") ||
                    targetID === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(targetID);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                closeMenu();

            }
        );

    });


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    function updateActiveNavigation() {

        if (!sections.length) {
            return;
        }

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-main, " +
            ".about-highlight, " +
            ".service-card, " +
            ".value-card, " +
            ".contact-box"
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       SERVICE CARD STAGGER
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );


    serviceCards.forEach(function (card, index) {

        card.style.transitionDelay =
            (index * 0.08) + "s";

    });


    /* =====================================================
       VALUE CARD STAGGER
    ===================================================== */

    const valueCards =
        document.querySelectorAll(
            ".value-card"
        );


    valueCards.forEach(function (card, index) {

        card.style.transitionDelay =
            (index * 0.08) + "s";

    });


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       INITIAL BODY SCROLL STATE
    ===================================================== */

    updateBodyScroll();


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       CONSOLE CONFIRMATION
    ===================================================== */

    console.log(
        "ADMINIVERSAL website loaded successfully."
    );

});
```
