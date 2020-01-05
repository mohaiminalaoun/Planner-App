import Dexie from "dexie";

const db = new Dexie("Planner");
db.version(1).stores({ tasks: "++id, userName, task" });

export default db;
