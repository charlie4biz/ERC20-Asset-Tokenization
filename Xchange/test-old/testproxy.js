const getters = require('../services/proxy/getterProxy');
const setters = require('../services/proxy/setterProxy');
 
 async function setter(_addr) {
      try {
        upgrade = await setters.upgradeTo(_addr);
          console.log(upgrade)
      } catch (error) {
        console.log(error)
      }
   
}
//setter('0xA8ed520F25Ed65661456DBFC2c6a5DeC5509F92e')

async function getter() {
  try {
    await getters.proxyOwner();
    
  } catch (error) {
    console.log(error)
  }

}
getter()
