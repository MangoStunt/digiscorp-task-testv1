import Dexie, {Table} from 'dexie';
import {UserInterface} from "../interfaces/user.interface";

export class DbService extends Dexie {
  usersListTable!: Table<UserInterface[], number>

  constructor() {
    super('usersdb');
    this.version(1).stores({usersListTable: '++id'})
    this.on('populate', () => this.populate())
  }

  async populate() {
    await db.usersListTable.add([]);
  }
}

export const db = new DbService();
