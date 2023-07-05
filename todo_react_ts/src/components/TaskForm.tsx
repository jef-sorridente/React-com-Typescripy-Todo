import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

// CSS
import styles from "./TeskForm.module.css";

// Interface
import { ITask } from "../interfaces/Task";

type Props = {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, description: string): void;
};

const TaskForm = ({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: Props) => {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (handleUpdate) {
      handleUpdate(id, title, description);
    } else {
      const id = Math.floor(Math.random() * 1000);

      const newTask: ITask = { id, title, description };

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDescription("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };

  return (
    <form onSubmit={addTaskHandler} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          onChange={handleChange}
          value={title}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          name="description"
          placeholder="Descrição da tarefa"
          onChange={handleChange}
          value={description}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
};

export default TaskForm;
