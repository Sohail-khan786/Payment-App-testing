const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  /* 
    Steps of test :
    1. login 
    2. checks account balance 
    3. clicks on new payment  button
    4. search for a user
    5. add amount and note
    6. Click pay
    7. return to transactions
    8. go to personal payment 
    9. click on payment 
    10. verify if payment was made
    11. verify if payment amount was deducted
 */

  it("User can make Payment", () => {
    //login
    cy.visit("/");

    cy.findByRole("textbox", {
      name: /username/i,
    }).type("johndoe");

    cy.findByLabelText(/password/i).type("s3cret");

    cy.findByRole("checkbox", {
      name: /remember me/i,
    }).check();

    cy.findByRole("button", {
      name: /sign in/i,
    }).click();

    //checks account balance
    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => (oldBalance = $balance.text()));

    // click on new transaction button
    cy.findByRole("button", {
      name: /new/i,
    }).click();

    // search for a user to whom you want to send money
    cy.findByRole("textbox").type("devon becker");

    // click on the first user
    cy.findByText(/devon becker/i).click();

    // add payment amount and note
    const transactionAmount = "50.00";
    cy.findByPlaceholderText(/amount/i).type(transactionAmount);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);

    // click on pay button to pay the user
    cy.findByRole("button", {
      name: /pay/i,
    }).click();

    // return back to transactions page
    cy.findByRole("button", {
      name: /return to transactions/i,
    }).click();

    // got to users personal tab
    cy.findByRole("tab", {
      name: /mine/i,
    }).click();

    // click on the payment that was made just now
    cy.findByText(note).click({ force: true });

    // check if the payment amount and note are visible ( making assertions )
    cy.findByText(`-$${transactionAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    // verify if payment was deducted or not
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedTransactionAmount = parseFloat(transactionAmount.replace(/\$|,/g, ""));

      expect(convertedOldBalance - convertedNewBalance).to.equal(convertedTransactionAmount);
    });
  });
});
