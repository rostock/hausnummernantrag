describe('Subpages', () => {
  it('Check if all subpages existing and synchronus with the breadcrumps', () => {
    cy.visit('https://hausnummer.leichtwind.de')
    
    cy.get('.page-item-breadcrumb')
      .then(($bcElements) => {
        for(var index = 1; index <= $bcElements.length; index++) {
          for (var activePage = 1; activePage <= $bcElements.length; activePage++) {
            if(index === activePage) {
              cy.get('.page-item-breadcrumb:nth-child(' + ( activePage ) + ')').should('have.class', 'active');
              cy.get('.formcontainer:nth-child(' + ( activePage ) + ')').should('be.visible');
            }
            else {
              cy.get('.page-item-breadcrumb:nth-child(' + ( activePage ) + ')').should('not.have.class', 'active');
              cy.get('.formcontainer:nth-child(' + ( activePage ) + ')').should('be.hidden');
            }
            
          }
          
          if(index !== $bcElements.length) {
            cy.get('.page-item-breadcrumb:nth-child(' + (index + 1 ) + ')')
              .click(); 
          }
        };
      })
  })
})