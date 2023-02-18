export type AlertType = 'primary' | 'success' | 'danger' | 'warning';

export type IAlert = {
  id: string;
  type: AlertType;
  message: string;
  timer: NodeJS.Timer | null;
};

export type AlertFunction = (
  type: AlertType,
  message: string,
  ms?: number
) => void;

export default alert;
