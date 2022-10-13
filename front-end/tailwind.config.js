/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                myBackground: "#242a38",
                tableBG: "#1a1c28",
            },
        },
        container: {
            center: true,
        },
    },
    plugins: [],
};
