
const product = {
  name: 'Agua Natural Epura (10lt)',
  id: '624b08d157e6d564bd059e99',
  store: 'Soriana'
}

describe('Incorrect account', () => {
  const account = {
    email: 'elmiauchis@mau.com',
    password: 'holabola'
  } 

  
  it('passes', () => {
    cy.visit('http://localhost:8080/');
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type(account.email);
    cy.get('input[name="password"]').type(account.password);
    cy.contains('Iniciar Sesión').click();
    cy.contains('¡Bienvenidx, elmiauchis!');
    
  })
})

describe('Add product to list', () => {

  it('passes', () => {
    cy.contains('Ver Productos').click();
    cy.get(`a[href="/product/${product.id}"]`).first().click({ force: true });
    cy.contains(product.name);
    cy.get('.add').first().click();
    cy.get('.btn[name="addList"]').first().click();
    
  })
})

describe('Review List and Save', () => {

  it('passes', () => {
    cy.contains('Mis productos');
    cy.contains(product.name);
    cy.contains('Guardar Lista').click();
  })
})

describe('Check saved list', () => {
  
    it('passes', () => {
      cy.get('a[href="/profile"]').click();
      cy.contains('Ver listas pasadas').click();
      cy.get('.list-card').first().get('.n-collapse-item').first().click();
      cy.contains(product.name);
    })

})

describe('Sign Out', () => {
  
    it('passes', () => {
      cy.get('.logout-btn').click();
      cy.visit('http://localhost:8080/');
      cy.contains('¡Bienvenidx a PriceBin!');
      
    })
    
})