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

    // Paths are relative to the edition root. Add a page here to hide it until
    // the reader reaches its first appearance (99 means “All available chapters”).
    const pageReveals = {};
    const spanishChapters = ["01-dejando_austin.html", "02-el_primer_dia.html",
        "03-el_huevo.html", "04-el_funeral.html", "05-las_montanas.html"];

    function init() {
        const main = document.querySelector("main");
        if (!main) return;
        const spanish = document.documentElement.lang === "es";
        const editionRoot = new URL(typeof path_to_root === "string" && path_to_root ? path_to_root : "./", location.href);
        const pagePath = location.pathname.slice(editionRoot.pathname.length);
        const sidebar = document.querySelector("mdbook-sidebar-scrollbox") || document.querySelector(".sidebar-scrollbox");
        const language = document.createElement("nav");
        language.className = "story-language";
        language.setAttribute("aria-label", spanish ? "Idioma" : "Language");
        language.append(document.createTextNode(spanish ? "Idioma: " : "Language: "));
        const englishChapters = Object.keys(chapters);
        const chapterIndex = (spanish ? spanishChapters : englishChapters).indexOf(pagePath);
        for (const code of ["en", "es"]) {
            const link = document.createElement("a");
            link.textContent = code === "en" ? "English" : "Español";
            link.hreflang = code;
            const base = /\/(en|es)\/$/.test(editionRoot.pathname)
                ? new URL(`../${code}/`, editionRoot) : new URL(`/${code}/`, editionRoot);
            const target = chapterIndex >= 0 ? (code === "en" ? englishChapters : spanishChapters)[chapterIndex]
                : code === "en" && !spanish ? pagePath : "index.html";
            link.href = code === (spanish ? "es" : "en") ? location.href : new URL(target, base).href;
            if (code === (spanish ? "es" : "en")) link.setAttribute("aria-current", "true");
            language.append(link);
        }
        if (sidebar) sidebar.prepend(language);
        const filename = location.pathname.split("/").pop();
        const chapter = spanish ? spanishChapters.indexOf(filename) + 1 : chapters[filename];
        const reveals = Array.from(main.querySelectorAll("details[data-reveal-after]"));
        const inGuide = location.pathname.includes("/guide/");


        let progress = 0;
        let storageAvailable = true;
        try { progress = validProgress(localStorage.getItem(STORAGE_KEY)); }
        catch (_) { storageAvailable = false; }

        const controls = document.createElement("section");
        controls.className = "story-guide-controls";
        controls.setAttribute("aria-label", "World Guide spoiler settings");
        const label = document.createElement("label");
        label.htmlFor = "story-guide-progress";
        label.textContent = spanish ? "Mostrar información hasta" : "Show information through";
        const select = document.createElement("select");
        select.id = "story-guide-progress";
        for (let number = 0; number <= LAST_CHAPTER; number++) {
            const option = document.createElement("option");
            option.value = String(number);
            option.textContent = number === 0 ? (spanish ? "Antes de la historia" : "Before the story") : `${spanish ? "Capítulo" : "Chapter"} ${number}`;
            select.append(option);
        }
        const all = document.createElement("option");
        all.value = String(ALL_CHAPTERS);
        all.textContent = spanish ? "Todos los capítulos disponibles" : "All available chapters";
        select.append(all);
        const reset = document.createElement("button");
        reset.type = "button";
        reset.textContent = spanish ? "Restablecer" : "Reset";
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
        if (spanish) guideLink.remove();
        const sidebarPanel = document.querySelector("#mdbook-sidebar");
        if (sidebarPanel) {
            sidebarPanel.classList.add("story-sidebar");
            sidebarPanel.append(controls);
        } else if (sidebar) sidebar.append(controls);
        else main.prepend(controls);

        const pageBody = document.createElement("div");
        pageBody.className = "wiki-page-body";
        for (const child of Array.from(main.childNodes)) {
            if (child !== controls) pageBody.append(child);
        }
        main.append(pageBody);
        const pageWarning = document.createElement("section");
        pageWarning.className = "wiki-page-warning";
        pageWarning.hidden = true;
        main.prepend(pageWarning);
        const thresholdFor = href => {
            const url = new URL(href, location.href);
            return url.origin === editionRoot.origin && url.pathname.startsWith(editionRoot.pathname)
                ? pageReveals[url.pathname.slice(editionRoot.pathname.length)] : undefined;
        };
        const gatedLinks = Array.from(document.querySelectorAll("a[href]"))
            .map(link => ({link, threshold: thresholdFor(link.href)}))
            .filter(item => item.threshold !== undefined && !item.link.closest(".story-language"));
        const pageThreshold = pageReveals[pagePath];

        const originalTitle = document.title;
        function apply() {
            select.value = String(progress);
            for (const {link, threshold} of gatedLinks) {
                const container = link.closest("li.chapter-item") || link;
                container.hidden = progress < threshold;
                // Avoid empty pager spacing when the next/previous page is hidden.
                if (link.classList.contains("nav-chapters")) link.hidden = progress < threshold;
            }
            const pageHidden = pageThreshold !== undefined && progress < pageThreshold;
            pageBody.hidden = pageHidden;
            pageWarning.hidden = !pageHidden;
            if (pageHidden) {
                pageWarning.replaceChildren();
                const heading = document.createElement("h1");
                heading.textContent = "This page contains later story information";
                const explanation = document.createElement("p");
                explanation.textContent = `This page appears after Chapter ${pageThreshold}. Change “Show information through” in the sidebar to reveal it.`;
                pageWarning.append(heading, explanation);
                document.title = "Unrevealed page — Sunflowers for Austin";
            } else document.title = originalTitle;
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
            status.textContent = (spanish ? `Información: ${select.selectedOptions[0].textContent}. ` : `Showing information ${selection}. `) +
                (storageAvailable ? (spanish ? "Guardado en este navegador." : "Remembered in this browser.") : (spanish ? "Este ajuste dura solo en esta página." : "Storage unavailable; this setting lasts for this page."));
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
            finish.textContent = spanish ? `Terminé el capítulo ${chapter}` : `Finished Chapter ${chapter}`;
            const link = document.createElement("a");
            link.href = "guide/index.html";
            link.textContent = "Explore the World Guide";
            finish.addEventListener("click", () => {
                save(Math.max(progress, chapter));
                status.textContent += ` Chapter ${chapter} marked finished.`;
            });
            footer.append(finish);
            if (!spanish) footer.append(link);
            main.append(footer);
        }
        apply();
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
