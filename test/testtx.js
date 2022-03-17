const getters = require('../WEB3/getterApi.js');
const setters = require('../WEB3/setterApi.js');


 
 async function setter() {

   // result = await getters.getAdmins(),
   // console.log("Admin Result>>>", result)
   try {
      scheduleId =  await setters.createSchedule(15000, '0x1d7DE4b6B0646871C8698D2b752415bEd18f97D6','').then(
         async result => { 
            console.log("Create Schedule >>>", result.scheduleId)
            return result.scheduleId
         })
   } catch (error) {
      console.log(error)
   }
   // result = await getters.getAuthorizers(),
   // console.log("Admin Result>>>", result)



   // try {
   //           auth =  await setters.createAccount('SHAbaba!')
   //          .then(
   //             auth => {
   //                console.log(auth)
   //             return auth
   //             })
   //          console.log(auth)

   //    //await setters.removeAdmin('0x73f0221D7A52A66901d15840d1071F351005ad7a')
   // } catch (error) {
   //    console.log(error)
   // }

// try {
//    await setters.removeAuthorizer('0x90797de4AEF3666D9BC88B207D956942160f569f').then(
//       removed=>{
//          console.log('Removed >>', removed)
//       }
//    )
// } catch (error) {
//    console.log('Error>>', error)
// }
  

   // await setters.removeAuthorizer('0xc2625F09dc45949aE88B0FDBcCC4380199ab280f').then(
   //    removed=>{
   //       console.log('Removed >>', removed)
   //    }
   // )

   // await setters.removeAdmin('0xc2625F09dc45949aE88B0FDBcCC4380199ab280f').then(
   //    removed=>{
   //       console.log('Removed >>', removed)
   //    }
   // )

   // await setters.removeAuthorizer('0x90797de4AEF3666D9BC88B207D956942160f569f').then(
   //    removed=>{
   //       console.log('Removed >>', removed)
   //    }
   // )

   // await getters.getAdmins().then(
   //    owner => {
   //       console.log('Admins >>', owner)
   //    }
   // )

   // await getters.getAuthorizers().then(
   //    authorizer => {
   //       console.log(authorizer) }
   // )

   // try {
   //    init =  await setters.changeRequirement(1)
   // console.log('Change Requirement >>>',init)
   // } catch (error) {
   //    console.log(error)
   // }
   

   // try {
   //    await setters.initialize().then(
   //       async result => {
   //          console.log('Initialize >>>',result)
   //          //await setters.addAdmin(result)
   //       }
   //    )
   // } catch (error) {
   //    console.log(error)
   // }

   
   
   // try {
   //    await setters.removeAuthorizer('')
   // } catch (error) {
   //    console.log(error)
   // }
  

   //  await getters.getAuthorizers().then(
   //        async result => {
   //           console.log('Authorizer>>>',result)
   //           //await setters.addAdmin(result)
   //        }
   //     )

   //    try {
   //       superadmin = await getters.getOwner()

   //       acct =  await setters.createAccount('SHAbaba!').then(
   //       acct => {
   //          console.log(acct)
   //          return acct
   //       })

   //       //await setters.addAdmin(acct)


   // try {
   //    // await setters.addAdmin('0xf7Fba58345E6EC54593d0a4d9ED528F8a86349C5')
   //    // await setters.removeAuthorizer('0xf7Fba58345E6EC54593d0a4d9ED528F8a86349C5').then(
   //    //    result => {
   //    //       console.log('remove auth result>>', result)
   //    //    }
         
   //    // )

   //    result = await getters.getAuthorizers(),
   //        console.log("Authorizers Result>>>", result),

   //       result = await getters.getAdmins(),
   //        console.log("Admin Result>>>", result)

   // } catch (error) {
   //    console.log('Error>>', error)
   // }

   // await setters.addAdmin('0x0c428d31db99228ae0a3080d85b2b3d7700791b7').then(
   //    result => { console.log("Add Admin Result>>>", result)}
   // )

   //     await setters.createAccount('SHAbaba!').then(
   //       acct => {
   //          console.log(acct)
   //       })
   
   // await setters.createAccount('SHAbaba!').then(
   //   async acct =>{
   //      //await setters.addAdmin(acct)
   //      console.log('Admin Account >>> ',acct)
   //    }
   // );
}

