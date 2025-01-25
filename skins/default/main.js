jQuery(function ($) {
    document.querySelectorAll(".comparison-slider").forEach((element) => {
        const slider = document.createElement("div");
        const resizeElement = element.getElementsByTagName("figure")[1];
        if (!resizeElement) return;

        const figcaption = {
            first: element.getElementsByTagName("figcaption")[0],
            second: element.getElementsByTagName("figcaption")[1],
        };

        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        const slide = (event) => {
            const clientX = event.clientX ?? event.touches[0].clientX;
            const rect = element.getBoundingClientRect();
            let x = clientX - rect.left;
            
            // 화살표가 완전히 왼쪽으로 이동할 수 있도록 수정
            x = Math.max(0, Math.min(x, rect.width));
            
            const percentage = (x / rect.width) * 100;

            slider.style.left = `${percentage}%`;
            resizeElement.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;

            // 캡션 처리 개선
            if (figcaption.first) {
                figcaption.first.classList.toggle("hide", x <= figcaption.first.offsetWidth);
            }

            if (figcaption.second) {
                figcaption.second.classList.toggle("hide", rect.width - x <= figcaption.second.offsetWidth);
            }
        };

        const dragStart = (event) => {
            event.preventDefault();
            document.addEventListener("mousemove", slide);
            document.addEventListener("touchmove", slide);
            element.classList.add("dragging");
        };

        const dragDone = () => {
            document.removeEventListener("mousemove", slide);
            document.removeEventListener("touchmove", slide);
            element.classList.remove("dragging");
        };

        slider.addEventListener("mousedown", dragStart);
        slider.addEventListener("touchstart", dragStart);

        document.addEventListener("mouseup", dragDone);
        document.addEventListener("touchend", dragDone);
        document.addEventListener("touchcancel", dragDone);

        // 슬라이더 및 화살표 설정
        slider.classList.add("slider");
        arrow.setAttribute("width", "20");
        arrow.setAttribute("height", "20");
        arrow.setAttribute("viewBox", "0 0 30 30");
        path.setAttribute(
            "d",
            "M1,14.9l7.8-7.6v4.2h12.3V7.3l7.9,7.6l-7.9,7.7v-4.2H8.8v4.2L1,14.9z"
        );
        arrow.append(path);
        slider.append(arrow);

        element.append(slider);
    });
});