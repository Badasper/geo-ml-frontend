import React from 'react';

const DropDownContent = (props) => {
  return (
    <div className="dropdown">
      <div>
        {props.list
          .filter((item) => {
            return props.term.split('').every((internalItem) => {
              return (
                item.title.toLowerCase().indexOf(internalItem.toLowerCase()) !==
                -1
              );
            });
          })
          .map((item) => (
            <div
              className="dropdown-item"
              key={item.title}
              onClick={() => props.onClick(item.title)}
            >
              {item.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDownContent;
