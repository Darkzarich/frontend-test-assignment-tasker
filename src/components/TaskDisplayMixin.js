import consts from "@/const/const";

export default {
  methods: {
    getStatusClass(status) {
      const base = "tasks__item-status";
      switch (status) {
        case consts.TASK_STATUS.NEW:
          return base + "_blue";
        case consts.TASK_STATUS.IN_PROGRESS:
          return base + "_yellow";
        case consts.TASK_STATUS.DONE:
          return base + "_green";
      }
    },
    getStatusText(status) {
      // here later we could implement Vue I18n for internationalization
      // and return json key instead of string
      switch (status) {
        case consts.TASK_STATUS.NEW:
          return "NEW";
        case consts.TASK_STATUS.IN_PROGRESS:
          return "IN PROGRESS";
        case consts.TASK_STATUS.DONE:
          return "DONE";
      }
    },
    isExpired(task) {
      const dateNow = new Date().getTime();
      return (
        dateNow > new Date(task.dateDeadline).getTime() &&
        task.status !== consts.TASK_STATUS.DONE
      );
    }
  },
  filters: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return (
        ("0" + date.getDate()).slice(-2) +
        "." +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "." +
        date.getFullYear() +
        " " +
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2)
      );
    }
  }
};
