import consts from "@/const/const";

export default {
  computed: {
    isValid() {
      const validationValues = Object.values(this.validation);
      return (
        validationValues.reduce((prev, el) => {
          return prev + el.length;
        }, 0) === 0
      );
    },
    validation() {
      const validation = {
        title: "",
        description: "",
        dateDeadline: ""
      };

      // title validation

      if (this.data.title.length === 0) {
        validation.title = "Title can't be empty";
      } else if (this.data.title.length > consts.TASK_MAX_TITLE_LENGTH) {
        validation.title = `Title can\'t be longer than ${consts.TASK_MAX_TITLE_LENGTH}`;
      }

      // description

      if (this.data.description.length === 0) {
        validation.description = "Description can't be empty";
      } else if (
        this.data.description.length > consts.TASK_MAX_DESCRIPTION_LENGTH
      ) {
        validation.description = `Description can\'t be longer than ${consts.TASK_MAX_DESCRIPTION_LENGTH}`;
      }

      // date

      if (this.data.dateDeadline) {
        const date = new Date(this.data.dateDeadline).getTime();
        const dateNow = new Date().getTime();

        if (dateNow > date) {
          validation.dateDeadline = "Deadline date can't be earlier than today";
        } else if (this.data.dateDeadline.length === 0) {
          validation.dateDeadline = "You must set deadline date";
        }
      }

      return validation;
    }
  }
};
