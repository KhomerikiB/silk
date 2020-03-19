import Vuex from 'vuex'
import welcome from './modules/welcome'
import buildingSlider from './modules/buildingSlider'
import completing from './modules/completing'
import neighbourhood from './modules/neighbourhood'
import advantage from './modules/advantage'
import serviceSlides from './modules/serviceSlides'
import serviceStatic from './modules/serviceStatic'
import teamStatic from './modules/teamStatic'
import teamSlider from './modules/teamSlider'
import press from './modules/press'
import offer from './modules/offer'
import partners from './modules/partners'
import image from './modules/image'
const store = () => {
  return new Vuex.Store({
    modules: {
      welcome,
      buildingSlider,
      completing,
      neighbourhood,
      advantage,
      serviceSlides,
      serviceStatic,
      teamStatic,
      teamSlider,
      press,
      offer,
      partners,
      image
    }
  })
}

export default store
