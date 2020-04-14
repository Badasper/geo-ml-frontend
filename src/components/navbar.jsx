import React from "react";
import Button from "react-bootstrap/Button";

export default function Navbar(props) {
  return (
    <div>
      <style type="text/css">
        {`
        .btn-flat {
        background-color: blue;
        color: white;
        }

        .btn-xxl {
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
        }
        `}
      </style>
      <Button variant="flat" onClick={() => props.onClick()}>
        {" "}
        {props.value}{" "}
      </Button>
      <div>
        <p>{props.content}</p>
      </div>
    </div>
  );
}
