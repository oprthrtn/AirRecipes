import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import '../../css/imageSlider.css'


function ImageSlider(props) {
  const settings = {
    customPaging: function (i) {
      return (<img alt={`paggingImg${i}`} src={props.images[i]} height='56px' width='56px' />);
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",

    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {props.images.map((img, index) => {
        return (
          <div key={index}>
            <img src={img} alt={`img${index}`} style={{ width: '100%', height: 'auto', maxHeight: '355px' }} />
          </div>
        )
      })}
    </Slider>
  )
}

export default ImageSlider;