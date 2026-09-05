import { createStore } from "solid-js/store";
import type { ContactForm } from "../Contact/ContactUs/schema";

export const [touched, setTouched] = createStore<{
  [K in keyof ContactForm]?: boolean;
}>({});
