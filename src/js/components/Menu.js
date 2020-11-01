import MenuEntry from "./MenuEntry";

const entries = [
  {
    label: "Sea Freight Services",
    src: "https://source.unsplash.com/xewrfLD8emE/650x350",
    alt: "",
  },
  {
    label: "Break Bulk",
    src: "https://source.unsplash.com/CpsTAUPoScw/650x350",
    alt: "Sea Freight Services",
  },
  {
    label: "Special Project Trans",
    src: "https://source.unsplash.com/SInhLTQouEk/650x350",
    alt: "",
  },
];

function Menu() {
  return (
    <nav className="menu js-menu">
      <button className="menu__close js-menu-trigger">
        <svg>
          <use xlinkHref="#close" />
        </svg>
      </button>

      <ul className="menu--entries-list">
        {entries.map((entry, i) => (
          <MenuEntry
            label={entry.label}
            src={entry.src}
            alt={entry.alt}
            key={i}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
