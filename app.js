/* =========================
   DEVVERSE CORE ENGINE
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CLOCK SYSTEM
       ========================= */
    function updateClock() {
        const clock = document.getElementById("clock");
        if (clock) {
            clock.innerText = new Date().toLocaleTimeString();
        }
    }
    updateClock();
    setInterval(updateClock, 1000);


    /* =========================
       NAVIGATION SYSTEM
       ========================= */
    window.showSection = function(id) {
        document.querySelectorAll(".section").forEach(sec => {
            sec.classList.remove("active");
        });

        const activeSection = document.getElementById(id);
        if (activeSection) {
            activeSection.classList.add("active");
        }
    };


    /* =========================
       THEME SYSTEM
       ========================= */
    const toggle = document.querySelector(".toggle");

    if (toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("light");

            const theme = document.body.classList.contains("light") ? "light" : "dark";
            localStorage.setItem("theme", theme);
        });

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            document.body.classList.add("light");
        }
    }


    /* =========================
       DRAG SYSTEM (UPGRADED)
       ========================= */

    let activeWidget = null;
    let offsetX = 0;
    let offsetY = 0;

    const widgets = document.querySelectorAll(".draggable");

    widgets.forEach(widget => {
        widget.style.position = "absolute";

        // Load saved position
        const saved = localStorage.getItem(widget.id);
        if (saved) {
            const pos = JSON.parse(saved);
            widget.style.left = pos.x + "px";
            widget.style.top = pos.y + "px";
        }

        // Mouse Down
        widget.addEventListener("mousedown", (e) => {
            activeWidget = widget;

            offsetX = e.clientX - widget.offsetLeft;
            offsetY = e.clientY - widget.offsetTop;

            widget.style.zIndex = 1000;
            widget.style.cursor = "grabbing";
            widget.style.transition = "none";
        });

        // Touch Support
        widget.addEventListener("touchstart", (e) => {
            activeWidget = widget;

            offsetX = e.touches[0].clientX - widget.offsetLeft;
            offsetY = e.touches[0].clientY - widget.offsetTop;
        });
    });

    // Global move
    document.addEventListener("mousemove", (e) => {
        if (!activeWidget) return;

        moveWidget(e.clientX, e.clientY);
    });

    document.addEventListener("touchmove", (e) => {
        if (!activeWidget) return;

        moveWidget(e.touches[0].clientX, e.touches[0].clientY);
    });

    function moveWidget(x, y) {
        const maxX = window.innerWidth - activeWidget.offsetWidth;
        const maxY = window.innerHeight - activeWidget.offsetHeight;

        let newX = x - offsetX;
        let newY = y - offsetY;

        // Boundary control
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        activeWidget.style.left = newX + "px";
        activeWidget.style.top = newY + "px";
    }

    // Release
    document.addEventListener("mouseup", releaseWidget);
    document.addEventListener("touchend", releaseWidget);

    function releaseWidget() {
        if (!activeWidget) return;

        localStorage.setItem(activeWidget.id, JSON.stringify({
            x: activeWidget.offsetLeft,
            y: activeWidget.offsetTop
        }));

        activeWidget.style.cursor = "grab";
        activeWidget.style.transition = "0.2s ease";

        activeWidget = null;
    }


    /* =========================
       RESET LAYOUT
       ========================= */
    window.resetLayout = function() {
        localStorage.clear();
        location.reload();
    };


    console.log("🚀 DevVerse PRO Loaded");

    
});