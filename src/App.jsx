import ImageSlider from "./components/image_slider/ImageSlider";

function App() {
  return (
    <ImageSlider
      url={"https://picsum.photos/v2/list"}
      page={"3"}
      limit={"10"}
    />
  );
}

export default App;
