export default {
  getTasks() {
    const item = localStorage.getItem("tasks");
    return JSON.parse(item);
  },
  setTasks(data) {
    localStorage.setItem("tasks", JSON.stringify(data));
  },
  getTaskById(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks.find(el => el.id === id);
  },
  setTaskById(id, data) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const foundTask = tasks.find(el => el.id === id);
    if (foundTask) {
      // change only what field passed with data, just like PUT request logic behind the backend
      foundTask.title = data.title || foundTask.title;
      foundTask.description = data.title || foundTask.description;
      foundTask.dateDeadline = data.dateDeadline || foundTask.dateDeadline;
      foundTask.status = data.status || foundTask.status;

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
};
