import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../domains/redux/actions";
import "./Pagination.css";

export default function Pagination(props) {
  const { total_task_count } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onPageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected);

    dispatch(fetchTasks({ page: offset }));
  };
  return (
    <div className="center">
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        pageCount={total_task_count}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={onPageClick}
        containerClassName={"pagination"}
        subContainerClassName={"page"}
        activeClassName={"page active"}
      />
    </div>
  );
}
