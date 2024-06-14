import { useEffect, useState } from "react";
import useStoreTaskToDB from "../../hooks/storeTaskToDB/useStoreTaskToDB";

const TaskModal = () => {
  const storeTaskToDB = useStoreTaskToDB();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.getElementById("task-modal").showModal();
    }
  }, [isModalOpen]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "low"
  });
  const { title, description, deadline, priority } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormData({
        title: "",
        description: "",
        deadline: "",
        priority: "low"
      });
      storeTaskToDB(formData);
      setIsModalOpen(false);
      //TODO: Show some status or toast
    } catch (err) {
      console.error(err.response.data);
    }
  };
  return (
    <>
      <button className="btn m-3" onClick={handleOpenModal}>
        Add A task
      </button>
      {isModalOpen && (
        <dialog id="task-modal" className="modal">
          <div className="modal-box text-black">
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h2 className="text-xl">Add a task</h2>
            <form method="dialog" onSubmit={onSubmit}>
              {/* if there is a button in form, it will close the modal */}
              <label className="input input-bordered flex items-center gap-2">
                Title
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={onChange}
                  className="grow"
                  placeholder="Your task title"
                  required
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Your bio</span>
                </div>
                <textarea
                  name="description"
                  value={description}
                  onChange={onChange}
                  placeholder="Task Description"
                  className="textarea textarea-bordered textarea-sm w-full mb-2"
                ></textarea>
              </label>

              <label className="input input-bordered flex items-center gap-2">
                Deadline
                <input
                  type="datetime-local"
                  name="deadline"
                  value={deadline}
                  onChange={onChange}
                  className="grow"
                  placeholder="date"
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Task Priority</span>
                </div>
                <select
                  name="priority"
                  value={priority}
                  onChange={onChange}
                  className="select select-bordered"
                >
                  <option disabled>Choose task priority</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </label>
              <input
                type="submit"
                value="Add Task"
                className="btn btn-outline mt-2 w-full"
              />
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default TaskModal;
