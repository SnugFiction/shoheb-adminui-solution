import "./css/DeleteAllButton.css";
export default function DeleteAll(props) {
  const deleteAll = () => {
    const tempDel = props.getUserData.filter(
      (item) => !props.getMultiSelectList.includes(item.id)
    );
    props.setDeletedList((prev) => [...prev, ...props.getMultiSelectList]);
    props.setUserData(tempDel);
  };

  return (
    <div className="MakeInlineBlock">
      <button className="DeleteButtonSelected" onClick={deleteAll}>
        Delete Selected
      </button>
    </div>
  );
}
