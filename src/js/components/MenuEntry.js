function MenuEntry(props) {
  return (
    <li className="menu--entry js-menu-entry">
      <a href="#" className="menu--entry--link">
        <img className="menu--entry--picture" src={props.src} alt={props.alt} />
        <div className="menu--entry--label-container">
          <div className="menu--entry--label js-menu-link-label">
            {props.label}
          </div>
        </div>
      </a>
    </li>
  );
}

export default MenuEntry;
