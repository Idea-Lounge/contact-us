(function () {
  var config = {
    emailAccount: {
      username: "idealounge.info@gmail.com",
      password: "nodemailer"
    },
    freelancers: [{ // these are the people who will be contacted
      name: "Anurag Sahoo",
      email: "anurag.sahoo1994@gmail.com"
      },
      { // these are the people who will be contacted
        name: "Alona Kosobokova",
        email: "alonakosobokova@gmail.com"
    }],
    server: {
        httpPort: 8000,
        httpsPort: 8001
    }
  };

  module.exports = config;
})();
