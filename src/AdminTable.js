import { useState, useEffect } from "react";
import "./css/AdminTable.css";
import axios from "axios";
import NextButtons from "./NextAdminTable";
import DeleteAllButton from "./DeleteAllSeletedRow";
import SearchBar from "./SearchBar";
import ToggleButtons from "./togglebuttons";

export default function BuildAdminTable() {
  const [UserData, setUserData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [displayData, setDisplayData] = useState([]);

  const [deletedUserList, setDeletedUserList] = useState([]);

  const [toogleButton, setToggleButton] = useState(false);

  const [multiselect, setMultiSelect] = useState([]);

  const fetchUserAll = async function () {
    let response = await axios(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setUserData(response.data);
  };

  useEffect(() => {
    fetchUserAll();
  }, []);

  useEffect(() => {
    // this will display the same page even if memebr is delelted
    const startIndex = (currentPage - 1) * 10;
    const endIndex = startIndex + 10;
    setDisplayData(UserData.slice(startIndex, endIndex));
    setToggleButton(false);
    setMultiSelect([]);
  }, [UserData, currentPage]);

  const deleteCurrentButton = (event) => {
    const btn = event.target.id;
    const UpdateUserData = UserData.filter((item) => item.id !== btn);
    const userFound = UserData.find((item) => item.id === btn);

    setDeletedUserList((prev) => [...prev, userFound.id]);
    setUserData(UpdateUserData);
  };

  const toggleAllSelect = (event) => {
    if (event.target.checked) {
      const tempIds = displayData.map((items) => items.id);
      setMultiSelect(tempIds);
      setToggleButton(true);
    } else {
      setMultiSelect([]);
      setToggleButton(false);
    }
  };

  return (
    <div>
      <SearchBar
        UserData={UserData}
        setUserData={setUserData}
        deletedUser={deletedUserList}
      />
      <div className="Header">
        <table className="TableHeader">
          <tr>
            <th className="DrawBorderButtom">
              <input
                type="checkbox"
                onChange={toggleAllSelect}
                checked={toogleButton}
              />
            </th>
            <th className="DrawBorderButtom">Name</th>
            <th className="DrawBorderButtom">Email</th>
            <th className="DrawBorderButtom">Role</th>
            <th className="DrawBorderButtom">Action</th>
          </tr>
          {displayData.map((user) => {
            return (
              <tr
                id={user.id}
                className={
                  multiselect.includes(user.id)
                    ? "MakeGreyBackground"
                    : "TableRow"
                }
              >
                <td className="DrawBorderButtom">
                  <ToggleButtons
                    toggleAll={toogleButton}
                    id={user.id}
                    addIntoMultiselect={setMultiSelect}
                    getMultiSelectList={multiselect}
                  />
                </td>
                <td className="DrawBorderButtom">{user.name}</td>
                <td className="DrawBorderButtom">{user.email}</td>
                <td className="DrawBorderButtom">{user.role}</td>
                <td className="DrawBorderButtom">
                  <button className="EditButton">Edit</button>
                  <button
                    id={user.id}
                    className="DeleteButton"
                    onClick={deleteCurrentButton}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <div>
        <DeleteAllButton
          getMultiSelectList={multiselect}
          getUserData={UserData}
          setUserData={setUserData}
          setDeletedList={setDeletedUserList}
        />
        <NextButtons
          value={UserData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataToDisplay={displayData}
          setDisplayToData={setDisplayData}
        />
      </div>
    </div>
  );
}