async function createschedule() {
   try {
      
      //  await getters.getOwner().then(
      //     async result => {
      //        console.log('SuperUser>>>',result)
      //        await setters.addAdmin(result)
      //     }
      //  )

      //  authcreate = await setters.createAccount('SHAbaba!')
       
      //       await setters.addAuthorizer(authcreate)
            
         
      //  console.log('New Authorizer Account >>> ', authcreate)

      //  await getters.getAuthorizers().then(
      //    authorizer => {
      //     console.log('Authorizers>>>', authorizer)
      //    }
      // )

      acct = await setters.createAccount('SHAbaba!').then(
         async acct =>{
            await setters.addAdmin(acct)
            return acct
          }
       );
       console.log('New Admin Account >>> ', acct)

       admins = await getters.getAdmins()
       console.log('All Admins >>>', admins)

       scheduleId =  await setters.createSchedule(15000, acct,'').then(
        async result => { 
           console.log("Create Schedule >>>", result.scheduleId)
           return result.scheduleId
        })
      //   await setters.approveMint(scheduleId, true, 'Loving the pain', '0x415BA7117d911f6DDCe8D5f2383e7ef7F73ca737', 'SHAbaba!').then(
      //    approvemint => {
      //       console.log('ApproveMint >>>', approvemint)
      //    })

      //    approveStat = await getters.isApproved(scheduleId)
      //    console.log('Approval Status>>>',approveStat)

      //    approvers = await getters.getapprovals(scheduleId)
      //    console.log('Approver Addresses >>>', approvers)

      //    // rejecters = await getters.getrejects(scheduleId)
      //    // console.log('Rejecter Addresses >>>', rejecters)

      //    generateToken = await setters.generateToken(scheduleId, '0xb1b459Fe8BEA8a26B4847bD07a12A7158613a28F', '400','','' )
      //    console.log('Approval Status>>>',approveStat)
      
         
   } catch (error) {
      console.log(error)
   } 
}

async function getter(){
   try {
     
      
      //await getters.initialize()
      // await setters.removeAuthorizer('0x5579EE281114Ef0C889E372B68D5A44622036F60')
     // await setters.removeAuthorizer('0x5d9aF6E295Bde950b70e596E2d182bFE7C906D18')
      // .then(
      //    authorizer => {
      //       console.log(authorizer)}
      // )

      

      // totalsupply = await getters.getTotalSupply()
      //    console.log('Totalsupply >>', totalsupply)
      // .then(
      //    authorizer => {
      //       console.log(authorizer)}
      //    )

      // acct = await setters.createAccount('SHAbaba!')
      //       .then(
      //    async acct =>{
      //       await setters.addAuthorizer(acct)
      //       return acct
      //     }
      //  );
      //  console.log('New Account>>', acct)

      // await setters.removeAuthorizer('0xdd2a02DC8eC5a82d69Aae7860954afd479ed3dCc').then( result =>{
      //    console.log('remove authorizer>>', result)
      // })

      // await setters.removeAdmin('0x47fD3CCc24b7428eFE9031D8529EE451c5749a2D').then( result =>{
      //    console.log('remove admin>>', result)
      // })

      // await getters.getAuthorizers().then(
      //    authorizer => {
      //       console.log('Authorizers >>',authorizer)}
      //    )

      

      // getWhiteList =  await getters.getWhiteList()
      // console.log('Users >>', getWhiteList)

      //await setters.addAdmin('0x5d9aF6E295Bde950b70e596E2d182bFE7C906D18')

      await getters.getWhiteList().then(
         users => {
            console.log('Users >>', users)
         }
      )

      await getters.getAdmins().then(
         authorizer => {
            console.log('Admins >>',authorizer)}
         )

      // accts =  await getters.getAdmins()
      // console.log('Admins >>', accts)

      owner =  await getters.getOwner()
      console.log('Owner >>', owner)

      getrequiredapprovals =  await getters.getrequiredapprovals()
      console.log('Required Approvals >>', getrequiredapprovals)

      // rejecters = await getters.getrejects(scheduleId)
      //    console.log('Rejecter Addresses >>>', rejecters)

      // allowance =  await getters.balanceOf('0x0c428d31db99228ae0a3080d85b2b3d7700791b7')
      // console.log('Rejects >>', allowance)

      // scheduleId =  await setters.createSchedule('15000',acct,'SHAbaba!')
      //    console.log("Created Schedule >>>", scheduleId.scheduleId)

      //  auth = await getters.getAuthorizers()
      //  console.log('Authorizers >>',auth)
       //result = await getters.getTokenBals(acct);
       //result = await getters.getAdmins();
      //  await getters.getblocknumber();
      //  await getters.gettransactionstatus('0x1e9922f3af21155ca731f7f77f44d9dedc2f609834b35175ba82c27cc9351cb1').then( result => {
      //  console.log("Result>>>", result)
      //})
      //  _sched = 3;
      // result = await getters.getschedule(_sched)
      //console.log("Admins Result>>>", result)
   } catch (error) {
      console.log("error>>>", error)
   }
  
}


//setter()
getter()
//createschedule()




