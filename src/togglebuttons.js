import { useEffect, useState } from "react";

export default function ToggleButtons(props) {
  const [toggleButton, setToggleButton] = useState(false);

  const pressedToggleButton = (event) => {
    if (toggleButton === false) {
      props.addIntoMultiselect((prev) => [...prev, event.target.id]);
      setToggleButton(true);
    } else {
      const remove = props.getMultiSelectList.filter(
        (item) => item !== event.target.id
      );
      props.addIntoMultiselect(remove);
      setToggleButton(false);
    }
  };

  useEffect(() => {
    if (props.getMultiSelectList.length === 0) {
      setToggleButton(false);
    }
  }, [props.getMultiSelectList]);

  return (
    <input
      type="checkbox"
      checked={props.toggleAll || toggleButton}
      onChange={pressedToggleButton}
      id={props.id}
    />
  );
}
