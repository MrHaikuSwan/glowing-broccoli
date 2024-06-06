# Interview Project

In this project, you will use the Mercoa APIs and SDKs to create a working BillPay SaaS platform. This is a full-stack project where you will need to create a backend and frontend, and deploy it to the internet.

Feel free to use any frontend frameworks and backend languages! We reccomend using [Next.js](https://nextjs.org), but you can use anything.

You will need to make an app that:

1) Lets a business log in (can be hardcoded / fake login)
1) Collects KYB information about the business and onboards them
1) Shows the businesses's invoices
1) Let the business upload/create a new invoice

Bonus Tasks:

1) Set up user accounts for the business
1) Let the business configure approval rules for invoices
1) Let the business view and manage their vendors
1) Add some custom fields for the invoice
1) Generate a [AP aging report](https://cfoshare.org/blog/accounts-payable-aging-report-what-is-it/)
   - This would be a super bonus :)

## Some resources to help:

- [Mercoa API Docs](https://docs.mercoa.com)
- [Mercoa Demo Video](https://www.loom.com/share/f213e8cf81494746876694bba32e888b)
  - This is similar to what you should build


This assignment is vague on purpose. There are MANY different ways to deliver this solution, some can take as short as 1 hour, others a full week. The goal is to understand how you operate in an ambiguous environment, what tradeoffs you make, etc. Be prepared to discuss why you made certain choices and speak to code you wrote.

The ideal output is a live URL that we can visit on the review call, log in, and schdule and pay an invoice.

# Notes

[Rough Initial Design](https://lucid.app/lucidchart/4376ad73-89d6-4e55-9b4b-7eae811bec78/edit?page=0_0&invitationId=inv_0d5609fd-3dcf-4b23-925a-5fae8449e7b9#)

Tasks:

1) Lets a business log in (can be hardcoded / fake login)
   1) Originally reached for Next.js + Supabase, Supabase would handle auth + DB storing foreign IDs
   2) For MVP, just hardcode DB records, use Next.js alone
2) Collects KYB information about the business and onboards them
   1) Homepage should by default attempt to onboard the payer unless they are already verified
3) Shows the businesses's invoices
   1) Default Payments portal on 
4) Let the business upload/create a new invoice
   1) Default tab accomplishes this

Bonus Tasks:

1) Set up user accounts for the business
   1) Ordinarily would store (user -> foreignID) mapping in DB
   2) For MVP, make the form accept the user's foreignID directly
2) Let the business configure approval rules for invoices
   1) Approval rules builder component handles this
3) Let the business view and manage their vendors
   1) Counterparties component handles this
4) Add some custom fields for the invoice
   1) Didn't implement
   2) Plan Options
      1) Manually create a custom field in the admin dashboard
      2) Create a tab with widgets for creating custom field (low value)
5) Generate a [AP aging report](https://cfoshare.org/blog/accounts-payable-aging-report-what-is-it/)
   1) Half-implemented plan:
      1) Write custom server action fetching all invoices, iterating to bucket invoices under companies
      2) Generate a CSV from data structure, pass text back to frontend component
      3) Frontend component create and click URI downloading CSV file
