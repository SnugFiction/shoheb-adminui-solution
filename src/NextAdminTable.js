import "./css/NextButtons.css";

export default function NextButtons(props) {
  let size = Object.keys(props.value).length;
  let buttonNumbers = [];

  function addButtonNumbers() {
    for (let i = 0; i < Math.ceil(size / 10); i++) {
      buttonNumbers.push(i + 1);
    }
  }

  addButtonNumbers();

  function nextPage() {
    props.setCurrentPage(props.currentPage + 1);
  }
  function prevPage() {
    props.setCurrentPage(props.currentPage - 1);
  }

  function firstPage() {
    props.setCurrentPage(1);
  }

  function lastPage() {
    props.setCurrentPage(Math.ceil(size / 10));
  }

  function numberingbuttons(event) {
    const clickButton = event.target;
    const num = clickButton.textContent;
    props.setCurrentPage(Number(num));
  }

  return (
    <div className="NextButtons">
      <button className="FooterButtons" onClick={firstPage}>
        FirstPage
      </button>
      <button
        className="FooterButtons"
        onClick={prevPage}
        disabled={props.currentPage === 1}
      >
        Previous
      </button>
      {buttonNumbers.map((i) => {
        return (
          <button className="FooterButtons" onClick={numberingbuttons}>
            {i}
          </button>
        );
      })}
      <button
        className="FooterButtons"
        onClick={nextPage}
        disabled={props.currentPage === Math.ceil(size / 10)}
      >
        Next
      </button>
      <button className="FooterButtons" onClick={lastPage}>
        LastPage
      </button>
    </div>
  );
}
