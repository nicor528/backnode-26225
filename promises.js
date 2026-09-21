router.post("/SingIn2", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  SingInPass(email, password).then(user => {
    getDataUser(user.uid).then(user => {
      if(user.isBlocked){
        res.status(407).send({user: "blocked"})
      }else{
        console.log(Object.keys(user.stripe.accountID).length)
        console.log(!user.stripeAccount)
        console.log(user.phoneVerified)
        console.log(user.identityVerified)
        console.log(user.addressVerified)
        if(!user.stripeAccount && Object.keys(user.stripe.accountID).length < 1 && user.phoneVerified && user.identityVerified && user.addressVerified){
          console.log("test1")
          createAccount(user).then(account => {
            createCustomer(user.name, user.lastName, user.email, user.phone).then(customerID => {
              stripeIDs(user.id, account.id, customerID).then(user => {
                activateWallet(user.id).then(user => {
                  getChangesCurrencys().then(currencys => {
                    getDashUserData(user).then(dashData => {
                      const responseData = {
                        user : {...user, dashData},
                        currencys: currencys,
                        dashData: dashData
                      }
                      res.status(200).send(responseData)
                    }).catch(error => {res.status(404).send(error)})
                  }).catch(error => {res.status(404).send(error)})
                }).catch(error => {res.status(404).send(error)})
              }).catch(error => {res.status(404).send(error)})
            }).catch(error => {res.status(404).send(error)})
          }).catch(error => {res.status(404).send(error)})
        }else {
          console.log("test3")
          getChangesCurrencys().then(currencys => {
            getDataUser(user.id).then(user => {
              const responseData = {
                user : user,
                currencys: currencys
              }
              //console.log(responseData)
              res.status(200).send(responseData)
            }).catch(error => {res.status(404).send(error)})
          }).catch(error => {res.status(404).send(error)})
        }
      }
    })
  }).catch(error => {
    res.status(400).send(error)
  })
})