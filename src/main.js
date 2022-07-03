import { createApp } from "vue";
import { Form, Field, CellGroup, SwipeCell, Divider, Checkbox } from "vant";
import App from "./App.vue";

const app = createApp(App);
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.use(SwipeCell);
app.use(Divider);
app.use(Checkbox);
app.mount("#app");
