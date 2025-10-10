// backend/src/utils/generateShortId.js
import { nanoid } from "nanoid";

export default function generateShortId() {
  return nanoid(7); // generate 7-char unique ID
}
