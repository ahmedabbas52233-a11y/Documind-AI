/** @type {import('tailwindcss').Config} */
export default {
  content:["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme:{
    extend:{
      colors:{
        teal:{500:"#14b8a6",600:"#0d9488"},
        surface:{900:"#080808",800:"#111111",700:"#1a1a1a"},
      },
      fontFamily:{
        sans:["Plus Jakarta Sans","system-ui","sans-serif"],
        mono:["JetBrains Mono","ui-monospace","monospace"],
      },
    },
  },
  plugins:[],
};
