describe('wrong data', () => {
  it('show message about wrong email', () => {
    cy.visit('http://localhost:3000/register#/register')
    cy.get('[data-cy="submit"]').click();
    cy.contains('Please enter your email').should('be.visible');
  })

  it('show message about too short password', () => {
    cy.visit('http://localhost:3000/register#/register');
    cy.get('[data-cy="email-input"]').type('test@test.pl');
    cy.get('[data-cy="password-input"]').type('123');
    cy.get('[data-cy="repeat-password-input"]').type('123');
    cy.get('[data-cy="submit"]').click();
    cy.contains('Your password is too short.').should('be.visible');
  })

  it('show message about wrong password', () => {
    cy.visit('http://localhost:3000/register#/register');
    cy.get('[data-cy="email-input"]').type('test@test.pl');
    cy.get('[data-cy="password-input"]').type('1234');
    cy.get('[data-cy="repeat-password-input"]').type('123456');
    cy.get('[data-cy="submit"]').click();
    cy.contains('Password is not repeated correctly.').should('be.visible');
  })

  it('show message about an existing user with that email', () => {
    cy.visit('http://localhost:3000/register#/register');
    cy.get('[data-cy="email-input"]').type('admin@admin.pl');
    cy.get('[data-cy="password-input"]').type('test123');
    cy.get('[data-cy="repeat-password-input"]').type('test123');
    cy.get('[data-cy="submit"]').click();
    cy.contains('There is already Panda with that login. Please try again.').should('be.visible');
  })
})

export {}