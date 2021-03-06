class LogManifest {
  maxLogs = 5;
  entries: string[] = [];
  lastEntry: string = "";
  lastEntryCount: number = 1;

  addEntry(txt: string) {
    if (txt === this.lastEntry) {
      this.lastEntryCount++;
      this.entries.pop();
      this.entries.push(`${txt} (x${this.lastEntryCount})`);
    } else {
      this.entries.push(txt);
      this.lastEntryCount = 1;
    }

    this.lastEntry = txt;
    // Ensure we never go above max
    while (this.entries.length > this.maxLogs) this.entries.shift();
  }

  length() {
    return this.entries.length;
  }
}

export const Log = new LogManifest();
