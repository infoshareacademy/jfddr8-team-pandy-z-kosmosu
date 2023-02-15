import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import SliderImg1 from '../../Graphics/slider-desktop-photo-1.jpg'
import SliderImg2 from '../../Graphics/slider-desktop-photo-2.jpg'
import SliderImg3 from '../../Graphics/slider-desktop-photo-3.jpg'
import classes from './Slider.module.css'

const Slider = ():JSX.Element => {
  const images:string[] = [
    SliderImg1,
    SliderImg2,
    SliderImg3
  ];

  return (
    <div className={classes.sliderWrapper}>
      <Slide arrows={false}>
          <div className="each-slide-effect">
              <div>
              <img className={classes.sliderImage} src={images[0]} alt=""/>
              </div>
          </div>
          <div className="each-slide-effect">
          <div>
          <img className={classes.sliderImage} src={images[1]} alt=""/>
              </div>
          </div>
          <div className="each-slide-effect">
          <div>
              <img className={classes.sliderImage} src={images[2]} alt=""/>
              </div>
          </div>
      </Slide>
    </div>
  );
};

export default Slider;
