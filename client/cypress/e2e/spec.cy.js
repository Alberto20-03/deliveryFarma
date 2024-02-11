describe('Delivery Farma', () => {
  beforeEach(() => {
    cy.visit('https://delivery-farma.onrender.com/')
  })
  it('Carga la página', () => {
    cy.contains("NEWSLETTER")
  })

  it('Se despliega el menú hamburguesa', () => {
    cy.contains('[className="burger-menu"]').click()
    cy.contains("Dietética y Nutrición")
  })
})