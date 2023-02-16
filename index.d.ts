import { AlertFunction } from "./src/utils/alert";

declare global {
  interface Window {
    _alert: AlertFunction;
  }
}
