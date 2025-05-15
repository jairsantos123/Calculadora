class ThemeSwitcher {
    constructor() {
        this.ThemeToggle = document.getElementById("theme-toggle")
        this.currentTheme = localStorage.getItem("theme") || "light"

        this.initTheme()
        this.initEventListeners()
    }

    initTheme() {
        if (
            this.currentTheme === "dark" || 
            (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)"
        ).matches)
    ) {
            document.documentElement.setAttribute("data-theme", "dark")
            this.currentTheme = "dark"
        
        } else {
            document.documentElement.removeAttribute("data-theme")
            this.currentTheme = "light"
        }

        localStorage.setItem("theme", this.currentTheme)
    }

    initEventListeners() {
        this.ThemeToggle.addEventListeners("click", () => {
            this.ToggleTheme()

        })
    window.matchMedia("(prefers-color-scheme: dark)").addEventListeners("change", (e) => {
        if (!localStorage.getItem("theme")) {
            this.currentTheme = e.matches ? "dark" : "light"
            this.initTheme()
        }
    })

    }

    ToggleTheme() {
        if (this.currentTheme === "light") {
            document.documentElement.setAttribute("data-theme", "dark")
            this.currentTheme = "dark"
        } else {
            document.documentElement.removeAttribute("data-theme")
            this.currentTheme = "light"
        }

        localStorage.setItem("theme", this.currentTheme)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const themeSwitcher = new ThemeSwitcher()
})