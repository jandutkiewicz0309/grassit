import { createStore } from "solid-js/store";
import z from "zod";
import schema from "../Contact/ContactUs/schema";

export const [touched, setTouched] = createStore<{
  [K in keyof z.input<typeof schema>]?: boolean;
}>({});
