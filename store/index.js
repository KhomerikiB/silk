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
import contact from './modules/contact'
import faq from './modules/faq'
import faqCategory from './modules/faqCategory'
import multiSlider from './modules/multiSlider'
import apartments from './modules/apartments'
import apartmentPdf from './modules/apartmentPdf'

import video from './modules/video'
import menu from './modules/menu'
import image from './modules/image'
import file from './modules/file'

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
      contact,
      faq,
      faqCategory,
      multiSlider,
      video,
      apartments,
      apartmentPdf,
      menu,
      image,
      file
    }
  })
}

export default store
