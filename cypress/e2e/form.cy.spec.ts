describe("Form Input", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should be able to input all form and submit it", () => {
    cy.get('[data-section="input-text"]').eq(0).type("Yuri");
    cy.get('[data-section="input-text"]').eq(1).type("Ostrovsky");
    cy.get('[data-section="input-email"]').type("yuriOst@mail.com");
    cy.get('[data-section="query-type"]').eq(0).click();
    cy.get('[data-section="input-message"]').type("Selamat malam, semua!");
    cy.get('[data-section="input-checkbox"]').click();
    cy.get("button").contains("Submit").click();
    cy.get(".toast-container").should("be.visible");
  });

  it("should be able to show error message if the input is invalid", () => {
    cy.get("button").contains("Submit").click();
    cy.get(".validator-message").should("be.visible");
  });
});
