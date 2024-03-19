/// <reference types="cypress" />

describe('1 - Desenvolva os testes unitários de maneira que a cobertura seja de, no mínimo, 90%', () => {
  it('Verifica a cobertura de 90% da aplicação total', () => {
    cy.getCoverage().its('total.branches.pct', { timeout: 0 }).should('be.gte', 90.00);
  });
});
