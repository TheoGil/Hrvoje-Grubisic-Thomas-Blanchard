import React, {forwardRef} from "react";

const Column = forwardRef((props, ref) => {
  return <div className="column" ref={ref}>{props.children}</div>;
})

export default Column;
