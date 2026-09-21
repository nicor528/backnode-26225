router.post("/SingIn2", async (req, res) => {
  try {
    const password = req.body.password;
    const email = req.body.email;

    const user = await SingInPass(email, password);
    user = await getDataUser(user.uid);

    if (user.isBlocked) {
      return res.status(407).send({ user: "blocked" });
    }

    console.log(Object.keys(user.stripe.accountID).length);
    console.log(!user.stripeAccount);
    console.log(user.phoneVerified);
    console.log(user.identityVerified);
    console.log(user.addressVerified);

    if (!user.stripeAccount && Object.keys(user.stripe.accountID).length < 1 && user.phoneVerified &&
      user.identityVerified &&
      user.addressVerified
    ) {
      console.log("test1");

      const account = await createAccount(user);

      const customerID = await createCustomer(
        user.name,
        user.lastName,
        user.email,
        user.phone
      );

      user = await stripeIDs(user.id, account.id, customerID);

      user = await activateWallet(user.id);

      const currencys = await getChangesCurrencys();

      const dashData = await getDashUserData(user);

      const responseData = {
        user: { ...user, dashData },
        currencys: currencys,
        dashData: dashData
      };

      return res.status(200).send(responseData);
    } else {
      console.log("test3");

      const currencys = await getChangesCurrencys();

      user = await getDataUser(user.id);

      const responseData = {
        user: user,
        currencys: currencys
      };

      return res.status(200).send(responseData);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

