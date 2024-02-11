describe('Delivery Farma', () => {
  beforeEach(() => {
    cy.visit('https://delivery-farma.onrender.com/')
  })

  it('Carga la página', () => {
    cy.contains("NEWSLETTER")
  })

  it('Se despliega el menú hamburguesa', () => {
    cy.get('[class="burger-menu"]').click()
    cy.get('[class="burger-bar clicked"]')
    cy.contains("Dietética y Nutrición")
  })

  it('Se cierra el menú hamburguesa',() => {
    cy.get('[class="burger-menu"]').click()
    cy.get('[class="burger-bar clicked"]')
    cy.get('[class="burger-menu"]').click()
    cy.get('[class="burger-bar unclicked"]')
  })

  it('Se abre el buscador', () => {
    cy.get('[class="header_Derecha"] [alt="Lupa"]').click()
    cy.get('[placeholder="Busca el medicamento"]')
  })

  it('Se renderizan productos al buscar', () => {
    cy.get('[class="header_Derecha"] [alt="Lupa"]').click()
    cy.get('[placeholder="Busca el medicamento"]').type('a')
    cy.get('[class="container"] [class="card"]')
  })

  it('Añadir el tercer producto al carrito y comprobar que se ha añadido', () => {
    cy.get('[class="header_Derecha"] [alt="Lupa"]').click()
    cy.get('[placeholder="Busca el medicamento"]').type('a')
    cy.get('[class="container"] [class="card"]').eq(2).contains('Añadir al carrito').click()
    cy.get('[class="header_Derecha"] [alt="Carrito"]').click()
    cy.get('[class="productos"] [class="producto"]')
  })

  it('Abrir menú pequeño de login y hacer click en "Iniciar Sesión"', () => {
    cy.get('[class="header_Derecha"] [alt="Login"]').click()
    cy.get('[class="menuLogin"]')
    cy.contains('Iniciar sesión').click()
    cy.contains('Mi cuenta')
  })

  it('Hacer click en "Crear Cuenta" y crear un usuario', () => {
    cy.get('[class="header_Derecha"] [alt="Login"]').click()
    cy.get('[class="menuLogin"]')
    cy.contains('Iniciar sesión').click()
    cy.get('[class="nuevo"]').contains('Crear Cuenta').click()
    cy.get('[name="nombre"]')
  })

  //Cambiar el correo del usuario si ya está registrado 
  it('Crear un usuario', () => {
    cy.get('[class="header_Derecha"] [alt="Login"]').click()
    cy.get('[class="menuLogin"]')
    cy.contains('Iniciar sesión').click()
    cy.get('[class="nuevo"]').contains('Crear Cuenta').click()
    cy.get('[name="nombre"]').type("Alberto")
    cy.get('[name="apellidos"]').type("Narbona")
    cy.get('[name="correo"]').type("alb00@gmail.com")
    cy.get('[name="contraseña"]').type("Alberto123")
    cy.contains('Crear cuenta').click()
    cy.wait(500)
    cy.get('[class="header_Derecha"] [class="nombre-usuario"]').contains('Alberto')
  })

  it('Iniciar sesión', () => {
    cy.get('[class="header_Derecha"] [alt="Login"]').click()
    cy.get('[class="menuLogin"]')
    cy.contains('Iniciar sesión').click()
    cy.get('[name="correo"]').type("alb@gmail.com")
    cy.get('[name="contraseña"]').type("Alberto123")
    cy.contains('Iniciar sesión').click()
    cy.wait(500)
    cy.get('[class="header_Derecha"] [class="nombre-usuario"]').contains('Alberto')
  })

  it('Abrir el carrito', () => {
    cy.get('[class="header_Derecha"] [alt="Carrito"]').click()
    cy.contains('RESUMEN DE COMPRA')
  })

  it('Cerrar carrito', () => {
    cy.get('[class="header_Derecha"] [alt="Carrito"]').click()
    cy.contains('RESUMEN DE COMPRA')
    cy.get('[class="cerrar_carrito"]').click()
    cy.contains('NEWSLETTER')
  })

  it('Añadir el tercer producto al carrito y continuar a la pasarela de pago. Sin iniciar sesión', () => {
    cy.get('[class="header_Derecha"] [alt="Lupa"]').click()
    cy.get('[placeholder="Busca el medicamento"]').type('a')
    cy.get('[class="container"] [class="card"]').eq(2).contains('Añadir al carrito').click()
    cy.get('[class="header_Derecha"] [alt="Carrito"]').click()
    cy.get('[class="productos"] [class="producto"]')
    cy.contains('Continuar').click()
    cy.get('[name="correo"]').type("alb@gmail.com")
    cy.get('[name="contraseña"]').type("Alberto123")
    cy.contains('Iniciar sesión').click()
    cy.contains('Continuar').click()
    cy.contains('Finalizar compra')
  })
})

