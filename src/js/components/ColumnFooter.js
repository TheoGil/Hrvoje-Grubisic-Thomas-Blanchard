function ColumnFooter(props) {
  return (
    <div className={`column__footer ${props.className}`}>{props.children}</div>
  );
}
export default ColumnFooter;
