function Header() {
  return (
    <header className="header">
      <div className="header__column">
        <button href="#" className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30.3 20.2"
            className="logo__svg"
          >
            <path d="M27.1 10q0-3-3-4.5t-9-1.5q-6 0-9 1.5t-3 4.6q0 3 3 4.6 3 1.5 9 1.5t9-1.5q3-1.6 3-4.6zm3.2 0q0 5-4 7.6-3.8 2.6-11.2 2.6-7.3 0-11.2-2.6Q0 15 0 10q0-5 3.9-7.5Q7.8 0 15 0q7.4 0 11.3 2.6 3.9 2.6 3.9 7.5z" />
          </svg>
        </button>
        <button className="button button--transparent js-menu-trigger">
          Solutions
          <svg className="button__icon">
            <use xlinkHref="#arrow-down" />
          </svg>
        </button>
      </div>
      <div className="header__column">
        <button className="burger-menu-button">
          <svg className="burger-menu-button__icon">
            <use xlinkHref="#burger-menu" />
          </svg>
        </button>

        <button href="#" className="button">
          Schedule
        </button>
      </div>
    </header>
  );
}

export default Header;
