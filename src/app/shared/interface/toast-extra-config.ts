export interface ToastExtraConfig {
  /** Show user profile icon */
  showProfile?: boolean;
  /** Show Title in toast bar */
  showTitle?: boolean;
  /** Hide / Show close cross button */
  closeButton?: boolean;
  /** Allow / Disallow auto close toast */
  disableTimeOut?: boolean;
  /** Toast auto close timeout time (milliseconds) */
  timeOut?: number;
}
