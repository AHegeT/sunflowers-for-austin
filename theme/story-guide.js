/* Chapter-aware, voluntary spoiler reveals. No tracking or server state. */
(() => {
    "use strict";
    const STORAGE_KEY = "sunflowers-for-austin:guide-progress:v1";
    const LAST_CHAPTER = 5;
    const ALL_CHAPTERS = 99;
    const chapters = {
        "01-leaving_austin.html": 1,
        "02-the_first_day.html": 2,
        "03-the_egg.html": 3,
        "04-the_funeral.html": 4,
        "05-the_song_of_the_mountains.html": 5,
    };
    const validProgress = value => {
        if (value === null || !/^\d+$/.test(String(value))) return 0;
        const number = Number(value);
        return number === ALL_CHAPTERS || (number >= 0 && number <= LAST_CHAPTER) ? number : 0;
    };

    function init() {
        const main = document.querySelector("main");
        if (!main || document.documentElement.lang !== "en") return;
        const filename = location.pathname.split("/").pop();
        const chapter = chapters[filename];
        const reveals = Array.from(main.querySelectorAll("details[data-reveal-after]"));
        const inGuide = location.pathname.includes("/guide/");
        if (!chapter && !inGuide && !reveals.length) return;

        let progress = 0;
        let storageAvailable = true;
        try { progress = validProgress(localStorage.getItem(STORAGE_KEY)); }
        catch (_) { storageAvailable = false; }

        const controls = document.createElement("section");
        controls.className = "story-guide-controls";
        controls.setAttribute("aria-label", "World Guide spoiler settings");
        const label = document.createElement("label");
        label.htmlFor = "story-guide-progress";
        label.textContent = "Show information through ";
        const select = document.createElement("select");
        select.id = "story-guide-progress";
        for (let number = 0; number <= LAST_CHAPTER; number++) {
            const option = document.createElement("option");
            option.value = String(number);
            option.textContent = number === 0 ? "Before the story" : `Chapter ${number}`;
            select.append(option);
        }
        const all = document.createElement("option");
        all.value = String(ALL_CHAPTERS);
        all.textContent = "All available chapters";
        select.append(all);
        const reset = document.createElement("button");
        reset.type = "button";
        reset.textContent = "Reset";
        const guideLink = document.createElement("a");
        const guideDepth = inGuide
            ? location.pathname.split("/guide/")[1].split("/").length - 1
            : 0;
        guideLink.href = inGuide ? "../".repeat(guideDepth) + "index.html" : "guide/index.html";
        guideLink.textContent = "World Guide";
        const status = document.createElement("p");
        status.className = "story-guide-status";
        status.setAttribute("role", "status");
        controls.append(label, select, reset, guideLink, status);
        main.prepend(controls);

        function apply() {
            select.value = String(progress);
            for (const details of reveals) {
                const threshold = Number(details.dataset.revealAfter);
                // Invalid metadata stays behind a warning instead of revealing.
                const eligible = Number.isInteger(threshold) && threshold >= 1 &&
                    threshold <= LAST_CHAPTER && progress >= threshold;
                details.open = eligible;
                details.dataset.available = String(eligible);
                const summary = details.querySelector("summary");
                if (summary) summary.textContent = eligible
                    ? `Through Chapter ${threshold} — hide or show`
                    : `Spoilers through Chapter ${threshold} — reveal anyway`;
            }
            const selection = progress === ALL_CHAPTERS ? "through all available chapters" :
                progress === 0 ? "before the story" : `through Chapter ${progress}`;
            status.textContent = `Showing information ${selection}. ` +
                (storageAvailable ? "Remembered in this browser." : "Storage unavailable; this setting lasts for this page.");
        }

        function save(value) {
            progress = validProgress(value);
            try { localStorage.setItem(STORAGE_KEY, String(progress)); }
            catch (_) { storageAvailable = false; }
            apply();
        }
        select.addEventListener("change", () => save(select.value));
        reset.addEventListener("click", () => save(0));
        window.addEventListener("storage", event => {
            if (event.key === STORAGE_KEY || event.key === null) {
                progress = validProgress(event.newValue);
                apply();
            }
        });

        if (chapter) {
            const footer = document.createElement("section");
            footer.className = "story-guide-finish";
            const finish = document.createElement("button");
            finish.type = "button";
            finish.textContent = `Finished Chapter ${chapter}`;
            const link = document.createElement("a");
            link.href = "guide/index.html";
            link.textContent = "Explore the World Guide";
            finish.addEventListener("click", () => {
                save(Math.max(progress, chapter));
                status.textContent += ` Chapter ${chapter} marked finished.`;
            });
            footer.append(finish, link);
            main.append(footer);
        }
        apply();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
