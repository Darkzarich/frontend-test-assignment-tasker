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
    if (tasks) {
      return tasks.find(el => el.id === id);
    }
  },
  setTaskById(id, data) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const foundTask = tasks.find(el => el.id === id);
    if (foundTask) {
      // change only what field passed with data, just like PUT request logic behind the backend
      foundTask.title = data.title || foundTask.title;
      foundTask.description = data.description || foundTask.description;
      foundTask.dateDeadline = data.dateDeadline || foundTask.dateDeadline;
      foundTask.status = data.status == 0 ? 0 : data.status || foundTask.status;
      foundTask.tags = data.tags;

      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      // if didn't find then create new, with id + 1
      tasks.push({
        ...data,
        id: tasks.length
      });

      localStorage.setItem("tasks", JSON.stringify(tasks));

      return tasks.length - 1;
    }
  }
};
