import { useEffect, useState } from "react";
import axios from "axios";
import "./css/SearchBar.css";

export default function SearchBar(props) {
  const [search, setSearch] = useState("");

  const [oldData, setOldData] = useState([]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const fetchData = async () => {
    let response = await axios(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setOldData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteringData = () => {
    if (search === "") {
      props.setUserData(oldData);
    } else {
      const newFilterData = oldData.filter((item) =>
        Object.values(item).some((value) =>
          value.toLowerCase().includes(search.toLowerCase())
        )
      );
      props.setUserData(newFilterData);
    }
  };

  useEffect(() => {
    filteringData();
  }, [search]);

  const deletedTheUser = () => {
    const newData = oldData.filter(
      (item) => !props.deletedUser.includes(item.id)
    );
    setOldData(newData);
  };

  useEffect(() => {
    deletedTheUser();
  }, [props.UserData]);

  return (
    <div className="centerSearchBar">
      <input
        className="SearchBar"
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Search by name email or role"
      />
    </div>
  );
}
