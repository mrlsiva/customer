import { Injectable } from '@angular/core';
import { LogLevel } from 'src/app/shared/enum/log-level.enum';

export type LogOutput = (
  source?: string,
  level?: LogLevel,
  ...objects: any[]
) => void;

@Injectable({
  providedIn: 'root'
})

export class CommonLoggerService {
  /**
     * Current logging level.
     * Set it to LogLevel.Off to disable logs completely.
     */
  static level = LogLevel.Debug;

  /**
   * Additional log outputs.
   */
  static outputs: LogOutput[] = [];

  /**
   * Enables production mode.
   * Sets logging level to LogLevel.Warning.
   */
  static enableProductionMode() {
    CommonLoggerService.level = LogLevel.Warning;
  }

  private source?: string;

  constructor() { }

  /**
   * Logs messages or objects  with the debug level.
   * Works the same as console.log().
   */
  debug(...objects: any[]) {
    this.log(
      this.highlight(console.log, LogLevel.Debug),
      LogLevel.Debug,
      objects
    );
  }

  /**
   * Logs messages or objects  with the info level.
   * Works the same as console.log().
   */
  info(...objects: any[]) {
    this.log(
      this.highlight(console.info, LogLevel.Info),
      LogLevel.Info,
      objects
    );
  }

  /**
   * Logs messages or objects  with the warning level.
   * Works the same as console.log().
   */
  warn(...objects: any[]) {
    this.log(
      this.highlight(console.warn, LogLevel.Warning),
      LogLevel.Warning,
      objects
    );
  }

  /**
   * Logs messages or objects  with the error level.
   * Works the same as console.log().
   */
  error(...objects: any[]) {
    this.log(
      this.highlight(console.error, LogLevel.Error),
      LogLevel.Error,
      objects
    );
  }

  highlight(func: Function, level: LogLevel) {
    let style;
    switch (level) {
      case 4:
        style = 'background: blue; color: white';
        break;
      case 3:
        style = 'background: blue; color: white';
        break;
      case 2:
        style = 'background: yellow; color: black';
        break;
      case 1:
        style = 'background: red; color: white';
        break;
      default:
        break;
    }
    return func.bind(window.console, '%c %s', style);
  }

  private log(func: Function, level: LogLevel, objects: any[]) {
    if (level <= CommonLoggerService.level) {
      const prefix = ['[' + func.name + ']:'];
      const log = this.source
        ? ['[' + this.source + ']'].concat(objects)
        : objects;
      func.apply(window.console, prefix.concat(log));
      CommonLoggerService.outputs.forEach((output: any) =>
        output.apply(output, [this.source, level].concat(objects as any[]))
      );
    }
  }

}

