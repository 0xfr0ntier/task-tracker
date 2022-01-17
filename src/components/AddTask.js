import { useState } from "react";

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            alert("Please add task!");
            return;
        }

        onAdd({ text, day, reminder });

        setText("");
        setDay("");
        setReminder(false);
    };

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input
                    type="text"
                    placeholder="Add task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Day</label>
                <input
                    type="text"
                    placeholder="Add date"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <input
                    type="checkbox"
                    placeholder="Set reminder"
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
                <label>Reminder</label>
            </div>

            <input type="submit" value="Save" className="btn btn-block" />
        </form>
    );
};

export default AddTask;
