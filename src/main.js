import { createApp } from "vue"
import App from "./App"
import router from "./router/index.js"

createApp(App).use(router).mount(document.getElementById('app'))