import SingleTask from "../single/SingleTask"

const List = ({ data }) => {
  return (
    <div className="col">
      {data &&
        data.map((task, i) => (
          <div className="col" key={i} id="myGroup">
            <SingleTask task={task} />
          </div>
        ))}
    </div>
  )
}

export default List
