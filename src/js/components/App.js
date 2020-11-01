import SVGSpritesheet from "./SVGSpritesheet";
import Header from "./Header";
import Menu from "./Menu";
import Column from "./Column";
import ColumnFooter from "./ColumnFooter";
import Slideshow from "./slideshow/Slideshow";

function App() {
  return (
    <div className="App">
      <SVGSpritesheet />
      <Header />

      <Slideshow />

      <Menu />

      <div className="columns-container">
        <Column>
          <ColumnFooter className="flex">
            <button className="button button--transparent right">
              Explore more
              <svg className="button__icon">
                <use xlinkHref="#arrow-down" />
              </svg>
            </button>
          </ColumnFooter>
        </Column>
        <Column>
          <ColumnFooter>
            <div className="infos">
              <p>
                HMM is in the pursuit of best integrated logistics compagny in
                the world.
              </p>
              <a
                href="https://dribbble.com/shots/14250770-Cargo-Logistics-Website-Navigation"
                className="link"
                target="_blank"
                rel="noreferrer"
              >
                Read more
              </a>
            </div>
          </ColumnFooter>
        </Column>
      </div>
    </div>
  );
}

export default App;
