// Command模式 - 支持撤销/重做

export interface ICommand {
  execute(): void;
  undo(): void;
  canExecute(): boolean;
}

export class CommandHistory {
  private history: ICommand[] = [];
  private currentIndex: number = -1;
  private maxHistorySize: number = 100;

  execute(command: ICommand): void {
    if (!command.canExecute()) {
      throw new Error('命令无法执行');
    }

    command.execute();
    
    // 清除当前位置之后的历史
    this.history = this.history.slice(0, this.currentIndex + 1);
    
    // 添加新命令
    this.history.push(command);
    this.currentIndex++;

    // 限制历史大小
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  undo(): boolean {
    if (!this.canUndo()) return false;
    
    this.history[this.currentIndex].undo();
    this.currentIndex--;
    return true;
  }

  redo(): boolean {
    if (!this.canRedo()) return false;
    
    this.currentIndex++;
    this.history[this.currentIndex].execute();
    return true;
  }

  canUndo(): boolean {
    return this.currentIndex >= 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}
