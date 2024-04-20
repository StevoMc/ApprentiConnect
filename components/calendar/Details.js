"use client";

const Details = (props) => {
  // Convert the data prop to a string before rendering
  const dataString = props.data.toString();

  return <div>{dataString}</div>;
};

export default Details;
