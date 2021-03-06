import path from 'path';
import fs from 'fs';
import { hostname } from 'os';

class Logger {
  constructor(logLevel, file) {
    if (Number.isNaN(Number.parseInt(logLevel, 10))) {
      this.enabled = false;
    } else {
      this.enabled = true;
      this.logLevel = Number.isNaN(logLevel) ? 0 : logLevel;

      if (file) {
        this.logToFile = true;
        this.file = path.resolve(file);
      } else {
        this.logToFile = false;
        this.file = '';
      }
    }
  }

  log(message) {
    if (!this.enabled || this.logLevel < message.logLevel) {
      return;
    }

    this.writeToConsole(message);

    if (this.logToFile) {
      this.writeToFile(message);
    }
  }

  static prepareMessage(message) {
    return `${new Date().toLocaleString()} - ${hostname()} - ${message.logLevel} - ${message.text}`;
  }

  writeToConsole(message) {
    console.log(this.constructor.prepareMessage(message));
  }

  writeToFile(message) {
    fs.appendFileSync(this.file, `${this.constructor.prepareMessage(message)}\n`);
  }
}

export default Logger;
