# Mutton-chop-WageTrak
 
This is still very much a work in progress.

This is a Spring MVC application with a React front end intended for mobile that estimates total net pay for hourly employees given a tax rate.  It still requires logging and security.  There is not yet a way to add users and this will remain the case until security is implemented.  It requires that you have MongoDB and is not currently set up to use embedded Mongo.

It doesn't matter yet but when it's implemented the password for curly jefferson is "pass"

JSON for test pojos below

Test user:

{
  "id": "5f1d3876aba88b644faeff0d",
  "name": "curly jefferson",
  "userName": "curly jefferson",
  "password": "$2y$10$EHm8KsP4lwholAstwXqbzObUgRK84gkivkUH.5Y7a5lxT28FQuIsi",
  "taxRate": "0.18",
  "jobs": [
    {
      "name": "cheesegrater",
      "rate": 23.07,
      "payPeriods": [
            {
              "dateName": "07-04-2020",
              "shifts": [
                  {
                    "date": "07-06",
                    "hours": 8,
                    "grossPay": 184.56,
                    "netPay": 151.34,
                    "taxes": 33.22
                  },
                  {
                    "date": "07-07",
                    "hours": 5,
                    "grossPay": 115.35,
                    "netPay": 94.56,
                    "taxes": 20.76
                  },
                  {
                    "date": "07-08",
                    "hours": 8,
                    "grossPay": 184.56,
                    "netPay": 151.34,
                    "taxes": 33.22
                  },
                  {
                    "date": "07-10",
                    "hours": 8,
                    "grossPay": 184.56,
                    "netPay": 151.34,
                    "taxes": 33.22
                  }
              ],
              "netPay": 548.61,
              "grossPay": 669.04,
              "taxes": 120.43
            },
            {
              "dateName": "07-12-2020",
              "shifts": [
                  {
                    "date": "07-13",
                    "hours": 8,
                    "grossPay": 184.56,
                    "netPay": 151.34,
                    "taxes": 33.22
                  },
                  {
                    "date": "07-15",
                    "hours": 5,
                    "grossPay": 115.35,
                    "netPay": 94.56,
                    "taxes": 20.76
                  },
                  {
                    "date": "07-16",
                    "hours": 8,
                    "grossPay": 184.56,
                    "netPay": 151.34,
                    "taxes": 33.22
                  },
                  {
                    "date": "07-17",
                    "hours": 8,
                    "grossPay": 184.56,
                    "netPay": 151.34,
                    "taxes": 33.22
                  }
              ],
              "netPay": 548.61,
              "grossPay": 669.04,
              "taxes": 120.43
            }
      ]
    },
    {
      "name": "tentstaker",
      "rate": 40.00,
      "payPeriods": [
            {
              "dateName": "07-04-2020",
              "shifts": [
                  {
                    "date": "07-06",
                    "hours": 6,
                    "grossPay": 240,
                    "netPay": 151.34,
                    "taxes": 33.22,
                    "night": false
                  },
                  {
                    "date": "07-07",
                    "hours": 5,
                    "grossPay": 200,
                    "netPay": 94.56,
                    "taxes": 20.76,
                    "night": false
                  },
                  {
                    "date": "07-10",
                    "hours": 3,
                    "grossPay": 120,
                    "netPay": 151.34,
                    "taxes": 33.22,
                    "night": false
                  }
              ],
              "netPay": 560.00,
              "grossPay": 459.20,
              "taxes": 100.80
            }
      ]
    }
    ]
}

Test BugReport:

{
  "userId": "5f1d220e17f12c73631c8baf",
  "text": "I tripped whilst using your app!"
}
