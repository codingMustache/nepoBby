const axios = require('axios')
const cheerio = require('cheerio')
const prompt = require('prompt-sync')()

const areYouANepoBby = name =>{
  const sendName = name.split(' ').join('_')
  axios.get(`https://en.wikipedia.org/wiki/${sendName}`)
    .then(({data}) => {
      const $ = cheerio.load(data)
      const test = $('th.infobox-label').map((_, each) => {
				const $each = $(each);
        if($each.text() === 'Family' ||
          $each.text() === 'Relatives' ||
          $each.text() === 'Parents'){
          const row = $each.siblings('.infobox-data')
          return row.children().text()
        }
		  }).toArray()
    if(!!test.length){
      return console.log('Yeah, they\'re a nepo baby!')
    }else {
      return console.log('I didm\'t find anything...')
   }
  })
  .catch(()=> console.log('I didn\'t find anything...'))
}
const input = prompt('Enter a potential nepo baby: ')
areYouANepoBby(input)
